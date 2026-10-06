import { emergencyRepository } from '../repositories';
import { propertyRepository } from '../repositories';
import { localPartnerRepository } from '../repositories';
import { AppError } from '../utils/app-error';
import { EmergencyStatus, EmergencyReason } from '@gharstay/shared';

export const emergencyService = {
  async createEmergencyRequest(data: {
    city: string;
    locality: string;
    purpose: EmergencyReason;
    description?: string;
    guests: number;
    requiredNights: number;
    phoneNumber: string;
    guestId?: string;
  }) {
    const properties = await propertyRepository.findMany({
      city: data.city,
      locality: data.locality,
      guests: data.guests,
      status: 'ACTIVE',
      verificationStatus: 'VERIFIED',
      take: 5,
    });

    if (properties.properties.length === 0) {
      const partners = await localPartnerRepository.findActiveNearby(data.city);
      if (partners.length === 0) {
        console.log(`No local partners found for ${data.city} - ${data.locality}`);
      }
    }

    return emergencyRepository.create({
      ...data,
      guest: data.guestId ? { connect: { id: data.guestId } } : undefined,
      status: EmergencyStatus.OPEN,
    });
  },

  async getEmergencyRequest(id: string, userId?: string, userRole?: string) {
    const request = await emergencyRepository.findById(id);
    if (!request) {
      throw new AppError('Emergency request not found', 404);
    }

    if (request.guestId && request.guestId !== userId && userRole !== 'ADMIN' && userRole !== 'LOCAL_PARTNER') {
      throw new AppError('Not authorized to view this request', 403);
    }

    return request;
  },

  async getEmergencyRequests(params: {
    city?: string;
    locality?: string;
    status?: EmergencyStatus;
    purpose?: EmergencyReason;
    guestId?: string;
    page?: number;
    limit?: number;
  }) {
    const skip = ((params.page || 1) - 1) * (params.limit || 10);
    const [requests, total] = await Promise.all([
      emergencyRepository.findMany({ ...params, skip, take: params.limit || 10 }),
      emergencyRepository.count({ city: params.city, status: params.status }),
    ]);
    return { requests, total, page: params.page || 1, limit: params.limit || 10 };
  },

  async updateEmergencyRequest(id: string, userId: string, userRole: string, data: {
    status?: EmergencyStatus;
    description?: string;
  }) {
    const request = await emergencyRepository.findById(id);
    if (!request) {
      throw new AppError('Emergency request not found', 404);
    }

    if (userRole !== 'ADMIN' && userRole !== 'LOCAL_PARTNER' && request.guestId !== userId) {
      throw new AppError('Not authorized to update this request', 403);
    }

    if (userRole === 'GUEST' && data.status && data.status !== EmergencyStatus.CANCELLED) {
      throw new AppError('Guests can only cancel their requests', 403);
    }

    return emergencyRepository.update(id, data);
  },

  async getNearbyEmergencies(city: string, locality: string) {
    return emergencyRepository.findNearby(city, locality);
  },
};
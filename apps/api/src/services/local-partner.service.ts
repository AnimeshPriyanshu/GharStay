import { localPartnerRepository } from '../repositories';
import { userRepository } from '../repositories';
import { AppError } from '../utils/app-error';
import { LocalPartnerStatus } from '@gharstay/shared';

export const localPartnerService = {
  async registerLocalPartner(userId: string, area: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.role !== 'LOCAL_PARTNER') {
      throw new AppError('User must have LOCAL_PARTNER role', 400);
    }

    const existing = await localPartnerRepository.findByUserId(userId);
    if (existing) {
      throw new AppError('User is already registered as a local partner', 409);
    }

    return localPartnerRepository.create({
      user: { connect: { id: userId } },
      area,
      status: LocalPartnerStatus.PENDING,
    });
  },

  async getLocalPartnerProfile(userId: string) {
    const partner = await localPartnerRepository.findByUserId(userId);
    if (!partner) {
      throw new AppError('Local partner profile not found', 404);
    }
    return partner;
  },

  async updateStatus(id: string, status: LocalPartnerStatus) {
    const partner = await localPartnerRepository.findById(id);
    if (!partner) {
      throw new AppError('Local partner not found', 404);
    }
    return localPartnerRepository.update(id, { status });
  },

  async getNearbyPartners(area: string) {
    return localPartnerRepository.findActiveNearby(area);
  },

  async getAllPartners(params: { area?: string; status?: LocalPartnerStatus; page?: number; limit?: number }) {
    const skip = ((params.page || 1) - 1) * (params.limit || 10);
    return localPartnerRepository.findMany({ ...params, skip, take: params.limit || 10 });
  },
};
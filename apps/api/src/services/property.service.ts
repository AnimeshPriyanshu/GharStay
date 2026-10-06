import { propertyRepository } from '../repositories';
import { amenityRepository } from '../repositories';
import { reviewRepository } from '../repositories';
import { bookingRepository } from '../repositories';
import { AppError } from '../utils/app-error';
import { PropertyType, PropertyStatus, VerificationStatus, StayPurpose, PropertyFilters, PropertySearchResult } from '@gharstay/shared';

export const propertyService = {
  async getProperties(filters: PropertyFilters = {}) {
    const {
      city,
      locality,
      checkIn,
      checkOut,
      guests,
      minPrice,
      maxPrice,
      propertyType,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = filters;

    const skip = (page - 1) * limit;

    const { properties, total } = await propertyRepository.findMany({
      city,
      locality,
      checkIn: checkIn ? new Date(checkIn) : undefined,
      checkOut: checkOut ? new Date(checkOut) : undefined,
      guests,
      minPrice,
      maxPrice,
      propertyType,
      status: PropertyStatus.ACTIVE,
      verificationStatus: VerificationStatus.VERIFIED,
      sortBy,
      sortOrder,
      skip,
      take: limit,
    });

    const data: PropertySearchResult[] = properties.map((p: typeof properties[0]) => ({
      id: p.id,
      title: p.title,
      city: p.city,
      locality: p.locality,
      pricePerNight: p.pricePerNight,
      propertyType: p.propertyType as PropertyType,
      verificationStatus: p.verificationStatus as VerificationStatus,
      averageRating: p.reviews.length > 0
        ? p.reviews.reduce((sum: number, r: typeof p.reviews[0]) => sum + r.rating, 0) / p.reviews.length
        : 0,
      reviewCount: p.reviews.length,
      images: p.images.map((i: typeof p.images[0]) => i.url),
      amenities: p.amenities.map((a: typeof p.amenities[0]) => a.amenity.name),
      hostName: p.host.name,
    }));

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getPropertyById(id: string) {
    const property = await propertyRepository.findById(id);
    if (!property) {
      throw new AppError('Property not found', 404);
    }

    const averageRating = property.reviews.length > 0
      ? property.reviews.reduce((sum: number, r: typeof property.reviews[0]) => sum + r.rating, 0) / property.reviews.length
      : 0;

    const bookedDates = property.bookings
      .filter((b: typeof property.bookings[0]) => b.status === 'CONFIRMED' || b.status === 'CHECKED_IN')
      .flatMap((b: typeof property.bookings[0]) => {
        const dates: string[] = [];
        const current = new Date(b.checkIn);
        const end = new Date(b.checkOut);
        while (current < end) {
          dates.push(current.toISOString().split('T')[0]);
          current.setDate(current.getDate() + 1);
        }
        return dates;
      });

    return {
      ...property,
      averageRating,
      reviewCount: property.reviews.length,
      availableDates: bookedDates,
    };
  },

  async createProperty(hostId: string, data: {
    title: string;
    description: string;
    city: string;
    locality: string;
    address: string;
    latitude?: number;
    longitude?: number;
    pricePerNight: number;
    propertyType: PropertyType;
    amenityIds?: string[];
    images: string[];
  }) {
    if (data.amenityIds && data.amenityIds.length > 0) {
      const amenities = await amenityRepository.findByIds(data.amenityIds);
      if (amenities.length !== data.amenityIds.length) {
        throw new AppError('One or more amenities not found', 400);
      }
    }

    return propertyRepository.create({
      host: { connect: { id: hostId } },
      title: data.title,
      description: data.description,
      city: data.city,
      locality: data.locality,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      pricePerNight: data.pricePerNight,
      propertyType: data.propertyType,
      status: PropertyStatus.PENDING_VERIFICATION,
      verificationStatus: VerificationStatus.UNVERIFIED,
      images: { create: data.images.map(url => ({ url })) },
      amenities: data.amenityIds
        ? { create: data.amenityIds.map(amenityId => ({ amenityId })) }
        : undefined,
    });
  },

  async updateProperty(id: string, hostId: string, data: Partial<{
    title: string;
    description: string;
    city: string;
    locality: string;
    address: string;
    latitude: number;
    longitude: number;
    pricePerNight: number;
    propertyType: PropertyType;
    status: PropertyStatus;
    verificationStatus: VerificationStatus;
    amenityIds: string[];
    images: string[];
  }>) {
    const property = await propertyRepository.findById(id);
    if (!property) {
      throw new AppError('Property not found', 404);
    }
    if (property.hostId !== hostId) {
      throw new AppError('Not authorized to update this property', 403);
    }

    if (data.amenityIds) {
      const amenities = await amenityRepository.findByIds(data.amenityIds);
      if (amenities.length !== data.amenityIds.length) {
        throw new AppError('One or more amenities not found', 400);
      }
    }

    const updateData: Record<string, unknown> = { ...data };
    if (data.amenityIds) {
      delete updateData.amenityIds;
      await prisma.propertyAmenity.deleteMany({ where: { propertyId: id } });
    }
    if (data.images) {
      delete updateData.images;
      await prisma.propertyImage.deleteMany({ where: { propertyId: id } });
    }

    const updated = await propertyRepository.update(id, updateData as any);

    if (data.amenityIds) {
      await prisma.propertyAmenity.createMany({
        data: data.amenityIds.map(amenityId => ({ propertyId: id, amenityId })),
      });
    }
    if (data.images) {
      await prisma.propertyImage.createMany({
        data: data.images.map(url => ({ propertyId: id, url })),
      });
    }

    return this.getPropertyById(id);
  },

  async getHostProperties(hostId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [properties, total] = await Promise.all([
      propertyRepository.findByHost(hostId, skip, limit),
      propertyRepository.countByHost(hostId),
    ]);
    return { properties, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async deleteProperty(id: string, hostId: string) {
    const property = await propertyRepository.findById(id);
    if (!property) {
      throw new AppError('Property not found', 404);
    }
    if (property.hostId !== hostId) {
      throw new AppError('Not authorized to delete this property', 403);
    }
    return propertyRepository.delete(id);
  },
};

import { prisma } from '../config/prisma';
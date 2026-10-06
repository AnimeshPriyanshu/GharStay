import { z } from 'zod';
import { PropertyType, PropertyStatus, VerificationStatus, StayPurpose } from '@gharstay/shared';

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(5000),
    city: z.string().min(2).max(100),
    locality: z.string().min(2).max(100),
    address: z.string().min(10).max(500),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    pricePerNight: z.number().int().positive().max(100000),
    propertyType: z.nativeEnum(PropertyType).default(PropertyType.PRIVATE_ROOM),
    amenityIds: z.array(z.string().cuid()).optional(),
    images: z.array(z.string().url()).min(1).max(10),
  }),
});

export const updatePropertySchema = z.object({
  params: z.object({ id: z.string().cuid() }),
  body: z.object({
    title: z.string().min(5).max(200).optional(),
    description: z.string().min(20).max(5000).optional(),
    city: z.string().min(2).max(100).optional(),
    locality: z.string().min(2).max(100).optional(),
    address: z.string().min(10).max(500).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    pricePerNight: z.number().int().positive().max(100000).optional(),
    propertyType: z.nativeEnum(PropertyType).optional(),
    status: z.nativeEnum(PropertyStatus).optional(),
    verificationStatus: z.nativeEnum(VerificationStatus).optional(),
    amenityIds: z.array(z.string().cuid()).optional(),
    images: z.array(z.string().url()).max(10).optional(),
  }).partial(),
});

export const propertyFiltersSchema = z.object({
  query: z.object({
    city: z.string().optional(),
    locality: z.string().optional(),
    checkIn: z.string().datetime().optional(),
    checkOut: z.string().datetime().optional(),
    guests: z.coerce.number().int().positive().max(10).optional(),
    purpose: z.nativeEnum(StayPurpose).optional(),
    minPrice: z.coerce.number().int().min(0).optional(),
    maxPrice: z.coerce.number().int().min(0).optional(),
    propertyType: z.nativeEnum(PropertyType).optional(),
    sortBy: z.enum(['price', 'rating', 'createdAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(12),
  }),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>['body'];
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>['body'];
export type PropertyFiltersInput = z.infer<typeof propertyFiltersSchema>['query'];
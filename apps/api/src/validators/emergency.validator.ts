import { z } from 'zod';
import { EmergencyReason, EmergencyStatus } from '@gharstay/shared';

export const createEmergencyRequestSchema = z.object({
  body: z.object({
    city: z.string().min(2).max(100),
    locality: z.string().min(2).max(100),
    purpose: z.nativeEnum(EmergencyReason),
    description: z.string().max(2000).optional(),
    guests: z.number().int().positive().max(10),
    requiredNights: z.number().int().positive().max(30),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  }),
});

export const updateEmergencyRequestSchema = z.object({
  params: z.object({ id: z.string().cuid() }),
  body: z.object({
    status: z.nativeEnum(EmergencyStatus).optional(),
    description: z.string().max(2000).optional(),
  }).partial(),
});

export const emergencyFiltersSchema = z.object({
  query: z.object({
    city: z.string().optional(),
    locality: z.string().optional(),
    status: z.nativeEnum(EmergencyStatus).optional(),
    purpose: z.nativeEnum(EmergencyReason).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
  }),
});

export type CreateEmergencyRequestInput = z.infer<typeof createEmergencyRequestSchema>['body'];
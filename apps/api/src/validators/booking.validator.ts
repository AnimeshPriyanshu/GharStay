import { z } from 'zod';
import { BookingStatus } from '@gharstay/shared';

export const createBookingSchema = z.object({
  body: z.object({
    propertyId: z.string().cuid(),
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
    guests: z.number().int().positive().max(10),
  }).refine(data => new Date(data.checkIn) < new Date(data.checkOut), {
    message: 'Check-in must be before check-out',
    path: ['checkOut'],
  }),
});

export const updateBookingSchema = z.object({
  params: z.object({ id: z.string().cuid() }),
  body: z.object({
    status: z.nativeEnum(BookingStatus).optional(),
    checkIn: z.string().datetime().optional(),
    checkOut: z.string().datetime().optional(),
    guests: z.number().int().positive().max(10).optional(),
  }).partial(),
});

export const bookingFiltersSchema = z.object({
  query: z.object({
    status: z.nativeEnum(BookingStatus).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
  }),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>['body'];
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>['body'];
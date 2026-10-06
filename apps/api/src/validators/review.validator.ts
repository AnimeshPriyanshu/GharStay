import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    propertyId: z.string().cuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(2000).optional(),
  }),
});

export const reviewFiltersSchema = z.object({
  query: z.object({
    propertyId: z.string().cuid().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
  }),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>['body'];
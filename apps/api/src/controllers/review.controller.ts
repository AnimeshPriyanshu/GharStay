import { Request, Response } from 'express';
import { reviewService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { createReviewSchema, reviewFiltersSchema } from '../validators';

export const reviewController = {
  createReview: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const data = createReviewSchema.shape.body.parse(req.body);
    const review = await reviewService.createReview(req.user.userId, data);
    sendSuccess(res, review, 'Review created successfully', 201);
  }),

  getPropertyReviews: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await reviewService.getPropertyReviews(req.params.propertyId, page, limit);
    sendPaginated(res, result.reviews, result.total, result.page, result.limit);
  }),

  getUserReviews: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const reviews = await reviewService.getUserReviews(req.user.userId, page, limit);
    sendSuccess(res, reviews);
  }),

  updateReview: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const data = createReviewSchema.shape.body.parse(req.body);
    const review = await reviewService.updateReview(req.params.id, req.user.userId, data);
    sendSuccess(res, review, 'Review updated successfully');
  }),

  deleteReview: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    await reviewService.deleteReview(req.params.id, req.user.userId);
    sendSuccess(res, null, 'Review deleted successfully');
  }),
};
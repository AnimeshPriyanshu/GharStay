import { reviewRepository } from '../repositories';
import { bookingRepository } from '../repositories';
import { AppError } from '../utils/app-error';

export const reviewService = {
  async createReview(guestId: string, data: {
    propertyId: string;
    rating: number;
    comment?: string;
  }) {
    const existingReview = await reviewRepository.exists(data.propertyId, guestId);
    if (existingReview) {
      throw new AppError('You have already reviewed this property', 409);
    }

    const completedBooking = await bookingRepository.findFirst({
      propertyId: data.propertyId,
      guestId,
      status: 'COMPLETED',
    });

    if (!completedBooking) {
      throw new AppError('You can only review properties after completing a stay', 403);
    }

    return reviewRepository.create({
      property: { connect: { id: data.propertyId } },
      guest: { connect: { id: guestId } },
      rating: data.rating,
      comment: data.comment,
    });
  },

  async getPropertyReviews(propertyId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      reviewRepository.findByProperty(propertyId, skip, limit),
      reviewRepository.getReviewCount(propertyId),
    ]);
    const averageRating = await reviewRepository.getAverageRating(propertyId);

    return { reviews, total, page, limit, averageRating };
  },

  async getUserReviews(guestId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return reviewRepository.findByGuest(guestId, skip, limit);
  },

  async updateReview(id: string, guestId: string, data: { rating?: number; comment?: string }) {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    if (review.guestId !== guestId) {
      throw new AppError('Not authorized to update this review', 403);
    }
    return reviewRepository.update(id, data);
  },

  async deleteReview(id: string, guestId: string) {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    if (review.guestId !== guestId) {
      throw new AppError('Not authorized to delete this review', 403);
    }
    return reviewRepository.delete(id);
  },
};
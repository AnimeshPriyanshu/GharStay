import { prisma } from '../config/prisma';
import { Review, Prisma } from '@prisma/client';

export const reviewRepository = {
  async findById(id: string) {
    return prisma.review.findUnique({
      where: { id },
      include: {
        guest: { select: { id: true, name: true } },
        property: { select: { id: true, title: true } },
      },
    });
  },

  async findByProperty(propertyId: string, skip = 0, take = 10) {
    return prisma.review.findMany({
      where: { propertyId },
      include: { guest: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  },

  async findByGuest(guestId: string, skip = 0, take = 10) {
    return prisma.review.findMany({
      where: { guestId },
      include: { property: { select: { id: true, title: true, city: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  },

  async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return prisma.review.create({ data });
  },

  async update(id: string, data: Prisma.ReviewUpdateInput): Promise<Review> {
    return prisma.review.update({ where: { id }, data });
  },

  async delete(id: string): Promise<Review> {
    return prisma.review.delete({ where: { id } });
  },

  async getAverageRating(propertyId: string): Promise<number> {
    const result = await prisma.review.aggregate({
      where: { propertyId },
      _avg: { rating: true },
    });
    return result._avg.rating || 0;
  },

  async getReviewCount(propertyId: string): Promise<number> {
    return prisma.review.count({ where: { propertyId } });
  },

  async exists(propertyId: string, guestId: string): Promise<boolean> {
    const review = await prisma.review.findUnique({
      where: { propertyId_guestId: { propertyId, guestId } },
    });
    return !!review;
  },
};
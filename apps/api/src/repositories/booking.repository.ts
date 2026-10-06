import { prisma } from '../config/prisma';
import { Booking, BookingStatus, Prisma } from '@prisma/client';

export const bookingRepository = {
  async findById(id: string) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            images: { take: 1 },
            host: { select: { id: true, name: true, phone: true } },
          },
        },
        guest: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  },

  async findMany(params: {
    guestId?: string;
    hostId?: string;
    propertyId?: string;
    status?: BookingStatus;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.BookingWhereInput = {};

    if (params.guestId) where.guestId = params.guestId;
    if (params.propertyId) where.propertyId = params.propertyId;
    if (params.status) where.status = params.status;

    if (params.hostId) {
      where.property = { hostId: params.hostId };
    }

    return prisma.booking.findMany({
      where,
      include: {
        property: {
          include: { images: { take: 1 }, host: { select: { id: true, name: true } } },
        },
        guest: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: params.skip,
      take: params.take,
    });
  },

  async create(data: Prisma.BookingCreateInput): Promise<Booking> {
    return prisma.booking.create({ data });
  },

  async update(id: string, data: Prisma.BookingUpdateInput): Promise<Booking> {
    return prisma.booking.update({ where: { id }, data });
  },

  async count(params: { guestId?: string; hostId?: string; status?: BookingStatus }) {
    const where: Prisma.BookingWhereInput = {};

    if (params.guestId) where.guestId = params.guestId;
    if (params.status) where.status = params.status;
    if (params.hostId) where.property = { hostId: params.hostId };

    return prisma.booking.count({ where });
  },

  async findFirst(where: Prisma.BookingWhereInput) {
    return prisma.booking.findFirst({ where });
  },

  async findConflicting(propertyId: string, checkIn: Date, checkOut: Date, excludeId?: string) {
    return prisma.booking.findFirst({
      where: {
        propertyId,
        id: { not: excludeId },
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] },
        AND: [
          { checkIn: { lt: checkOut } },
          { checkOut: { gt: checkIn } },
        ],
      },
    });
  },
};
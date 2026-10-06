import { prisma } from '../config/prisma';
import { Property, PropertyStatus, VerificationStatus, PropertyType, BookingStatus, Prisma } from '@prisma/client';

type PropertyFilters = {
  city?: string;
  locality?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType;
  status?: PropertyStatus;
  verificationStatus?: VerificationStatus;
  hostId?: string;
  sortBy?: 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  skip?: number;
  take?: number;
};

export const propertyRepository = {
  async findById(id: string) {
    return prisma.property.findUnique({
      where: { id },
      include: {
        images: true,
        amenities: { include: { amenity: true } },
        host: { select: { id: true, name: true, phone: true, createdAt: true } },
        reviews: {
          include: { guest: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' },
        },
        bookings: {
          where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] } },
        },
        _count: { select: { reviews: true } },
      },
    });
  },

  async findMany(filters: PropertyFilters = {}) {
    const {
      city,
      locality,
      checkIn,
      checkOut,
      guests,
      minPrice,
      maxPrice,
      propertyType,
      status = PropertyStatus.ACTIVE,
      verificationStatus,
      hostId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      skip = 0,
      take = 12,
    } = filters;

    const where: Prisma.PropertyWhereInput = {
      status,
      ...(city && { city: { contains: city, mode: 'insensitive' } }),
      ...(locality && { locality: { contains: locality, mode: 'insensitive' } }),
      ...(minPrice !== undefined && { pricePerNight: { gte: minPrice } }),
      ...(maxPrice !== undefined && { pricePerNight: { lte: maxPrice } }),
      ...(propertyType && { propertyType }),
      ...(verificationStatus && { verificationStatus }),
      ...(hostId && { hostId }),
    };

    if (checkIn && checkOut && guests) {
      where.bookings = {
        none: {
          status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] },
          AND: [
            { checkIn: { lt: checkOut } },
            { checkOut: { gt: checkIn } },
          ],
        },
      };
    }

    const orderBy: Prisma.PropertyOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: { take: 1 },
          amenities: { include: { amenity: true } },
          host: { select: { id: true, name: true } },
          reviews: {
            include: { guest: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'desc' },
          },
          bookings: {
            where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] } },
          },
          _count: { select: { reviews: true } },
        },
        orderBy,
        skip,
        take,
      }),
      prisma.property.count({ where }),
    ]);

    return { properties, total };
  },

  async create(data: Prisma.PropertyCreateInput): Promise<Property> {
    return prisma.property.create({ data });
  },

  async update(id: string, data: Prisma.PropertyUpdateInput): Promise<Property> {
    return prisma.property.update({ where: { id }, data });
  },

  async delete(id: string): Promise<Property> {
    return prisma.property.delete({ where: { id } });
  },

  async findByHost(hostId: string, skip = 0, take = 10) {
    return prisma.property.findMany({
      where: { hostId },
      include: {
        images: { take: 1 },
        _count: { select: { bookings: true, reviews: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  },

  async countByHost(hostId: string) {
    return prisma.property.count({ where: { hostId } });
  },
};
import { prisma } from '../config/prisma';
import { EmergencyRequest, EmergencyStatus, EmergencyReason, Prisma } from '@prisma/client';

export const emergencyRepository = {
  async findById(id: string) {
    return prisma.emergencyRequest.findUnique({
      where: { id },
      include: { guest: { select: { id: true, name: true, phone: true, email: true } } },
    });
  },

  async findMany(params: {
    city?: string;
    locality?: string;
    status?: EmergencyStatus;
    purpose?: EmergencyReason;
    guestId?: string;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.EmergencyRequestWhereInput = {};

    if (params.city) where.city = { contains: params.city, mode: 'insensitive' };
    if (params.locality) where.locality = { contains: params.locality, mode: 'insensitive' };
    if (params.status) where.status = params.status;
    if (params.purpose) where.purpose = params.purpose;
    if (params.guestId) where.guestId = params.guestId;

    return prisma.emergencyRequest.findMany({
      where,
      include: { guest: { select: { id: true, name: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
      skip: params.skip,
      take: params.take,
    });
  },

  async create(data: Prisma.EmergencyRequestCreateInput): Promise<EmergencyRequest> {
    return prisma.emergencyRequest.create({ data });
  },

  async update(id: string, data: Prisma.EmergencyRequestUpdateInput): Promise<EmergencyRequest> {
    return prisma.emergencyRequest.update({ where: { id }, data });
  },

  async count(params: { city?: string; status?: EmergencyStatus }) {
    const where: Prisma.EmergencyRequestWhereInput = {};
    if (params.city) where.city = { contains: params.city, mode: 'insensitive' };
    if (params.status) where.status = params.status;
    return prisma.emergencyRequest.count({ where });
  },

  async findNearby(city: string, locality: string, take = 5) {
    return prisma.emergencyRequest.findMany({
      where: {
        city: { contains: city, mode: 'insensitive' },
        locality: { contains: locality, mode: 'insensitive' },
        status: { in: [EmergencyStatus.OPEN, EmergencyStatus.IN_PROGRESS] },
      },
      include: { guest: { select: { id: true, name: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
      take,
    });
  },
};
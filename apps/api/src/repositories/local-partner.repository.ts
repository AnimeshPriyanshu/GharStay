import { prisma } from '../config/prisma';
import { LocalPartner, LocalPartnerStatus, Prisma } from '@prisma/client';

export const localPartnerRepository = {
  async findById(id: string) {
    return prisma.localPartner.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, phone: true, email: true } } },
    });
  },

  async findByUserId(userId: string) {
    return prisma.localPartner.findUnique({
      where: { userId },
      include: { user: { select: { id: true, name: true, phone: true, email: true } } },
    });
  },

  async findMany(params: {
    area?: string;
    status?: LocalPartnerStatus;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.LocalPartnerWhereInput = {};
    if (params.area) where.area = { contains: params.area, mode: 'insensitive' };
    if (params.status) where.status = params.status;

    return prisma.localPartner.findMany({
      where,
      include: { user: { select: { id: true, name: true, phone: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      skip: params.skip,
      take: params.take,
    });
  },

  async create(data: Prisma.LocalPartnerCreateInput): Promise<LocalPartner> {
    return prisma.localPartner.create({ data });
  },

  async update(id: string, data: Prisma.LocalPartnerUpdateInput): Promise<LocalPartner> {
    return prisma.localPartner.update({ where: { id }, data });
  },

  async findActiveNearby(area: string, take = 10) {
    return prisma.localPartner.findMany({
      where: {
        area: { contains: area, mode: 'insensitive' },
        status: LocalPartnerStatus.ACTIVE,
      },
      include: { user: { select: { id: true, name: true, phone: true } } },
      take,
    });
  },
};
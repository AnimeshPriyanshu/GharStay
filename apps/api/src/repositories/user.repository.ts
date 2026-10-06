import { prisma } from '../config/prisma';
import { User, UserRole, Prisma } from '@prisma/client';

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async findByPhone(phone: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { phone } });
  },

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  },

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async findMany(params: {
    role?: UserRole;
    skip?: number;
    take?: number;
  }): Promise<User[]> {
    return prisma.user.findMany({
      where: { role: params.role },
      skip: params.skip,
      take: params.take,
      orderBy: { createdAt: 'desc' },
    });
  },

  async count(role?: UserRole): Promise<number> {
    return prisma.user.count({ where: { role } });
  },
};
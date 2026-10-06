import { prisma } from '../config/prisma';
import { Amenity, Prisma } from '@prisma/client';

export const amenityRepository = {
  async findAll() {
    return prisma.amenity.findMany({ orderBy: { name: 'asc' } });
  },

  async findByIds(ids: string[]) {
    return prisma.amenity.findMany({ where: { id: { in: ids } } });
  },

  async create(name: string): Promise<Amenity> {
    return prisma.amenity.create({ data: { name } });
  },

  async findOrCreate(names: string[]): Promise<Amenity[]> {
    const results: Amenity[] = [];
    for (const name of names) {
      let amenity = await prisma.amenity.findUnique({ where: { name } });
      if (!amenity) {
        amenity = await prisma.amenity.create({ data: { name } });
      }
      results.push(amenity);
    }
    return results;
  },
};
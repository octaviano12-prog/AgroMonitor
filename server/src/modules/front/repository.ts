import { prisma } from '../../config/database';

export class FrontRepository {
  async findAll() {
    return prisma.front.findMany({ where: { deletedAt: null }, include: { equipments: true }, orderBy: { name: 'asc' } });
  }
  async findById(id: string) {
    return prisma.front.findUnique({ where: { id, deletedAt: null }, include: { equipments: true } });
  }
  async create(data: any) { return prisma.front.create({ data }); }
  async update(id: string, data: any) { return prisma.front.update({ where: { id }, data }); }
  async softDelete(id: string) { return prisma.front.update({ where: { id }, data: { deletedAt: new Date() } }); }
}
export const frontRepository = new FrontRepository();

import { prisma } from '../../config/database';

export class PlotRepository {
  async findAll() {
    return prisma.plot.findMany({ where: { deletedAt: null }, include: { farm: true }, orderBy: { code: 'asc' } });
  }
  async findById(id: string) {
    return prisma.plot.findUnique({ where: { id, deletedAt: null }, include: { farm: true } });
  }
  async findByFarm(farmId: string) {
    return prisma.plot.findMany({ where: { farmId, deletedAt: null } });
  }
  async create(data: any) { return prisma.plot.create({ data }); }
  async update(id: string, data: any) { return prisma.plot.update({ where: { id }, data }); }
  async softDelete(id: string) { return prisma.plot.update({ where: { id }, data: { deletedAt: new Date() } }); }
}
export const plotRepository = new PlotRepository();

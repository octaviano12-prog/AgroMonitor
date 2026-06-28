import { prisma } from '../../config/database';

export class FarmRepository {
  async findAll() {
    return prisma.farm.findMany({ where: { deletedAt: null }, include: { plots: true }, orderBy: { name: 'asc' } });
  }
  async findById(id: string) {
    return prisma.farm.findUnique({ where: { id, deletedAt: null }, include: { plots: true, equipments: true } });
  }
  async create(data: any) { return prisma.farm.create({ data }); }
  async update(id: string, data: any) { return prisma.farm.update({ where: { id }, data }); }
  async softDelete(id: string) { return prisma.farm.update({ where: { id }, data: { deletedAt: new Date() } }); }
  async count() { return prisma.farm.count({ where: { deletedAt: null } }); }
  async totalArea() {
    const farms = await prisma.farm.findMany({ where: { deletedAt: null }, select: { area: true } });
    return farms.reduce((sum, f) => sum + f.area, 0);
  }
}
export const farmRepository = new FarmRepository();

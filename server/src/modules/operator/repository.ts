import { prisma } from '../../config/database';

export class OperatorRepository {
  async findAll() {
    return prisma.operator.findMany({ where: { deletedAt: null }, include: { equipments: { select: { id: true, fleet: true } } }, orderBy: { name: 'asc' } });
  }
  async findById(id: string) {
    return prisma.operator.findUnique({ where: { id, deletedAt: null }, include: { equipments: true } });
  }
  async create(data: any) { return prisma.operator.create({ data }); }
  async update(id: string, data: any) { return prisma.operator.update({ where: { id }, data }); }
  async softDelete(id: string) { return prisma.operator.update({ where: { id }, data: { deletedAt: new Date() } }); }
  async count() { return prisma.operator.count({ where: { deletedAt: null } }); }
}
export const operatorRepository = new OperatorRepository();

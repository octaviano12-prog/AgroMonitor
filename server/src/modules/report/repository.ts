import { prisma } from '../../config/database';

export class ReportRepository {
  async findAll(userId?: string) {
    const where = userId ? { generatedBy: userId } : {};
    return prisma.report.findMany({ where, orderBy: { createdAt: 'desc' } });
  }
  async findById(id: string) {
    return prisma.report.findUnique({ where: { id } });
  }
  async create(data: any) { return prisma.report.create({ data }); }
  async update(id: string, data: any) { return prisma.report.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.report.delete({ where: { id } }); }
}
export const reportRepository = new ReportRepository();

import { prisma } from '../../config/database';

export class CsvRepository {
  async findAll() {
    return prisma.csvImport.findMany({ orderBy: { createdAt: 'desc' } });
  }
  async findById(id: string) {
    return prisma.csvImport.findUnique({ where: { id } });
  }
  async create(data: any) { return prisma.csvImport.create({ data }); }
  async update(id: string, data: any) { return prisma.csvImport.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.csvImport.delete({ where: { id } }); }
}
export const csvRepository = new CsvRepository();

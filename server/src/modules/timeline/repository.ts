import { prisma } from '../../config/database';

export class TimelineRepository {
  async findByEquipment(equipmentId: string) {
    return prisma.timelineEvent.findMany({
      where: { equipmentId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findByEquipmentAndDate(equipmentId: string, date: string) {
    return prisma.timelineEvent.findMany({
      where: { equipmentId, time: date },
      orderBy: { createdAt: 'asc' },
    });
  }
  async create(data: any) { return prisma.timelineEvent.create({ data }); }
  async createMany(events: any[]) { return prisma.timelineEvent.createMany({ data: events }); }
}
export const timelineRepository = new TimelineRepository();

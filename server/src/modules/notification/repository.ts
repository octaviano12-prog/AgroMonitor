import { prisma } from '../../config/database';

export class NotificationRepository {
  async findByUser(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findUnread(userId: string) {
    return prisma.notification.findMany({
      where: { userId, read: false },
      orderBy: { createdAt: 'desc' },
    });
  }
  async create(data: any) { return prisma.notification.create({ data }); }
  async markAsRead(id: string) {
    return prisma.notification.update({ where: { id }, data: { read: true } });
  }
  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }
  async delete(id: string) { return prisma.notification.delete({ where: { id } }); }
}
export const notificationRepository = new NotificationRepository();

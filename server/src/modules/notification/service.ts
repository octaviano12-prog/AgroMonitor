import { notificationRepository } from './repository';

export class NotificationService {
  async getByUser(userId: string) { return notificationRepository.findByUser(userId); }
  async getUnread(userId: string) { return notificationRepository.findUnread(userId); }
  async create(data: any) { return notificationRepository.create(data); }
  async markAsRead(id: string) { return notificationRepository.markAsRead(id); }
  async markAllAsRead(userId: string) { return notificationRepository.markAllAsRead(userId); }
  async delete(id: string) { return notificationRepository.delete(id); }
}
export const notificationService = new NotificationService();

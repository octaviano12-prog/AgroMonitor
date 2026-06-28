import { Request, Response, NextFunction } from 'express';
import { notificationService } from './service';

export class NotificationController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      res.json(await notificationService.getByUser(userId));
    } catch (e) { next(e); }
  }
  async getUnread(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      res.json(await notificationService.getUnread(userId));
    } catch (e) { next(e); }
  }
  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try { res.json(await notificationService.markAsRead(req.params.id)); } catch (e) { next(e); }
  }
  async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      await notificationService.markAllAsRead(userId);
      res.json({ message: 'All notifications marked as read' });
    } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await notificationService.delete(req.params.id); res.json({ message: 'Notification deleted' }); } catch (e) { next(e); }
  }
}
export const notificationController = new NotificationController();

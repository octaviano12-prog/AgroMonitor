import { Router } from 'express';
import { notificationController } from './controller';

const router = Router();

router.get('/', notificationController.getAll);
router.get('/unread', notificationController.getUnread);
router.patch('/:id/read', notificationController.markAsRead);
router.patch('/read-all', notificationController.markAllAsRead);
router.delete('/:id', notificationController.delete);

export { router as notificationRoutes };

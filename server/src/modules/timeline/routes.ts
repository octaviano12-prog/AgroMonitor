import { Router } from 'express';
import { timelineController } from './controller';

const router = Router();

router.get('/equipment/:equipmentId', timelineController.getByEquipment);
router.get('/equipment/:equipmentId/date/:date', timelineController.getByDate);
router.post('/', timelineController.create);
router.post('/bulk', timelineController.createMany);

export { router as timelineRoutes };

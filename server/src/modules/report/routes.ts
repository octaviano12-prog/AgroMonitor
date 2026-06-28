import { Router } from 'express';
import { reportController } from './controller';

const router = Router();

router.get('/', reportController.getAll);
router.get('/:id', reportController.getById);
router.post('/', reportController.create);
router.put('/:id', reportController.update);
router.delete('/:id', reportController.delete);

export { router as reportRoutes };

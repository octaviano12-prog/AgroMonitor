import { Router } from 'express';
import { plotController } from './controller';
import { authorize } from '../../middleware/rbac';

const router = Router();

router.get('/', plotController.getAll);
router.get('/farm/:farmId', plotController.getByFarm);
router.get('/:id', plotController.getById);
router.post('/', authorize('ADMIN', 'SUPERVISOR'), plotController.create);
router.put('/:id', authorize('ADMIN', 'SUPERVISOR'), plotController.update);
router.delete('/:id', authorize('ADMIN'), plotController.delete);

export { router as plotRoutes };

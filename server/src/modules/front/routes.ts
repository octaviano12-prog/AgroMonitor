import { Router } from 'express';
import { frontController } from './controller';
import { authorize } from '../../middleware/rbac';

const router = Router();

router.get('/', frontController.getAll);
router.get('/:id', frontController.getById);
router.post('/', authorize('ADMIN', 'SUPERVISOR'), frontController.create);
router.put('/:id', authorize('ADMIN', 'SUPERVISOR'), frontController.update);
router.delete('/:id', authorize('ADMIN'), frontController.delete);

export { router as frontRoutes };

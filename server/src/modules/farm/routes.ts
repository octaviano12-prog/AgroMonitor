import { Router } from 'express';
import { farmController } from './controller';
import { authorize } from '../../middleware/rbac';

const router = Router();

router.get('/', farmController.getAll);
router.get('/:id', farmController.getById);
router.post('/', authorize('ADMIN', 'SUPERVISOR'), farmController.create);
router.put('/:id', authorize('ADMIN', 'SUPERVISOR'), farmController.update);
router.delete('/:id', authorize('ADMIN'), farmController.delete);

export { router as farmRoutes };

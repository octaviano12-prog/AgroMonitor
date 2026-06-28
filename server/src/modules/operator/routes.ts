import { Router } from 'express';
import { operatorController } from './controller';
import { authorize } from '../../middleware/rbac';

const router = Router();

router.get('/', operatorController.getAll);
router.get('/:id', operatorController.getById);
router.post('/', authorize('ADMIN', 'SUPERVISOR'), operatorController.create);
router.put('/:id', authorize('ADMIN', 'SUPERVISOR'), operatorController.update);
router.delete('/:id', authorize('ADMIN'), operatorController.delete);

export { router as operatorRoutes };

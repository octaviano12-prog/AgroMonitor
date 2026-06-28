import { Router } from 'express';
import { userController } from './controller';
import { authorize } from '../../middleware/rbac';

const router = Router();

router.get('/', authorize('ADMIN'), userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', authorize('ADMIN'), userController.update);
router.delete('/:id', authorize('ADMIN'), userController.delete);
router.patch('/:id/role', authorize('ADMIN'), userController.changeRole);

export { router as userRoutes };

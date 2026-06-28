import { Router } from 'express';
import { csvController } from './controller';
import { uploadCSV } from '../../middleware/upload';
import { authorize } from '../../middleware/rbac';

const router = Router();

router.get('/', csvController.getAll);
router.get('/:id', csvController.getById);
router.post('/upload', authorize('ADMIN', 'SUPERVISOR', 'MONITOR'), uploadCSV, csvController.upload);
router.post('/:id/process', authorize('ADMIN', 'SUPERVISOR'), csvController.process);
router.delete('/:id', authorize('ADMIN'), csvController.delete);

export { router as csvRoutes };

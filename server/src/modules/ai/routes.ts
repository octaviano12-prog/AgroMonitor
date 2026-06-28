import { Router } from 'express';
import { aiController } from './controller';

const router = Router();

router.post('/chat', aiController.chat);
router.post('/report', aiController.generateReport);

export { router as aiRoutes };

import { Router } from 'express';
import { mapController } from './controller';

const router = Router();

router.get('/', mapController.getAll);

export { router as mapRoutes };

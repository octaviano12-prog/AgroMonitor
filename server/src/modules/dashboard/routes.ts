import { Router } from 'express';
import { dashboardController } from './controller';

const router = Router();

router.get('/overview', dashboardController.getOverview);
router.get('/kpis', dashboardController.getKPIs);

export { router as dashboardRoutes };

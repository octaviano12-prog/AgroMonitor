import { Request, Response, NextFunction } from 'express';
import { dashboardService } from './service';

export class DashboardController {
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try { res.json(await dashboardService.getOverview()); } catch (e) { next(e); }
  }
  async getKPIs(req: Request, res: Response, next: NextFunction) {
    try { res.json(await dashboardService.getKPIs()); } catch (e) { next(e); }
  }
}
export const dashboardController = new DashboardController();

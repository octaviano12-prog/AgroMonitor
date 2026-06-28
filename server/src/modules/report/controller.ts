import { Request, Response, NextFunction } from 'express';
import { reportService } from './service';

export class ReportController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await reportService.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await reportService.getById(req.params.id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      res.status(201).json(await reportService.create({ ...req.body, generatedBy: userId }));
    } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { res.json(await reportService.update(req.params.id, req.body)); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await reportService.delete(req.params.id); res.json({ message: 'Report deleted' }); } catch (e) { next(e); }
  }
}
export const reportController = new ReportController();

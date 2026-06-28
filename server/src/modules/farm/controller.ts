import { Request, Response, NextFunction } from 'express';
import { farmService } from './service';

export class FarmController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await farmService.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await farmService.getById(req.params.id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await farmService.create(req.body)); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { res.json(await farmService.update(req.params.id, req.body)); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await farmService.delete(req.params.id); res.json({ message: 'Farm deleted' }); } catch (e) { next(e); }
  }
}
export const farmController = new FarmController();

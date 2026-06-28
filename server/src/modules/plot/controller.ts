import { Request, Response, NextFunction } from 'express';
import { plotService } from './service';

export class PlotController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await plotService.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await plotService.getById(req.params.id)); } catch (e) { next(e); }
  }
  async getByFarm(req: Request, res: Response, next: NextFunction) {
    try { res.json(await plotService.getByFarm(req.params.farmId)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await plotService.create(req.body)); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { res.json(await plotService.update(req.params.id, req.body)); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await plotService.delete(req.params.id); res.json({ message: 'Plot deleted' }); } catch (e) { next(e); }
  }
}
export const plotController = new PlotController();

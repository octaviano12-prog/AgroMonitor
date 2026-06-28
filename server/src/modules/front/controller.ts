import { Request, Response, NextFunction } from 'express';
import { frontService } from './service';

export class FrontController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await frontService.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await frontService.getById(req.params.id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await frontService.create(req.body)); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { res.json(await frontService.update(req.params.id, req.body)); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await frontService.delete(req.params.id); res.json({ message: 'Front deleted' }); } catch (e) { next(e); }
  }
}
export const frontController = new FrontController();

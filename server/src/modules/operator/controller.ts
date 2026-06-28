import { Request, Response, NextFunction } from 'express';
import { operatorService } from './service';

export class OperatorController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await operatorService.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await operatorService.getById(req.params.id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await operatorService.create(req.body)); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { res.json(await operatorService.update(req.params.id, req.body)); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await operatorService.delete(req.params.id); res.json({ message: 'Operator deleted' }); } catch (e) { next(e); }
  }
}
export const operatorController = new OperatorController();

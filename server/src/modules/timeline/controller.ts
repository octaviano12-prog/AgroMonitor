import { Request, Response, NextFunction } from 'express';
import { timelineService } from './service';

export class TimelineController {
  async getByEquipment(req: Request, res: Response, next: NextFunction) {
    try { res.json(await timelineService.getByEquipment(req.params.equipmentId)); } catch (e) { next(e); }
  }
  async getByDate(req: Request, res: Response, next: NextFunction) {
    try { res.json(await timelineService.getByEquipmentAndDate(req.params.equipmentId, req.params.date)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await timelineService.create(req.body)); } catch (e) { next(e); }
  }
  async createMany(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await timelineService.createMany(req.body)); } catch (e) { next(e); }
  }
}
export const timelineController = new TimelineController();

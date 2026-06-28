import { Request, Response, NextFunction } from 'express';
import { equipmentService } from './service';

export class EquipmentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await equipmentService.getAll(req.query);
      res.json(equipment);
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await equipmentService.getById(req.params.id);
      res.json(equipment);
    } catch (error) { next(error); }
  }

  async getByFleet(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await equipmentService.getByFleet(req.params.fleet);
      res.json(equipment);
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await equipmentService.create(req.body);
      res.status(201).json(equipment);
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await equipmentService.update(req.params.id, req.body);
      res.json(equipment);
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await equipmentService.delete(req.params.id);
      res.json({ message: 'Equipment deleted successfully' });
    } catch (error) { next(error); }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, speed, latitude, longitude } = req.body;
      const equipment = await equipmentService.updateStatus(req.params.id, status, speed, latitude, longitude);
      res.json(equipment);
    } catch (error) { next(error); }
  }

  async getWithFilters(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        search: req.query.search as string,
        status: req.query.status as string,
        type: req.query.type as string,
        frontId: req.query.frontId as string,
      };
      const result = await equipmentService.getWithFilters(params);
      res.json(result);
    } catch (error) { next(error); }
  }
}

export const equipmentController = new EquipmentController();

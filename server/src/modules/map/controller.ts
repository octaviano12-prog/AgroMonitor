import { Request, Response, NextFunction } from 'express';
import { mapService } from './service';

export class MapController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await mapService.getAllEquipmentWithLocation()); } catch (e) { next(e); }
  }
}
export const mapController = new MapController();

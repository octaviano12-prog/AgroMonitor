import { Request, Response, NextFunction } from 'express';
import { csvService } from './service';
import { AppError } from '../../middleware/errorHandler';

export class CsvController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await csvService.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await csvService.getById(req.params.id)); } catch (e) { next(e); }
  }
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new AppError('No file uploaded', 400);
      const userId = (req as any).user.id;
      const csvImport = await csvService.upload(req.file, userId);
      res.status(201).json(csvImport);
    } catch (e) { next(e); }
  }
  async process(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await csvService.processFile(req.params.id);
      res.json(result);
    } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await csvService.delete(req.params.id); res.json({ message: 'CSV import deleted' }); } catch (e) { next(e); }
  }
}
export const csvController = new CsvController();

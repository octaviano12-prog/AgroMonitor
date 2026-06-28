import { Request, Response, NextFunction } from 'express';
import { aiService } from './service';

export class AIController {
  async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      const response = await aiService.chat(message);
      res.json({ response });
    } catch (e) { next(e); }
  }
  async generateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, params } = req.body;
      const response = await aiService.generateReport(type, params);
      res.json({ response });
    } catch (e) { next(e); }
  }
}
export const aiController = new AIController();

import { Request, Response, NextFunction } from 'express';
import { userService } from './service';

export class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(await userService.getAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json(await userService.getById(req.params.id)); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { res.json(await userService.update(req.params.id, req.body)); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { await userService.delete(req.params.id); res.json({ message: 'User deleted' }); } catch (e) { next(e); }
  }
  async changeRole(req: Request, res: Response, next: NextFunction) {
    try { res.json(await userService.changeRole(req.params.id, req.body.role)); } catch (e) { next(e); }
  }
}
export const userController = new UserController();

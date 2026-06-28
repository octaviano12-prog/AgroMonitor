import { frontRepository } from './repository';
import { AppError } from '../../middleware/errorHandler';

export class FrontService {
  async getAll() { return frontRepository.findAll(); }
  async getById(id: string) {
    const front = await frontRepository.findById(id);
    if (!front) throw new AppError('Front not found', 404);
    return front;
  }
  async create(data: any) { return frontRepository.create(data); }
  async update(id: string, data: any) {
    const front = await frontRepository.findById(id);
    if (!front) throw new AppError('Front not found', 404);
    return frontRepository.update(id, data);
  }
  async delete(id: string) {
    const front = await frontRepository.findById(id);
    if (!front) throw new AppError('Front not found', 404);
    return frontRepository.softDelete(id);
  }
}
export const frontService = new FrontService();

import { farmRepository } from './repository';
import { AppError } from '../../middleware/errorHandler';

export class FarmService {
  async getAll() { return farmRepository.findAll(); }
  async getById(id: string) {
    const farm = await farmRepository.findById(id);
    if (!farm) throw new AppError('Farm not found', 404);
    return farm;
  }
  async create(data: any) { return farmRepository.create(data); }
  async update(id: string, data: any) {
    const farm = await farmRepository.findById(id);
    if (!farm) throw new AppError('Farm not found', 404);
    return farmRepository.update(id, data);
  }
  async delete(id: string) {
    const farm = await farmRepository.findById(id);
    if (!farm) throw new AppError('Farm not found', 404);
    return farmRepository.softDelete(id);
  }
  async getCount() { return farmRepository.count(); }
  async getTotalArea() { return farmRepository.totalArea(); }
}
export const farmService = new FarmService();

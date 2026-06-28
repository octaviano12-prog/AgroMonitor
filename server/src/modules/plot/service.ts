import { plotRepository } from './repository';
import { AppError } from '../../middleware/errorHandler';

export class PlotService {
  async getAll() { return plotRepository.findAll(); }
  async getById(id: string) {
    const plot = await plotRepository.findById(id);
    if (!plot) throw new AppError('Plot not found', 404);
    return plot;
  }
  async getByFarm(farmId: string) { return plotRepository.findByFarm(farmId); }
  async create(data: any) { return plotRepository.create(data); }
  async update(id: string, data: any) {
    const plot = await plotRepository.findById(id);
    if (!plot) throw new AppError('Plot not found', 404);
    return plotRepository.update(id, data);
  }
  async delete(id: string) {
    const plot = await plotRepository.findById(id);
    if (!plot) throw new AppError('Plot not found', 404);
    return plotRepository.softDelete(id);
  }
}
export const plotService = new PlotService();

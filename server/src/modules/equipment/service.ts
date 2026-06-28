import { equipmentRepository } from './repository';
import { AppError } from '../../middleware/errorHandler';

export class EquipmentService {
  async getAll(filters?: any) {
    return equipmentRepository.findAll(filters);
  }

  async getById(id: string) {
    const equipment = await equipmentRepository.findById(id);
    if (!equipment) throw new AppError('Equipment not found', 404);
    return equipment;
  }

  async getByFleet(fleet: string) {
    const equipment = await equipmentRepository.findByFleet(fleet);
    if (!equipment) throw new AppError('Equipment not found', 404);
    return equipment;
  }

  async create(data: any) {
    const existing = await equipmentRepository.findByFleet(data.fleet);
    if (existing) throw new AppError('Fleet number already registered', 400);
    return equipmentRepository.create(data);
  }

  async update(id: string, data: any) {
    const equipment = await equipmentRepository.findById(id);
    if (!equipment) throw new AppError('Equipment not found', 404);
    return equipmentRepository.update(id, data);
  }

  async delete(id: string) {
    const equipment = await equipmentRepository.findById(id);
    if (!equipment) throw new AppError('Equipment not found', 404);
    return equipmentRepository.softDelete(id);
  }

  async updateStatus(id: string, status: string, speed?: number, latitude?: number, longitude?: number) {
    const equipment = await equipmentRepository.findById(id);
    if (!equipment) throw new AppError('Equipment not found', 404);
    return equipmentRepository.updateStatus(id, status as any, speed, latitude, longitude);
  }

  async getWithFilters(params: any) {
    return equipmentRepository.getWithFilters(params);
  }

  async getCount() {
    return equipmentRepository.count();
  }

  async getCountByStatus() {
    return equipmentRepository.countByStatus();
  }
}

export const equipmentService = new EquipmentService();

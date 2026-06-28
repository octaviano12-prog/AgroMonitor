import { operatorRepository } from './repository';
import { AppError } from '../../middleware/errorHandler';

export class OperatorService {
  async getAll() { return operatorRepository.findAll(); }
  async getById(id: string) {
    const op = await operatorRepository.findById(id);
    if (!op) throw new AppError('Operator not found', 404);
    return op;
  }
  async create(data: any) { return operatorRepository.create(data); }
  async update(id: string, data: any) {
    const op = await operatorRepository.findById(id);
    if (!op) throw new AppError('Operator not found', 404);
    return operatorRepository.update(id, data);
  }
  async delete(id: string) {
    const op = await operatorRepository.findById(id);
    if (!op) throw new AppError('Operator not found', 404);
    return operatorRepository.softDelete(id);
  }
  async getCount() { return operatorRepository.count(); }
}
export const operatorService = new OperatorService();

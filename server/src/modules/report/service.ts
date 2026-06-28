import { reportRepository } from './repository';
import { AppError } from '../../middleware/errorHandler';

export class ReportService {
  async getAll(userId?: string) { return reportRepository.findAll(userId); }
  async getById(id: string) {
    const report = await reportRepository.findById(id);
    if (!report) throw new AppError('Report not found', 404);
    return report;
  }
  async create(data: any) { return reportRepository.create(data); }
  async update(id: string, data: any) {
    const report = await reportRepository.findById(id);
    if (!report) throw new AppError('Report not found', 404);
    return reportRepository.update(id, data);
  }
  async delete(id: string) {
    const report = await reportRepository.findById(id);
    if (!report) throw new AppError('Report not found', 404);
    return reportRepository.delete(id);
  }
}
export const reportService = new ReportService();

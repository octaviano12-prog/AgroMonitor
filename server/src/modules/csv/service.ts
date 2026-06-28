import { csvRepository } from './repository';
import { equipmentRepository } from '../equipment/repository';
import { AppError } from '../../middleware/errorHandler';
import fs from 'fs';
import csv from 'csv-parser';

export class CsvService {
  async getAll() { return csvRepository.findAll(); }
  
  async getById(id: string) {
    const csvImport = await csvRepository.findById(id);
    if (!csvImport) throw new AppError('CSV import not found', 404);
    return csvImport;
  }

  async upload(file: Express.Multer.File, userId: string) {
    const csvImport = await csvRepository.create({
      fileName: file.originalname,
      filePath: file.path,
      status: 'pending',
      uploadedBy: userId,
    });
    return csvImport;
  }

  async processFile(csvId: string) {
    const csvImport = await csvRepository.findById(csvId);
    if (!csvImport) throw new AppError('CSV import not found', 404);

    await csvRepository.update(csvId, { status: 'processing' });

    const results: any[] = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvImport.filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            await csvRepository.update(csvId, {
              totalRows: results.length,
              status: 'completed',
            });
            resolve({ totalRows: results.length, processed: results.length });
          } catch (error) {
            await csvRepository.update(csvId, { status: 'failed' });
            reject(error);
          }
        })
        .on('error', reject);
    });
  }

  async delete(id: string) {
    const csvImport = await csvRepository.findById(id);
    if (!csvImport) throw new AppError('CSV import not found', 404);
    
    if (fs.existsSync(csvImport.filePath)) {
      fs.unlinkSync(csvImport.filePath);
    }
    
    return csvRepository.delete(id);
  }
}
export const csvService = new CsvService();

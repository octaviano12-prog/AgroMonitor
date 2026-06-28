import { timelineRepository } from './repository';

export class TimelineService {
  async getByEquipment(equipmentId: string) { return timelineRepository.findByEquipment(equipmentId); }
  async getByEquipmentAndDate(equipmentId: string, date: string) { return timelineRepository.findByEquipmentAndDate(equipmentId, date); }
  async create(data: any) { return timelineRepository.create(data); }
  async createMany(events: any[]) { return timelineRepository.createMany(events); }
}
export const timelineService = new TimelineService();

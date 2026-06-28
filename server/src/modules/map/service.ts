import { equipmentRepository } from '../equipment/repository';

export class MapService {
  async getAllEquipmentWithLocation() {
    const equipment = await equipmentRepository.findAll();
    return equipment.filter(eq => eq.latitude && eq.longitude).map(eq => ({
      id: eq.id,
      fleet: eq.fleet,
      model: eq.model,
      brand: eq.brand,
      status: eq.status,
      speed: eq.speed,
      latitude: eq.latitude,
      longitude: eq.longitude,
      operator: eq.operator?.name,
      front: eq.front?.name,
      lastUpdate: eq.lastUpdate,
    }));
  }
}
export const mapService = new MapService();

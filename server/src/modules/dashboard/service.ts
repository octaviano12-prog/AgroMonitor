import { equipmentRepository } from '../equipment/repository';
import { operatorRepository } from '../operator/repository';
import { farmRepository } from '../farm/repository';
import { frontRepository } from '../front/repository';

export class DashboardService {
  async getOverview() {
    const [equipmentStats, operatorCount, farmCount, frontCount] = await Promise.all([
      equipmentRepository.countByStatus(),
      operatorRepository.count(),
      farmRepository.count(),
      frontRepository.findAll().then(f => f.length),
    ]);

    const totalHours = 142; // Mock data
    const avgEfficiency = 89.2; // Mock data
    const activeAlerts = 4; // Mock data

    return {
      equipment: equipmentStats,
      operators: operatorCount,
      farms: farmCount,
      fronts: frontCount,
      totalHours,
      avgEfficiency,
      activeAlerts,
    };
  }

  async getKPIs() {
    return {
      equipmentOnline: '7/10',
      hoursWorked: '142h',
      avgEfficiency: '89.2%',
      activeAlerts: 4,
    };
  }
}
export const dashboardService = new DashboardService();

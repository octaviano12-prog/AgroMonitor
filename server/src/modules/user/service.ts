import { prisma } from '../../config/database';
import { userRepository } from '../auth/repository';

export class UserService {
  async getAll() {
    return userRepository.findAll();
  }
  async getById(id: string) {
    return userRepository.findById(id);
  }
  async update(id: string, data: any) {
    return prisma.user.update({ where: { id }, data });
  }
  async delete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'INACTIVE' },
    });
  }
  async changeRole(id: string, role: string) {
    return prisma.user.update({ where: { id }, data: { role: role as any } });
  }
}
export const userService = new UserService();

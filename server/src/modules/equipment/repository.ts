import { prisma } from '../../config/database';
import { EquipmentStatus } from '@prisma/client';

export class EquipmentRepository {
  async findAll(filters?: { status?: EquipmentStatus; operatorId?: string; frontId?: string }) {
    return prisma.equipment.findMany({
      where: { deletedAt: null, ...filters },
      include: {
        operator: { select: { id: true, name: true, registration: true } },
        front: { select: { id: true, name: true } },
        farm: { select: { id: true, name: true } },
        plot: { select: { id: true, name: true, code: true } },
      },
      orderBy: { fleet: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.equipment.findUnique({
      where: { id, deletedAt: null },
      include: {
        operator: true,
        front: true,
        farm: true,
        plot: true,
        timeline: { orderBy: { createdAt: 'desc' }, take: 50 },
        documents: true,
      },
    });
  }

  async findByFleet(fleet: string) {
    return prisma.equipment.findUnique({
      where: { fleet, deletedAt: null },
      include: {
        operator: true,
        front: true,
        farm: true,
        plot: true,
        timeline: { orderBy: { createdAt: 'desc' }, take: 50 },
      },
    });
  }

  async create(data: any) {
    return prisma.equipment.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.equipment.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async softDelete(id: string) {
    return prisma.equipment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateStatus(id: string, status: EquipmentStatus, speed?: number, latitude?: number, longitude?: number) {
    return prisma.equipment.update({
      where: { id },
      data: { status, speed, latitude, longitude, lastUpdate: new Date(), updatedAt: new Date() },
    });
  }

  async count() {
    return prisma.equipment.count({ where: { deletedAt: null } });
  }

  async countByStatus() {
    const online = await prisma.equipment.count({ where: { status: 'ONLINE', deletedAt: null } });
    const offline = await prisma.equipment.count({ where: { status: 'OFFLINE', deletedAt: null } });
    const working = await prisma.equipment.count({ where: { status: 'WORKING', deletedAt: null } });
    const maintenance = await prisma.equipment.count({ where: { status: 'MAINTENANCE', deletedAt: null } });
    return { online, offline, working, maintenance, total: online + offline + working + maintenance };
  }

  async getWithFilters(params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    type?: string;
    frontId?: string;
  }) {
    const { page, limit, search, status, type, frontId } = params;
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { fleet: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { operator: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (status) where.status = status;
    if (type) where.type = type;
    if (frontId) where.frontId = frontId;

    const [data, total] = await Promise.all([
      prisma.equipment.findMany({
        where,
        include: {
          operator: { select: { id: true, name: true } },
          front: { select: { id: true, name: true } },
          farm: { select: { id: true, name: true } },
        },
        skip,
        take: limit,
        orderBy: { fleet: 'asc' },
      }),
      prisma.equipment.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}

export const equipmentRepository = new EquipmentRepository();

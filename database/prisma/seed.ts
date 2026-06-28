import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@agromonitor.pro' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@agromonitor.pro',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      phone: '(34) 99999-0001',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample farms
  const farms = await Promise.all([
    prisma.farm.create({
      data: {
        name: 'Fazenda Boa Vista',
        city: 'Uberaba',
        state: 'MG',
        area: 2500,
        responsible: 'José Almeida',
        latitude: -19.9173,
        longitude: -44.1573,
      },
    }),
    prisma.farm.create({
      data: {
        name: 'Fazenda São José',
        city: 'Uberlândia',
        state: 'MG',
        area: 3200,
        responsible: 'Maria Oliveira',
        latitude: -19.9250,
        longitude: -44.1500,
      },
    }),
    prisma.farm.create({
      data: {
        name: 'Fazenda Santa Maria',
        city: 'Araguari',
        state: 'MG',
        area: 1800,
        responsible: 'Carlos Mendes',
        latitude: -19.9400,
        longitude: -44.1300,
      },
    }),
  ]);

  console.log('✅ Farms created:', farms.length);

  // Create plots
  const plots = await Promise.all([
    prisma.plot.create({
      data: { name: 'Talhão A1', code: 'TA1', area: 120, crop: 'Soja', status: 'CULTIVATION', farmId: farms[0].id },
    }),
    prisma.plot.create({
      data: { name: 'Talhão A2', code: 'TA2', area: 95, crop: 'Milho', status: 'PREPARATION', farmId: farms[0].id },
    }),
    prisma.plot.create({
      data: { name: 'Talhão B1', code: 'TB1', area: 150, crop: 'Soja', status: 'HARVEST', farmId: farms[0].id },
    }),
  ]);

  console.log('✅ Plots created:', plots.length);

  // Create fronts
  const fronts = await Promise.all([
    prisma.front.create({ data: { name: 'Frente 01 - Preparo', supervisor: 'Antônio Pereira', area: 450, status: 'ACTIVE' } }),
    prisma.front.create({ data: { name: 'Frente 02 - Colheita', supervisor: 'Maria Souza', area: 380, status: 'ACTIVE' } }),
    prisma.front.create({ data: { name: 'Frente 03 - Pulverização', supervisor: 'José Santos', area: 520, status: 'ACTIVE' } }),
  ]);

  console.log('✅ Fronts created:', fronts.length);

  // Create operators
  const operators = await Promise.all([
    prisma.operator.create({
      data: {
        name: 'Carlos Silva',
        cpf: '123.456.789-00',
        phone: '(34) 99999-1234',
        email: 'carlos@fazenda.com',
        registration: 'OP-001',
        role: 'Operador Sênior',
        shift: 'DAY',
        supervisor: 'Antônio Pereira',
        rating: 4.8,
        hoursWorked: 1240,
      },
    }),
    prisma.operator.create({
      data: {
        name: 'Roberto Santos',
        cpf: '234.567.890-11',
        phone: '(34) 99999-2345',
        email: 'roberto@fazenda.com',
        registration: 'OP-002',
        role: 'Operador Pleno',
        shift: 'DAY',
        supervisor: 'Antônio Pereira',
        rating: 4.5,
        hoursWorked: 1180,
      },
    }),
    prisma.operator.create({
      data: {
        name: 'João Oliveira',
        cpf: '345.678.901-22',
        phone: '(34) 99999-3456',
        email: 'joao@fazenda.com',
        registration: 'OP-003',
        role: 'Operador Sênior',
        shift: 'DAY',
        supervisor: 'Maria Souza',
        rating: 4.9,
        hoursWorked: 1320,
      },
    }),
  ]);

  console.log('✅ Operators created:', operators.length);

  // Create equipment
  const equipment = await Promise.all([
    prisma.equipment.create({
      data: {
        fleet: '3201',
        model: '8R 410',
        brand: 'John Deere',
        year: 2023,
        hourMeter: 3420,
        plate: 'QPL-4521',
        type: 'Trator',
        status: 'WORKING',
        speed: 8.2,
        latitude: -19.9173,
        longitude: -44.1573,
        operatorId: operators[0].id,
        frontId: fronts[0].id,
        farmId: farms[0].id,
        plotId: plots[0].id,
        availability: 94,
        efficiency: 87,
        lastUpdate: new Date(),
      },
    }),
    prisma.equipment.create({
      data: {
        fleet: '3202',
        model: '8R 370',
        brand: 'John Deere',
        year: 2022,
        hourMeter: 4150,
        plate: 'QPL-4522',
        type: 'Trator',
        status: 'WORKING',
        speed: 7.5,
        latitude: -19.9200,
        longitude: -44.1600,
        operatorId: operators[1].id,
        frontId: fronts[0].id,
        farmId: farms[0].id,
        plotId: plots[1].id,
        availability: 91,
        efficiency: 82,
        lastUpdate: new Date(),
      },
    }),
    prisma.equipment.create({
      data: {
        fleet: '2101',
        model: 'S790',
        brand: 'John Deere',
        year: 2024,
        hourMeter: 1200,
        plate: 'ABC-1234',
        type: 'Colheitadeira',
        status: 'ONLINE',
        speed: 0,
        latitude: -19.9250,
        longitude: -44.1500,
        operatorId: operators[2].id,
        frontId: fronts[1].id,
        farmId: farms[1].id,
        plotId: plots[2].id,
        availability: 97,
        efficiency: 91,
        lastUpdate: new Date(),
      },
    }),
  ]);

  console.log('✅ Equipment created:', equipment.length);

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📋 Login credentials:');
  console.log('   Email: admin@agromonitor.pro');
  console.log('   Password: admin123\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

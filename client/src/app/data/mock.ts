export interface Equipment {
  id: string; fleet: string; model: string; brand: string; year: number;
  hourMeter: number; plate: string; type: string; operator: string;
  front: string; status: 'online' | 'offline' | 'maintenance' | 'working';
  lat: number; lng: number; speed: number; lastUpdate: string;
  availability: number; efficiency: number; photo?: string;
}

export interface Operator {
  id: string; name: string; cpf: string; phone: string; email: string;
  registration: string; role: string; shift: string; supervisor: string;
  photo?: string; rating: number; hoursWorked: number;
}

export interface Farm {
  id: string; name: string; city: string; state: string; area: number;
  responsible: string; lat: number; lng: number; plots: Plot[];
}

export interface Plot {
  id: string; name: string; code: string; area: number; farmId: string;
  crop: string; status: string;
}

export interface Front {
  id: string; name: string; supervisor: string; equipmentCount: number;
  area: number; status: 'active' | 'paused' | 'completed';
}

export interface TimelineEvent {
  time: string; type: string; description: string; details: Record<string, string>;
  status: 'working' | 'stopped' | 'moving' | 'idle';
}

export interface Notification {
  id: string; title: string; message: string; type: 'alert' | 'info' | 'warning' | 'success';
  time: string; read: boolean;
}

export const equipment: Equipment[] = [
  { id: '1', fleet: '3201', model: '8R 410', brand: 'John Deere', year: 2023, hourMeter: 3420, plate: 'QPL-4521', type: 'Trator', operator: 'Carlos Silva', front: 'Frente 01', status: 'working', lat: -19.9173, lng: -44.1573, speed: 8.2, lastUpdate: '2 min', availability: 94, efficiency: 87, photo: '' },
  { id: '2', fleet: '3202', model: '8R 370', brand: 'John Deere', year: 2022, hourMeter: 4150, plate: 'QPL-4522', type: 'Trator', operator: 'Roberto Santos', front: 'Frente 01', status: 'working', lat: -19.9200, lng: -44.1600, speed: 7.5, lastUpdate: '1 min', availability: 91, efficiency: 82, photo: '' },
  { id: '3', fleet: '2101', model: 'S790', brand: 'John Deere', year: 2024, hourMeter: 1200, plate: 'ABC-1234', type: 'Colheitadeira', operator: 'João Oliveira', front: 'Frente 02', status: 'online', lat: -19.9250, lng: -44.1500, speed: 0, lastUpdate: '5 min', availability: 97, efficiency: 91, photo: '' },
  { id: '4', fleet: '2102', model: 'S780', brand: 'John Deere', year: 2023, hourMeter: 2100, plate: 'ABC-1235', type: 'Colheitadeira', operator: 'Pedro Lima', front: 'Frente 02', status: 'maintenance', lat: -19.9300, lng: -44.1400, speed: 0, lastUpdate: '1 h', availability: 78, efficiency: 0, photo: '' },
  { id: '5', fleet: '4301', model: '2620CP', brand: 'John Deere', year: 2023, hourMeter: 1850, plate: 'DEF-5678', type: 'Pulverizador', operator: 'André Costa', front: 'Frente 03', status: 'working', lat: -19.9100, lng: -44.1700, speed: 12.0, lastUpdate: '30 s', availability: 96, efficiency: 89, photo: '' },
  { id: '6', fleet: '4302', model: 'M940i', brand: 'John Deere', year: 2022, hourMeter: 2900, plate: 'DEF-5679', type: 'Pulverizador', operator: 'Lucas Ferreira', front: 'Frente 03', status: 'offline', lat: -19.9150, lng: -44.1650, speed: 0, lastUpdate: '3 h', availability: 82, efficiency: 0, photo: '' },
  { id: '7', fleet: '5101', model: '1775NT', brand: 'John Deere', year: 2024, hourMeter: 800, plate: 'GHI-9012', type: 'Plantadeira', operator: 'Marcos Souza', front: 'Frente 04', status: 'working', lat: -19.9400, lng: -44.1300, speed: 6.0, lastUpdate: '1 min', availability: 98, efficiency: 93, photo: '' },
  { id: '8', fleet: '5102', model: 'DB60', brand: 'John Deere', year: 2023, hourMeter: 1500, plate: 'GHI-9013', type: 'Plantadeira', operator: 'Felipe Ramos', front: 'Frente 04', status: 'online', lat: -19.9350, lng: -44.1450, speed: 0, lastUpdate: '10 min', availability: 95, efficiency: 0, photo: '' },
  { id: '9', fleet: '6201', model: '6130J', brand: 'John Deere', year: 2021, hourMeter: 5200, plate: 'JKL-3456', type: 'Trator', operator: 'Rafael Mendes', front: 'Frente 01', status: 'maintenance', lat: -19.9200, lng: -44.1550, speed: 0, lastUpdate: '2 d', availability: 65, efficiency: 0, photo: '' },
  { id: '10', fleet: '7101', model: 'T360', brand: 'Raven', year: 2024, hourMeter: 600, plate: 'MNO-7890', type: 'Drone', operator: 'Thiago Alves', front: 'Frente 05', status: 'working', lat: -19.9050, lng: -44.1800, speed: 15.0, lastUpdate: '15 s', availability: 99, efficiency: 95, photo: '' },
];

export const operators: Operator[] = [
  { id: '1', name: 'Carlos Silva', cpf: '123.456.789-00', phone: '(34) 99999-1234', email: 'carlos@fazenda.com', registration: 'OP-001', role: 'Operador Sênior', shift: 'Diurno', supervisor: 'Antônio Pereira', rating: 4.8, hoursWorked: 1240 },
  { id: '2', name: 'Roberto Santos', cpf: '234.567.890-11', phone: '(34) 99999-2345', email: 'roberto@fazenda.com', registration: 'OP-002', role: 'Operador Pleno', shift: 'Diurno', supervisor: 'Antônio Pereira', rating: 4.5, hoursWorked: 1180 },
  { id: '3', name: 'João Oliveira', cpf: '345.678.901-22', phone: '(34) 99999-3456', email: 'joao@fazenda.com', registration: 'OP-003', role: 'Operador Sênior', shift: 'Diurno', supervisor: 'Maria Souza', rating: 4.9, hoursWorked: 1320 },
  { id: '4', name: 'Pedro Lima', cpf: '456.789.012-33', phone: '(34) 99999-4567', email: 'pedro@fazenda.com', registration: 'OP-004', role: 'Operador Pleno', shift: 'Noturno', supervisor: 'Maria Souza', rating: 4.2, hoursWorked: 980 },
  { id: '5', name: 'André Costa', cpf: '567.890.123-44', phone: '(34) 99999-5678', email: 'andre@fazenda.com', registration: 'OP-005', role: 'Operador Sênior', shift: 'Diurno', supervisor: 'José Santos', rating: 4.7, hoursWorked: 1150 },
  { id: '6', name: 'Lucas Ferreira', cpf: '678.901.234-55', phone: '(34) 99999-6789', email: 'lucas@fazenda.com', registration: 'OP-006', role: 'Operador Júnior', shift: 'Diurno', supervisor: 'José Santos', rating: 3.8, hoursWorked: 560 },
  { id: '7', name: 'Marcos Souza', cpf: '789.012.345-66', phone: '(34) 99999-7890', email: 'marcos@fazenda.com', registration: 'OP-007', role: 'Operador Sênior', shift: 'Diurno', supervisor: 'Antônio Pereira', rating: 4.6, hoursWorked: 1290 },
  { id: '8', name: 'Felipe Ramos', cpf: '890.123.456-77', phone: '(34) 99999-8901', email: 'felipe@fazenda.com', registration: 'OP-008', role: 'Operador Pleno', shift: 'Noturno', supervisor: 'Maria Souza', rating: 4.3, hoursWorked: 890 },
];

export const farms: Farm[] = [
  { id: '1', name: 'Fazenda Boa Vista', city: 'Uberaba', state: 'MG', area: 2500, responsible: 'José Almeida', lat: -19.9173, lng: -44.1573, plots: [
    { id: 'p1', name: 'Talhão A1', code: 'TA1', area: 120, farmId: '1', crop: 'Soja', status: 'Em cultivo' },
    { id: 'p2', name: 'Talhão A2', code: 'TA2', area: 95, farmId: '1', crop: 'Milho', status: 'Em preparo' },
    { id: 'p3', name: 'Talhão B1', code: 'TB1', area: 150, farmId: '1', crop: 'Soja', status: 'Colheita' },
    { id: 'p4', name: 'Talhão B2', code: 'TB2', area: 80, farmId: '1', crop: 'Algodão', status: 'Em cultivo' },
  ]},
  { id: '2', name: 'Fazenda São José', city: 'Uberlândia', state: 'MG', area: 3200, responsible: 'Maria Oliveira', lat: -19.9250, lng: -44.1500, plots: [
    { id: 'p5', name: 'Talhão C1', code: 'TC1', area: 200, farmId: '2', crop: 'Milho', status: 'Em cultivo' },
    { id: 'p6', name: 'Talhão C2', code: 'TC2', area: 180, farmId: '2', crop: 'Soja', status: 'Pousio' },
    { id: 'p7', name: 'Talhão D1', code: 'TD1', area: 250, farmId: '2', crop: 'Milho', status: 'Em preparo' },
  ]},
  { id: '3', name: 'Fazenda Santa Maria', city: 'Araguari', state: 'MG', area: 1800, responsible: 'Carlos Mendes', lat: -19.9400, lng: -44.1300, plots: [
    { id: 'p8', name: 'Talhão E1', code: 'TE1', area: 100, farmId: '3', crop: 'Café', status: 'Em cultivo' },
    { id: 'p9', name: 'Talhão E2', code: 'TE2', area: 130, farmId: '3', crop: 'Soja', status: 'Colheita' },
  ]},
];

export const fronts: Front[] = [
  { id: '1', name: 'Frente 01 - Preparo', supervisor: 'Antônio Pereira', equipmentCount: 3, area: 450, status: 'active' },
  { id: '2', name: 'Frente 02 - Colheita', supervisor: 'Maria Souza', equipmentCount: 2, area: 380, status: 'active' },
  { id: '3', name: 'Frente 03 - Pulverização', supervisor: 'José Santos', equipmentCount: 2, area: 520, status: 'active' },
  { id: '4', name: 'Frente 04 - Plantio', supervisor: 'Antônio Pereira', equipmentCount: 2, area: 290, status: 'active' },
  { id: '5', name: 'Frente 05 - Monitoramento', supervisor: 'Carlos Mendes', equipmentCount: 1, area: 1000, status: 'paused' },
];

export const timelineEvents: TimelineEvent[] = [
  { time: '06:00', type: 'start', description: 'Início do turno - Check-list realizado', details: { operacao: 'Preparo de solo', operador: 'Carlos Silva', equipamento: 'JD 8R 410 - 3201', combustivel: '98%' }, status: 'working' },
  { time: '06:25', type: 'move', description: 'Deslocamento para Talhão A1', details: { destino: 'Talhão A1', distancia: '2.3 km', velocidade: '12 km/h' }, status: 'moving' },
  { time: '07:10', type: 'work', description: 'Início da operação de aração', details: { operacao: 'Aração', profundidade: '25 cm', velocidade: '8 km/h', turno: 'Diurno' }, status: 'working' },
  { time: '08:43', type: 'stop', description: 'Parada para abastecimento', details: { motivo: 'Abastecimento diesel', duracao: '12 min', litros: '180 L' }, status: 'stopped' },
  { time: '09:15', type: 'work', description: 'Retomada da operação de aração', details: { operacao: 'Aração', area_parcial: '45 ha', progresso: '38%' }, status: 'working' },
  { time: '10:30', type: 'alert', description: 'Alerta: Velocidade acima do padrão', details: { velocidade: '11.2 km/h', limite: '9 km/h', duracao: '3 min', acao: 'Operador notificado' }, status: 'idle' },
  { time: '12:00', type: 'stop', description: 'Parada para almoço', details: { duracao: '60 min', local: 'Base operacional' }, status: 'stopped' },
  { time: '13:00', type: 'work', description: 'Retomada - Aração Talhão A1', details: { operacao: 'Aração', area_parcial: '78 ha', progresso: '65%' }, status: 'working' },
  { time: '14:52', type: 'work', description: 'Finalização Talhão A1 - Início Talhão A2', details: { operacao: 'Gradagem', area_total: '120 ha', progresso: '72%' }, status: 'working' },
  { time: '16:30', type: 'move', description: 'Deslocamento para base', details: { destino: 'Base operacional', distancia: '3.1 km' }, status: 'moving' },
  { time: '17:59', type: 'end', description: 'Fim do turno - Relatório gerado', details: { area_total: '120 ha', diesel_consumido: '340 L', tempo_produtivo: '9h 15min', tempo_improdutivo: '1h 24min', eficiencia: '87%' }, status: 'idle' },
];

export const notifications: Notification[] = [
  { id: '1', title: 'Manutenção Preventiva', message: 'Equipamento 2102 (S780) agendado para manutenção em 2 dias', type: 'warning', time: '5 min', read: false },
  { id: '2', title: 'Alerta de Velocidade', message: 'Frota 3201 excedeu limite de velocidade no Talhão B1', type: 'alert', time: '12 min', read: false },
  { id: '3', title: 'CSV Processado', message: 'Arquivo SGPA_2024_06.csv importado com sucesso - 1.245 registros', type: 'success', time: '25 min', read: false },
  { id: '4', title: 'Equipamento Offline', message: 'Frota 4302 sem comunicação há mais de 3 horas', type: 'alert', time: '32 min', read: true },
  { id: '5', title: 'Meta Atingida', message: 'Frente 02 atingiu 100% da meta diária de colheita', type: 'success', time: '1 h', read: true },
  { id: '6', title: 'Novo Operador', message: 'Felipe Ramos foi adicionado à Frente 04', type: 'info', time: '2 h', read: true },
];

export const chartData = {
  dailyProduction: [
    { day: 'Seg', frente1: 120, frente2: 85, frente3: 45, frente4: 95 },
    { day: 'Ter', frente1: 135, frente2: 92, frente3: 52, frente4: 88 },
    { day: 'Qua', frente1: 128, frente2: 100, frente3: 48, frente4: 102 },
    { day: 'Qui', frente1: 142, frente2: 88, frente3: 55, frente4: 110 },
    { day: 'Sex', frente1: 155, frente2: 105, frente3: 60, frente4: 98 },
    { day: 'Sáb', frente1: 130, frente2: 78, frente3: 42, frente4: 85 },
    { day: 'Dom', frente1: 0, frente2: 0, frente3: 0, frente4: 0 },
  ],
  hourlyActivity: [
    { hour: '06', working: 8, stopped: 2 },
    { hour: '07', working: 9, stopped: 1 },
    { hour: '08', working: 10, stopped: 0 },
    { hour: '09', working: 9, stopped: 1 },
    { hour: '10', working: 8, stopped: 2 },
    { hour: '11', working: 7, stopped: 3 },
    { hour: '12', working: 4, stopped: 6 },
    { hour: '13', working: 8, stopped: 2 },
    { hour: '14', working: 9, stopped: 1 },
    { hour: '15', working: 10, stopped: 0 },
    { hour: '16', working: 9, stopped: 1 },
    { hour: '17', working: 6, stopped: 4 },
    { hour: '18', working: 2, stopped: 8 },
  ],
  efficiencyByFront: [
    { name: 'Frente 01', efficiency: 87, availability: 94, utilization: 82 },
    { name: 'Frente 02', efficiency: 91, availability: 97, utilization: 88 },
    { name: 'Frente 03', efficiency: 89, availability: 96, utilization: 85 },
    { name: 'Frente 04', efficiency: 93, availability: 98, utilization: 90 },
    { name: 'Frente 05', efficiency: 95, availability: 99, utilization: 78 },
  ],
  weeklyHours: [
    { week: 'S1', horas_trabalho: 420, horas_parada: 45 },
    { week: 'S2', horas_trabalho: 380, horas_parada: 65 },
    { week: 'S3', horas_trabalho: 450, horas_parada: 35 },
    { week: 'S4', horas_trabalho: 410, horas_parada: 55 },
  ],
};

export const statusLabels: Record<string, string> = {
  online: 'Online', offline: 'Offline', maintenance: 'Manutenção', working: 'Trabalhando',
};
export const statusColors: Record<string, string> = {
  online: 'green', offline: 'red', maintenance: 'amber', working: 'blue',
};

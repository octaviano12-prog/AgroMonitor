export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPERVISOR' | 'MONITOR' | 'OPERATOR' | 'VISITOR';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  phone?: string;
  avatar?: string;
  twoFactorEnabled: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Equipment {
  id: string;
  fleet: string;
  model: string;
  brand: string;
  year: number;
  hourMeter: number;
  plate?: string;
  type: string;
  status: 'ONLINE' | 'OFFLINE' | 'WORKING' | 'MAINTENANCE';
  speed: number;
  latitude?: number;
  longitude?: number;
  lastUpdate?: string;
  photo?: string;
  availability: number;
  efficiency: number;
  operatorId?: string;
  frontId?: string;
  farmId?: string;
  plotId?: string;
  operator?: Operator;
  front?: Front;
  farm?: Farm;
  plot?: Plot;
  createdAt: string;
  updatedAt: string;
}

export interface Operator {
  id: string;
  name: string;
  cpf: string;
  phone?: string;
  email?: string;
  registration: string;
  role: string;
  shift: 'DAY' | 'NIGHT' | 'ROTATING';
  supervisor: string;
  photo?: string;
  rating: number;
  hoursWorked: number;
  createdAt: string;
  updatedAt: string;
}

export interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  area: number;
  responsible: string;
  latitude?: number;
  longitude?: number;
  plots?: Plot[];
  createdAt: string;
  updatedAt: string;
}

export interface Plot {
  id: string;
  name: string;
  code: string;
  area: number;
  crop: string;
  status: 'CULTIVATION' | 'HARVEST' | 'PREPARATION' | 'FALLOW';
  farmId: string;
  farm?: Farm;
  createdAt: string;
  updatedAt: string;
}

export interface Front {
  id: string;
  name: string;
  supervisor: string;
  area: number;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  equipments?: Equipment[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  type: 'START' | 'MOVE' | 'WORK' | 'STOP' | 'ALERT' | 'END';
  description: string;
  details: any;
  status: string;
  equipmentId: string;
  createdAt: string;
}

export interface CsvImport {
  id: string;
  fileName: string;
  filePath: string;
  totalRows: number;
  processedRows: number;
  status: string;
  columnMapping?: any;
  errors?: any;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'ALERT' | 'INFO' | 'WARNING' | 'SUCCESS';
  read: boolean;
  userId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  format: 'PDF' | 'EXCEL' | 'CSV' | 'WORD';
  status: 'READY' | 'GENERATING' | 'FAILED';
  filePath?: string;
  dateRange?: any;
  filters?: any;
  scheduledAt?: string;
  frequency?: string;
  recipients?: any;
  generatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  equipment: {
    online: number;
    offline: number;
    working: number;
    maintenance: number;
    total: number;
  };
  operators: number;
  farms: number;
  fronts: number;
  totalHours: number;
  avgEfficiency: number;
  activeAlerts: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
}

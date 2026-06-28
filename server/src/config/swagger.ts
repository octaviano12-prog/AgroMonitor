import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AgroMonitor Pro API',
      version: '1.0.0',
      description: 'API REST para o sistema de monitoramento operacional agrícola',
      contact: {
        name: 'AgroMonitor Pro',
        email: 'support@agromonitor.pro',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'https://api.agromonitor.pro',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['ADMIN', 'SUPERVISOR', 'MONITOR', 'OPERATOR', 'VISITOR'] },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'] },
            phone: { type: 'string' },
            avatar: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Equipment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            fleet: { type: 'string' },
            model: { type: 'string' },
            brand: { type: 'string' },
            year: { type: 'integer' },
            hourMeter: { type: 'number' },
            plate: { type: 'string' },
            type: { type: 'string' },
            status: { type: 'string', enum: ['ONLINE', 'OFFLINE', 'WORKING', 'MAINTENANCE'] },
            speed: { type: 'number' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            availability: { type: 'number' },
            efficiency: { type: 'number' },
            operatorId: { type: 'string', format: 'uuid' },
            frontId: { type: 'string', format: 'uuid' },
            farmId: { type: 'string', format: 'uuid' },
            plotId: { type: 'string', format: 'uuid' },
          },
        },
        Operator: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            cpf: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            registration: { type: 'string' },
            role: { type: 'string' },
            shift: { type: 'string', enum: ['DAY', 'NIGHT', 'ROTATING'] },
            supervisor: { type: 'string' },
            rating: { type: 'number' },
            hoursWorked: { type: 'number' },
          },
        },
        Farm: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            area: { type: 'number' },
            responsible: { type: 'string' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            statusCode: { type: 'integer' },
          },
        },
      },
    },
  },
  apis: ['./src/modules/*/routes.ts'],
});

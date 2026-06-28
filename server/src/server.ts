import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';

import { config } from './config';
import { prisma } from './config/database';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';
import { rateLimiter } from './middleware/rateLimiter';

// Routes
import { authRoutes } from './modules/auth/routes';
import { equipmentRoutes } from './modules/equipment/routes';
import { operatorRoutes } from './modules/operator/routes';
import { farmRoutes } from './modules/farm/routes';
import { plotRoutes } from './modules/plot/routes';
import { frontRoutes } from './modules/front/routes';
import { csvRoutes } from './modules/csv/routes';
import { timelineRoutes } from './modules/timeline/routes';
import { mapRoutes } from './modules/map/routes';
import { aiRoutes } from './modules/ai/routes';
import { reportRoutes } from './modules/report/routes';
import { notificationRoutes } from './modules/notification/routes';
import { dashboardRoutes } from './modules/dashboard/routes';
import { userRoutes } from './modules/user/routes';

// WebSocket
import { setupWebSocket } from './websocket';

const app = express();
const httpServer = createServer(app);

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: config.cors.origin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use(rateLimiter);

// Static files
app.use('/uploads', express.static('uploads'));

const clientOutPath = path.resolve(__dirname, '../../client/out');
app.use(express.static(clientOutPath));

// Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/equipment', authMiddleware, equipmentRoutes);
app.use('/api/operators', authMiddleware, operatorRoutes);
app.use('/api/farms', authMiddleware, farmRoutes);
app.use('/api/plots', authMiddleware, plotRoutes);
app.use('/api/fronts', authMiddleware, frontRoutes);
app.use('/api/csv', authMiddleware, csvRoutes);
app.use('/api/timeline', authMiddleware, timelineRoutes);
app.use('/api/map', authMiddleware, mapRoutes);
app.use('/api/ai', authMiddleware, aiRoutes);
app.use('/api/reports', authMiddleware, reportRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/users', authMiddleware, userRoutes);

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  res.sendFile(path.join(clientOutPath, 'index.html'), (error) => {
    if (error) next(error);
  });
});

// Error handling
app.use(errorHandler);

// WebSocket setup
setupWebSocket(io);

// Start server
const PORT = config.port;

httpServer.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🌱 AgroMonitor Pro - Server                             ║
║                                                           ║
║   🚀 Running on: http://localhost:${PORT}                  ║
║   📚 API Docs:    http://localhost:${PORT}/api/docs        ║
║   🔌 WebSocket:   ws://localhost:${PORT}                   ║
║   🌍 Environment: ${config.nodeEnv}                               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { app, io };

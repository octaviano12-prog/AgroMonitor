import { Server, Socket } from 'socket.io';

export const setupWebSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Equipment status updates
    socket.on('equipment:status:update', (data) => {
      socket.broadcast.emit('equipment:status:updated', data);
    });

    // Join equipment room for real-time updates
    socket.on('equipment:join', (equipmentId: string) => {
      socket.join(`equipment:${equipmentId}`);
      console.log(`Socket ${socket.id} joined equipment:${equipmentId}`);
    });

    socket.on('equipment:leave', (equipmentId: string) => {
      socket.leave(`equipment:${equipmentId}`);
    });

    // Join farm room
    socket.on('farm:join', (farmId: string) => {
      socket.join(`farm:${farmId}`);
    });

    socket.on('farm:leave', (farmId: string) => {
      socket.leave(`farm:${farmId}`);
    });

    // Dashboard real-time updates
    socket.on('dashboard:subscribe', () => {
      socket.join('dashboard');
    });

    socket.on('dashboard:unsubscribe', () => {
      socket.leave('dashboard');
    });

    // Notifications
    socket.on('notification:subscribe', () => {
      socket.join('notifications');
    });

    socket.disconnect();
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Helper to emit events
export const emitToDashboard = (io: Server, event: string, data: any) => {
  io.to('dashboard').emit(event, data);
};

export const emitToEquipment = (io: Server, equipmentId: string, event: string, data: any) => {
  io.to(`equipment:${equipmentId}`).emit(event, data);
};

export const emitToFarm = (io: Server, farmId: string, event: string, data: any) => {
  io.to(`farm:${farmId}`).emit(event, data);
};

export const emitToAll = (io: Server, event: string, data: any) => {
  io.emit(event, data);
};

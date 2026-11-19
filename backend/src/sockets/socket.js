import { Server } from 'socket.io';
import { setSocketIO } from '../services/notificationService.js';
import logger from '../config/logger.js';

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  setSocketIO(io);

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    // Join department live queue room
    socket.on('join_department', (departmentId) => {
      socket.join(`dept:${departmentId}`);
      logger.info(`Socket ${socket.id} joined department room: dept:${departmentId}`);
    });

    // Leave department room
    socket.on('leave_department', (departmentId) => {
      socket.leave(`dept:${departmentId}`);
    });

    // Join user's personal channel for private notifications (tokens, lab reports ready)
    socket.on('join_user', (userId) => {
      socket.join(`user:${userId}`);
      logger.info(`Socket ${socket.id} joined personal room: user:${userId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default initSocket;

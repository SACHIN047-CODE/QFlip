import http from 'http';
import app from './app.js';
import config from './config/env.js';
import logger from './config/logger.js';
import connectDB, { disconnectDB } from './config/db.js';
import { initSocket } from './sockets/socket.js';

const startServer = async () => {
  try {
    // 1. Connect Database
    await connectDB();

    // 2. Create HTTP Server
    const httpServer = http.createServer(app);

    // 3. Initialize Real-Time WebSockets
    initSocket(httpServer);

    // 4. Start Listening
    const server = httpServer.listen(config.port, () => {
      logger.info(`=======================================================`);
      logger.info(`  CAREFLOW BACKEND SERVER RUNNING ON PORT ${config.port}`);
      logger.info(`  Mode: ${config.env.toUpperCase()}`);
      logger.info(`  Health: http://localhost:${config.port}/api/health`);
      logger.info(`=======================================================`);
    });

    // Graceful Shutdown
    const shutdown = async (signal) => {
      logger.info(`${signal} received. Initiating graceful shutdown...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error(`Fatal server startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();

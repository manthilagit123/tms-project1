const { Server } = require('socket.io');

function initSocketServer(httpServer) {
  return new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 20000,
  });
}
module.exports = initSocketServer;
const { Server } = require('socket.io');

function initSocketServer(httpServer) {
  return new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
          origin === process.env.FRONTEND_URL || 
          origin.endsWith('.vercel.app') || 
          origin.startsWith('http://localhost:')
        ) {
            return callback(null, true);
        }
        return callback(new Error(`Socket CORS: origin ${origin} not allowed`));
      },
      credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 20000,
  });
}
module.exports = initSocketServer;
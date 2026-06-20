const { verifyToken } = require('../utils/token.util');

function registerSocketAuth(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token provided'));
    try {
      socket.user = verifyToken(token);
      next();
    } catch {
      next(new Error('Unauthorized socket connection'));
    }
  });
}
module.exports = registerSocketAuth;
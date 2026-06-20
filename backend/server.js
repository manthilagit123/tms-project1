require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const initSocketServer = require('./src/sockets/socket.server');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = initSocketServer(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
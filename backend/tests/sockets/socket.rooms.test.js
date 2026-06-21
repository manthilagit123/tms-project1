const { createServer } = require('http');
const { io: ioClient } = require('socket.io-client');
const initSocketServer = require('../../src/sockets/socket.server');
const registerSocketAuth = require('../../src/sockets/socket.auth');

let io, httpServer, port;

beforeAll((done) => {
  httpServer = createServer();
  io = initSocketServer(httpServer);
  registerSocketAuth(io);
  io.on('connection', (socket) => {
    socket.join(`user:${socket.user.id}`);
  });
  httpServer.listen(() => { port = httpServer.address().port; done(); });
});

afterAll(() => { io.close(); httpServer.close(); });

test('events sent to one room do not leak to another user', (done) => {
  const clientA = ioClient(`http://localhost:${port}`, { auth: { token: 'Admin:u1' } });
  const clientB = ioClient(`http://localhost:${port}`, { auth: { token: 'Collaborator:u2' } });
  let bReceived = false;

  clientB.on('test', () => { bReceived = true; });
  clientA.on('test', () => {
    setTimeout(() => {
      expect(bReceived).toBe(false);
      clientA.close(); clientB.close();
      done();
    }, 100);
  });
  clientA.on('connect', () => clientB.on('connect', () => io.to('user:u1').emit('test', 'hi')));
});
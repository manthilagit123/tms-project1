const { createServer } = require('http');
const { io: ioClient } = require('socket.io-client');
const initSocketServer = require('../../src/sockets/socket.server');
const registerSocketAuth = require('../../src/sockets/socket.auth');
const { signToken } = require('../../src/utils/token.util');

let io, httpServer, port;

beforeAll((done) => {
  httpServer = createServer();
  io = initSocketServer(httpServer);
  registerSocketAuth(io);
  httpServer.listen(() => { port = httpServer.address().port; done(); });
});

afterAll(() => { io.close(); httpServer.close(); });

test('rejects connection with no token', (done) => {
  const client = ioClient(`http://localhost:${port}`, { auth: {} });
  client.on('connect_error', (err) => {
    expect(err.message).toMatch(/No token/);
    client.close();
    done();
  });
});

test('rejects malformed token', (done) => {
  const client = ioClient(`http://localhost:${port}`, { auth: { token: 'garbage' } });
  client.on('connect_error', (err) => {
    expect(err.message).toMatch(/Unauthorized/);
    client.close();
    done();
  });
});

test('accepts valid JWT token', (done) => {
  const token = signToken({ id: 'u1', role: 'Admin' });
  const client = ioClient(`http://localhost:${port}`, { auth: { token } });
  client.on('connect', () => {
    expect(client.connected).toBe(true);
    client.close();
    done();
  });
});
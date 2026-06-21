const requireRole = require('../../src/middlewares/rbac.middleware');

function mockRes() {
  return { status: jest.fn().mockReturnThis(), json: jest.fn() };
}

test('blocks role not in allowed list with 403', () => {
  const req = { user: { role: 'Collaborator' } };
  const res = mockRes();
  requireRole('Admin')(req, res, jest.fn());
  expect(res.status).toHaveBeenCalledWith(403);
});

test('allows role in allowed list', () => {
  const req = { user: { role: 'Admin' } };
  const next = jest.fn();
  requireRole('Admin', 'Project Manager')(req, mockRes(), next);
  expect(next).toHaveBeenCalled();
});

test('returns 401 when req.user is missing', () => {
  const req = {};
  const res = mockRes();
  requireRole('Admin')(req, res, jest.fn());
  expect(res.status).toHaveBeenCalledWith(401);
});

const express = require('express');
const request = require('supertest');
const authenticate = require('../../src/middlewares/jwt.middleware');
const { signToken } = require('../../src/utils/token.util');

const app = express();
app.get('/protected', authenticate, (req, res) => res.json({ ok: true, user: req.user }));

test('rejects request with no token', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
});

test('rejects malformed token', async () => {
    const res = await request(app).get('/protected').set('Authorization', 'Bearer not-a-real-token');
    expect(res.status).toBe(401);
});

test('accepts valid token and attaches req.user', async () => {
    const token = signToken({ id: '1', role: 'Admin' });
    const res = await request(app).get('/protected').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.role).toBe('Admin');
});

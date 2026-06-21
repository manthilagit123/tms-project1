const express = require('express');
const request = require('supertest');
const rateLimit = require('express-rate-limit');

function makeApp(max) {
  const app = express();
  const limiter = rateLimit({
    windowMs: 1000,
    max,
    message: { code: 429, message: 'Too many requests' },
  });
  app.use(limiter);
  app.get('/test', (req, res) => res.json({ ok: true }));
  return app;
}

test('allows requests under the limit', async () => {
  const app = makeApp(5);
  const res = await request(app).get('/test');
  expect(res.status).toBe(200);
});

test('blocks requests over the limit', async () => {
  const app = makeApp(2);
  await request(app).get('/test');
  await request(app).get('/test');
  const res = await request(app).get('/test');
  expect(res.status).toBe(429);
});
const sanitize = require('../../src/middlewares/sanitize.middleware');

function mockReq(body = {}, query = {}) {
  return { body, query };
}

test('strips script tags from body', () => {
  const req = mockReq({ content: '<script>alert(1)</script>Hello' });
  sanitize(req, {}, () => {});
  expect(req.body.content).toBe('Hello');
});

test('strips img onerror payloads', () => {
  const req = mockReq({ title: '<img src=x onerror=alert(1)>Clean' });
  sanitize(req, {}, () => {});
  expect(req.body.title).toBe('Clean');
});

test('leaves normal text untouched', () => {
  const req = mockReq({ content: "It's done!" });
  sanitize(req, {}, () => {});
  expect(req.body.content).toBe("It's done!");
});

test('sanitizes query params too', () => {
  const req = mockReq({}, { search: '<script>bad</script>hello' });
  sanitize(req, {}, () => {});
  expect(req.query.search).toBe('hello');
});
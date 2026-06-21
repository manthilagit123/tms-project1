const { hashPassword, comparePassword } = require('../../src/utils/password.util');

test('hashed password matches original on compare', async () => {
  const hash = await hashPassword('Str0ngP@ss');
  expect(await comparePassword('Str0ngP@ss', hash)).toBe(true);
});

test('wrong password fails comparison', async () => {
  const hash = await hashPassword('Str0ngP@ss');
  expect(await comparePassword('wrongpass', hash)).toBe(false);
});

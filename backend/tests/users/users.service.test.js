jest.mock('../../src/config/db');
const supabase = require('../../src/config/db');
const { createUser } = require('../../src/modules/users/users.service');

test('createUser succeeds and excludes password from response', async () => {
  let insertedValues = null;
  supabase.from = () => ({
    select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }) }) }),
    insert: (vals) => {
      insertedValues = vals;
      return { select: () => ({ single: async () => ({ data: { id: 1, name: vals.name, email: vals.email, role: vals.role } }) }) };
    },
  });
  const user = await createUser({ name: 'Jane Doe', email: 'jane@test.com', role: 'Collaborator' });
  expect(user.password).toBeUndefined();
  expect(insertedValues.must_reset_password).toBe(true);
});

test('createUser throws 409 when email already exists', async () => {
  supabase.from = () => ({
    select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: 1 } }) }) }),
  });
  await expect(createUser({ name: 'Jane Doe', email: 'jane@test.com', role: 'Collaborator' }))
    .rejects.toMatchObject({ status: 409 });
});

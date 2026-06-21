const crypto = require('crypto');
const supabase = require('../../config/db');
const { hashPassword } = require('../../utils/password.util');
const ApiError = require('../../utils/ApiError');

async function createUser({ name, email, role }) {
  const { data: existing } = await supabase.from('Users').select('id').eq('email', email).maybeSingle();
  if (existing) throw new ApiError(409, 'Email already in use');

  const tempPassword = crypto.randomBytes(6).toString('hex');
  const hashed = await hashPassword(tempPassword);

  const { data: user, error } = await supabase
    .from('Users')
    .insert({ name, email, role, password: hashed, must_reset_password: true })
    .select('id, name, email, role')
    .single();
  if (error) throw new ApiError(400, error.message);

  // TODO: wire a real email service later. Stubbed for now.
  console.log(`[email stub] Send to ${email}: username=${email}, temp password=${tempPassword}`);

  return user;
}

module.exports = { createUser };

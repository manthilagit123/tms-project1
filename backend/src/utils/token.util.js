// ⚠️ TEMPORARY STUB — DO NOT MERGE TO MAIN.
// Replace with Person 1's real implementation when feature/auth-rbac merges to develop.
// Contract: verifyToken(token) -> { id, role, exp }
//
// STUB FORMAT for local testing only: pass tokens shaped "role:userId", e.g. "Admin:u1"
function verifyToken(token) {
  const [role, id] = String(token).split(':');
  if (!role || !id) throw new Error('Invalid stub token — expected format "role:userId"');
  return { id, role, exp: Math.floor(Date.now() / 1000) + 3600 };
}
module.exports = { verifyToken };
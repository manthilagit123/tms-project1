// ⚠️ TEMPORARY STUB — DO NOT MERGE TO MAIN.
// Replace with Person 4's real implementation when feature/frontend-auth-admin merges to develop.
// Contract: useAuth() -> { user: { id, name, role } | null, loading, login, logout }
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Hardcode a fake logged-in user so you can build task UI without waiting on real login.
  // Temporarily change `role` below to test PM/Admin-only views during development.
  const [user] = useState({ id: '33333333-3333-3333-3333-333333333333', name: 'Collaborator One', role: 'Collaborator' });
  return (
    <AuthContext.Provider value={{ user, loading: false, login: async () => user, logout: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
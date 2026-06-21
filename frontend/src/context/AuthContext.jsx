
import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only non-sensitive display info is persisted client-side — the actual
        // JWT lives in an httpOnly cookie and is never readable from JS.
        const stored = sessionStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
        setLoading(false);
    }, []);

    async function login(email, password) {
        const data = await loginRequest(email, password);
        setUser(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        return data;
    }

    function logout() {
        setUser(null);
        sessionStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/tasks', label: 'Tasks' },
    ];

    if (user.role === 'Admin') {
        navLinks.push({ path: '/users', label: 'Users' });
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-8 py-4 glass-panel border-b border-slate-800/80 mb-6 bg-slate-900/35 sticky top-0 z-40 backdrop-blur-lg">
            <div className="flex items-center gap-8">
                <div className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                    TMS
                </div>
                <div className="flex gap-2">
                    {navLinks.map((link) => {
                        const isActive = location.pathname.startsWith(link.path);
                        return (
                            <Link 
                                key={link.path} 
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    isActive 
                                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-200">{user.name}</p>
                    <p className="text-xs font-semibold text-indigo-400">{user.role}</p>
                </div>
                <Button onClick={logout} variant="secondary" className="px-3 py-1.5 text-xs">
                    Sign Out
                </Button>
            </div>
        </nav>
    );
}

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function Sidebar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/tasks', label: 'Tasks', icon: '📋' },
    ];

    if (user.role === 'Admin') {
        navLinks.push({ path: '/users', label: 'Users', icon: '👥' });
    }

    return (
        <aside className="w-64 min-h-screen glass-panel border-r border-slate-800/80 bg-slate-900/35 flex flex-col justify-between sticky top-0 z-40 backdrop-blur-lg">
            <div className="p-6 md:p-8">
                <div className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight mb-8">
                    TMS Project
                </div>
                <div className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                        const isActive = location.pathname.startsWith(link.path);
                        return (
                            <Link 
                                key={link.path} 
                                to={link.path}
                                className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                                    isActive 
                                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10' 
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                                }`}
                            >
                                <span className="text-lg">{link.icon}</span>
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
            
            <div className="p-6 border-t border-slate-800/60 flex flex-col gap-4">
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                    <p className="text-sm font-bold text-slate-200 truncate">{user.name}</p>
                    <p className="text-xs font-semibold text-indigo-400 truncate">{user.role}</p>
                </div>
                <Button onClick={logout} variant="secondary" className="w-full py-2.5 text-sm font-bold flex items-center justify-center gap-2">
                    <span>🚪</span> Sign Out
                </Button>
            </div>
        </aside>
    );
}

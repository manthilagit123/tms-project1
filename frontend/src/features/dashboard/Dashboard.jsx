import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import CollaboratorDashboard from './CollaboratorDashboard';

export default function Dashboard() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="animate-fade-in p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-3 mb-6">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {user.role} Dashboard
            </h1>
            
            {user.role === 'Admin' && <AdminDashboard />}
            {user.role === 'Project Manager' && <ManagerDashboard />}
            {user.role === 'Collaborator' && <CollaboratorDashboard />}
        </div>
    );
}

import { useState, useEffect } from 'react';
import { listTasksRequest } from '../../api/tasksApi';
import StatCard from './StatCard';

export default function ManagerDashboard() {
    const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, completed: 0, highPriority: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listTasksRequest({ limit: 1000 }).then(res => {
            const tasks = res.data || [];
            setStats({
                total: tasks.length,
                todo: tasks.filter(t => t.status === 'To Do').length,
                inProgress: tasks.filter(t => t.status === 'In Progress').length,
                completed: tasks.filter(t => t.status === 'Completed').length,
                highPriority: tasks.filter(t => t.priority === 'High').length
            });
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-slate-400 font-medium">Loading project metrics...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Tasks" value={stats.total} icon="📋" color="indigo" />
                <StatCard title="In Progress" value={stats.inProgress} icon="⏳" color="amber" />
                <StatCard title="Completed" value={stats.completed} icon="🎯" color="emerald" />
                <StatCard title="High Priority" value={stats.highPriority} icon="🔥" color="rose" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border bg-slate-900/35 border-slate-800/80">
                    <h2 className="text-lg font-bold text-slate-200 mb-4">Task Completion Progress</h2>
                    <div className="w-full bg-slate-800/50 rounded-full h-4 mb-2 overflow-hidden border border-slate-700/50">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-4 rounded-full" style={{ width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%` }}></div>
                    </div>
                    <p className="text-sm font-medium text-slate-400">{stats.completed} out of {stats.total} tasks completed</p>
                </div>
            </div>
        </div>
    );
}

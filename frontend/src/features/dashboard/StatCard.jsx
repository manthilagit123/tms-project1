export default function StatCard({ title, value, icon, color = 'indigo' }) {
    const colors = {
        indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    };
    
    return (
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border bg-slate-900/35 border-slate-800/80 hover:border-slate-700/80 transition-colors">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border ${colors[color] || colors.indigo}`}>
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
                <p className="text-3xl font-extrabold text-slate-100 mt-1">{value}</p>
            </div>
        </div>
    );
}

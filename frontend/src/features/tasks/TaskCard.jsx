const PRIORITY_COLORS = { Low: 'bg-slate-200 text-slate-700', Medium: 'bg-amber-100 text-amber-700', High: 'bg-red-100 text-red-700' };
const NEXT_STATUS = { 'To Do': 'In Progress', 'In Progress': 'Completed', 'Completed': null };

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const next = NEXT_STATUS[task.status];
  return (
    <div className="mb-3 rounded bg-white p-3 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-900">{task.title}</h3>
        <span className={`rounded px-2 py-0.5 text-xs ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
      </div>
      <p className="mb-2 text-xs text-slate-500">Due {task.due_date}</p>
      <div className="flex gap-2">
        {next && (
          <button onClick={() => onStatusChange(task.id, next)} className="text-xs text-indigo-600 hover:underline">
            Move to {next} →
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(task.id)} className="text-xs text-red-600 hover:underline">Delete</button>
        )}
      </div>
    </div>
  );
}

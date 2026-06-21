import { useEffect, useState } from 'react';
import { listTasksRequest, updateTaskStatusRequest, deleteTaskRequest } from '../../api/tasksApi';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import TaskForm from './TaskForm';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

const COLUMNS = ['To Do', 'In Progress', 'Completed'];

export default function TaskBoard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  async function refresh() {
    const res = await listTasksRequest(filters);
    setTasks(res.data);
  }

  useEffect(() => { refresh(); }, [filters]);

  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    const handler = (notification) => {
      if (['task_assigned', 'status_changed', 'comment_added'].includes(notification.type)) {
        refresh(); // simplest correct approach: just refetch on any task-relevant event
      }
    };
    socket.on('notification:new', handler);
    return () => socket.off('notification:new', handler);
  }, [socket]);

  async function handleStatusChange(taskId, newStatus) {
    await updateTaskStatusRequest(taskId, newStatus);
    refresh();
  }

  async function handleDelete(taskId) {
    await deleteTaskRequest(taskId);
    refresh();
  }

  const canCreate = user.role === 'Admin' || user.role === 'Project Manager';

  return (
    <div className="p-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Tasks</h1>
        {canCreate && (
          <button onClick={() => setShowForm(true)} className="rounded bg-indigo-600 px-4 py-2 text-white">
            + New Task
          </button>
        )}
      </div>
      <TaskFilters filters={filters} onChange={setFilters} />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col} className="rounded-lg bg-slate-100 p-3">
            <h2 className="mb-3 text-sm font-semibold text-slate-600">{col}</h2>
            {tasks.filter((t) => t.status === col).map((t) => (
              <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} onDelete={canCreate ? handleDelete : null} />
            ))}
          </div>
        ))}
      </div>
      {showForm && <TaskForm onClose={() => setShowForm(false)} onCreated={refresh} />}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <p className="mb-4 text-sm">Delete "{confirmDelete.title}"? This also removes its comments and attachments.</p>
            <button onClick={async () => { await deleteTaskRequest(confirmDelete.id); setConfirmDelete(null); refresh(); }} className="mr-2 rounded bg-red-600 px-4 py-2 text-white">Delete</button>
            <button onClick={() => setConfirmDelete(null)} className="rounded bg-slate-100 px-4 py-2">Cancel</button>
          </div>
        </div>
      )}
    </div>

  );
}

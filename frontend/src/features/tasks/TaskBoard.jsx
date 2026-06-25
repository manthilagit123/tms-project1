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
        refresh();
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

  const canCreate = user?.role === 'Admin' || user?.role === 'Project Manager';

  return (
    <div style={{ padding: '32px' }} className="animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <h1 className="text-2xl font-bold gradient-text">Task Board</h1>
        {canCreate && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            + New Task
          </button>
        )}
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <TaskFilters filters={filters} onChange={setFilters} />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {COLUMNS.map((col) => (
          <div key={col} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 className="text-lg font-semibold text-primary" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              {col} <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', marginLeft: '8px' }}>{tasks.filter((t) => t.status === col).length}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '200px' }}>
              {tasks.filter((t) => t.status === col).map((t) => (
                <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} onDelete={canCreate ? handleDelete : null} />
              ))}
              {tasks.filter((t) => t.status === col).length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showForm && <TaskForm onClose={() => setShowForm(false)} onCreated={refresh} />}
      
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '24px', maxWidth: '400px', width: '100%' }}>
            <h3 className="text-lg font-semibold" style={{ marginBottom: '16px' }}>Delete Task</h3>
            <p className="text-secondary" style={{ marginBottom: '24px' }}>Delete "{confirmDelete.title}"? This also removes its comments and attachments. This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary">Cancel</button>
              <button onClick={async () => { await deleteTaskRequest(confirmDelete.id); setConfirmDelete(null); refresh(); }} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

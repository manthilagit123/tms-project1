import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTaskRequest } from '../../api/tasksApi';
import { listUsersRequest } from '../../api/usersApi'; // shared with Person 4 — already exists
import { useEffect, useState } from 'react';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  due_date: z.string().min(1, 'Due date is required'),
  priority: z.enum(['Low', 'Medium', 'High']),
  assignees: z.array(z.string()).min(1, 'Select at least one assignee'),
});

export default function TaskForm({ onClose, onCreated }) {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { priority: 'Medium', assignees: [] },
  });

  useEffect(() => { listUsersRequest({}).then((res) => setUsers(res.data)); }, []);

  function toggleAssignee(id) {
    const current = watch('assignees');
    setValue('assignees', current.includes(id) ? current.filter((a) => a !== id) : [...current, id]);
  }

  async function onSubmit(values) {
    await createTaskRequest(values);
    onCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">New Task</h2>
        <input {...register('title')} placeholder="Title" className="mb-1 w-full rounded border border-slate-300 px-3 py-2" />
        {errors.title && <p className="mb-2 text-sm text-red-600">{errors.title.message}</p>}

        <input type="date" {...register('due_date')} className="mb-1 w-full rounded border border-slate-300 px-3 py-2" />
        {errors.due_date && <p className="mb-2 text-sm text-red-600">{errors.due_date.message}</p>}

        <select {...register('priority')} className="mb-3 w-full rounded border border-slate-300 px-3 py-2">
          <option>Low</option><option>Medium</option><option>High</option>
        </select>

        <p className="mb-1 text-sm font-medium text-slate-700">Assignees</p>
        <div className="mb-3 max-h-32 space-y-1 overflow-y-auto">
          {users.map((u) => (
            <label key={u.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={watch('assignees').includes(u.id)} onChange={() => toggleAssignee(u.id)} />
              {u.name}
            </label>
          ))}
        </div>
        {errors.assignees && <p className="mb-2 text-sm text-red-600">{errors.assignees.message}</p>}

        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50">Create</button>
          <button type="button" onClick={onClose} className="rounded bg-slate-100 px-4 py-2 text-slate-700">Cancel</button>
        </div>
      </form>
    </div>
  );
}

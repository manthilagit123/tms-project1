
import { useEffect, useState } from 'react';
import { listUsersRequest } from '../../api/usersApi';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            listUsersRequest({ search, role, page, limit: 10 }).then((res) => {
                setUsers(res.data);
                setTotal(res.total);
            });
        }, 300); // debounce search input
        return () => clearTimeout(timeout);
    }, [search, role, page]);

    return (
        <div className="p-8">
            <h1 className="mb-4 text-xl font-semibold text-slate-900">Users</h1>
            <div className="mb-4 flex gap-3">
                <input
                    placeholder="Search name or email"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="rounded border border-slate-300 px-3 py-2"
                />
                <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="rounded border border-slate-300 px-3 py-2">
                    <option value="">All roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Collaborator">Collaborator</option>
                </select>
            </div>
            <table className="w-full text-left text-sm">
                <thead><tr className="border-b text-slate-500"><th className="py-2">Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-b">
                            <td className="py-2">{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                            <td>{u.is_active ? 'Active' : 'Deactivated'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex gap-2 text-sm">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="disabled:opacity-40">Previous</button>
                <span>Page {page} of {Math.ceil(total / 10) || 1}</span>
                <button disabled={page * 10 >= total} onClick={() => setPage((p) => p + 1)} className="disabled:opacity-40">Next</button>
            </div>
        </div>
    );
}
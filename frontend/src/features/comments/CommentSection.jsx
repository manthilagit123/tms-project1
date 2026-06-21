import { useEffect, useState } from 'react';
import { listCommentsRequest, addCommentRequest } from '../../api/tasksApi';
import { useAuth } from '../../context/AuthContext';

export default function CommentSection({ taskId }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => { listCommentsRequest(taskId).then(setComments); }, [taskId]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) return;
        const optimistic = { id: `temp-${Date.now()}`, content, user_id: user.id, createdAt: new Date().toISOString() };
        setComments((c) => [...c, optimistic]); // optimistic update — feels instant
        setContent('');
        try {
            const real = await addCommentRequest(taskId, content);
            setComments((c) => c.map((cm) => (cm.id === optimistic.id ? real : cm)));
        } catch {
            setComments((c) => c.filter((cm) => cm.id !== optimistic.id)); // roll back on failure
        }
    }

    return (
        <div>
            <ul className="mb-3 space-y-2">
                {comments.map((c) => (
                    <li key={c.id} className="rounded bg-slate-50 p-2 text-sm">{c.content}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Add a comment" className="flex-1 rounded border border-slate-300 px-3 py-2 text-sm" />
                <button type="submit" className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">Post</button>
            </form>
        </div>
    );
}
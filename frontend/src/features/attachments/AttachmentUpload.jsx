import { useState } from 'react';
import { uploadAttachmentRequest } from '../../api/tasksApi';

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'text/plain'];

export default function AttachmentUpload({ taskId, onUploaded }) {
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState('');

    async function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        setError('');
        if (file.size > MAX_SIZE) return setError('File exceeds 10MB limit');
        if (!ALLOWED_TYPES.includes(file.type)) return setError('File type not allowed');

        setProgress(0);
        try {
            const attachment = await uploadAttachmentRequest(taskId, file, setProgress);
            onUploaded(attachment);
        } catch (err) {
            setError(err.message || 'Upload failed');
        } finally {
            setProgress(null);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFile} className="text-sm" />
            {progress !== null && <div className="mt-1 h-1 w-full rounded bg-slate-200"><div className="h-1 rounded bg-indigo-600" style={{ width: `${progress}%` }} /></div>}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
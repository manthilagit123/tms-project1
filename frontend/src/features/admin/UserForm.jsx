
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUserRequest, updateUserRequest } from '../../api/usersApi';

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    role: z.enum(['Admin', 'Project Manager', 'Collaborator']),
});

export default function UserForm({ existingUser, onSuccess }) {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: existingUser || { name: '', email: '', role: 'Collaborator' },
    });

    async function onSubmit(values) {
        try {
            const result = existingUser
                ? await updateUserRequest(existingUser.id, values)
                : await createUserRequest(values);
            onSuccess(result);
        } catch (err) {
            // map backend field-level errors onto the matching input
            if (err.code === 409) {
                setError('email', { message: err.message });
            } else {
                setError('root', { message: err.message || 'Something went wrong' });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {errors.root && <p className="text-danger" style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>{errors.root.message}</p>}

            <div>
                <input {...register('name')} placeholder="Full name" className="input-modern" style={{ width: '100%' }} />
                {errors.name && <p className="text-danger" style={{ fontSize: '0.875rem', marginTop: '4px' }}>{errors.name.message}</p>}
            </div>
            <div>
                <input {...register('email')} placeholder="Email" className="input-modern" style={{ width: '100%' }} />
                {errors.email && <p className="text-danger" style={{ fontSize: '0.875rem', marginTop: '4px' }}>{errors.email.message}</p>}
            </div>
            <div>
                <select {...register('role')} className="input-modern" style={{ width: '100%' }}>
                    <option value="Admin">Admin</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Collaborator">Collaborator</option>
                </select>
            </div>
            <div style={{ marginTop: '8px' }}>
                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: 'auto' }}>
                    {existingUser ? 'Save changes' : 'Create user'}
                </button>
            </div>
        </form>
    );
}
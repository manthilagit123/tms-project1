import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

const schema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    async function onSubmit(values) {
        setServerError('');
        try {
            const user = await login(values.email, values.password);
            if (user.mustResetPassword) {
                navigate('/reset-password');
            } else if (user.role === 'Admin') {
                navigate('/users');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setServerError(err.message || 'Login failed');
        }
    }

    return (
        <div className="flex-center gradient-bg" style={{ minHeight: '100vh', padding: '20px' }}>
            <form onSubmit={handleSubmit(onSubmit)} className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '24rem', padding: '40px 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 className="text-2xl font-bold gradient-text" style={{ marginBottom: '8px' }}>Welcome Back</h1>
                    <p className="text-sm text-secondary">Sign in to your TMS account</p>
                </div>
                
                {serverError && (
                    <div className="glass-card text-danger text-sm" style={{ padding: '12px', marginBottom: '24px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        {serverError}
                    </div>
                )}
                
                <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                    error={errors.password?.message}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '16px' }}
                >
                    {isSubmitting ? 'Signing in…' : 'Sign In'}
                </Button>
            </form>
        </div>
    );
}
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
                    icon={
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    }
                    {...register('email')}
                    error={errors.email?.message}
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    icon={
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    }
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
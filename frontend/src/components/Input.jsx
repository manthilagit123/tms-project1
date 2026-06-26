import { useState } from 'react';

export default function Input({ label, error, icon, className = '', ...props }) {
    const isPasswordType = props.type === 'password';
    const [showPassword, setShowPassword] = useState(false);
    
    // Determine the actual type for the input
    const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : props.type;

    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label htmlFor={props.id} className="text-sm font-medium text-secondary" style={{ display: 'block', marginBottom: '8px' }}>{label}</label>}
            <div style={{ position: 'relative' }}>
                {icon && (
                    <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                        {icon}
                    </div>
                )}
                <input 
                    {...props} 
                    type={inputType}
                    className={`input-modern ${className}`} 
                    style={{ 
                        paddingLeft: icon ? '40px' : undefined, 
                        paddingRight: isPasswordType ? '40px' : undefined,
                        ...props.style 
                    }} 
                />
                {isPasswordType && (
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0' }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        ) : (
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-sm text-danger" style={{ marginTop: '4px' }}>{error}</p>}
        </div>
    );
}
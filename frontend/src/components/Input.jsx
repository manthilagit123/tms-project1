export default function Input({ label, error, icon, className = '', ...props }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label htmlFor={props.id} className="text-sm font-medium text-secondary" style={{ display: 'block', marginBottom: '8px' }}>{label}</label>}
            <div style={{ position: 'relative' }}>
                {icon && (
                    <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                        {icon}
                    </div>
                )}
                <input {...props} className={`input-modern ${className}`} style={{ paddingLeft: icon ? '40px' : undefined, ...props.style }} />
            </div>
            {error && <p className="text-sm text-danger" style={{ marginTop: '4px' }}>{error}</p>}
        </div>
    );
}
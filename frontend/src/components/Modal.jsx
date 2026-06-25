export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}>
            <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '28rem', padding: '24px', position: 'relative' }}>
                <h2 className="text-xl font-semibold gradient-text" style={{ marginBottom: '16px' }}>{title}</h2>
                {children}
                <button onClick={onClose} className="text-secondary" style={{ marginTop: '16px', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'color var(--transition-fast)' }} onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                    Close
                </button>
            </div>
        </div>
    );
}

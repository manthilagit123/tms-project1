export default function Button({ variant = 'primary', className = '', children, ...props }) {
    const styles = {
        primary: 'btn-primary',
        danger: 'btn-danger',
        secondary: 'btn-secondary',
    };
    return (
        <button {...props} className={`${styles[variant] || styles.primary} ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {children}
        </button>
    );
}
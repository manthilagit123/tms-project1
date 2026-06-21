
export default function Alert({ variant = 'error', children }) {
    const styles = {
        error: 'bg-red-50 text-red-600',
        success: 'bg-green-50 text-green-700',
        info: 'bg-blue-50 text-blue-700',
    };
    return (
        <p className={`rounded p-2 text-sm ${styles[variant]}`}>{children}</p>
    );
}
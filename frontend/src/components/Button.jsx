
export default function Button({ variant = 'primary', children, ...props }) {
    const styles = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    };
    return (
        <button {...props} className={`rounded px-4 py-2 font-medium disabled:opacity-50 ${styles[variant]}`}>
            {children}
        </button>
    );
}
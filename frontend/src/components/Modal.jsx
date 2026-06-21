export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
                {children}
                <button onClick={onClose} className="mt-4 text-sm text-slate-500 hover:text-slate-700">Close</button>
            </div>
        </div>
    );
}

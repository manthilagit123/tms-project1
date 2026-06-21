
export default function Input({ label, error, ...props }) {
    return (
        <div className="mb-3">
            {label && <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>}
            <input {...props} className="w-full rounded border border-slate-300 px-3 py-2" />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
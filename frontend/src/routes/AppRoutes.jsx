
import { Routes, Route } from 'react-router-dom';
import { authRoutes } from '../features/auth/auth.routes';
import { adminRoutes } from '../features/admin/admin.routes';
// Person 5 adds their own import + line below, e.g.:
// import { taskRoutes } from '../features/tasks/task.routes';

export default function AppRoutes() {
    return (
        <Routes>
            {authRoutes}
            {adminRoutes}
            {/* {taskRoutes}  <- Person 5 adds this line */}
            <Route path="/403" element={<div className="p-8 text-center text-slate-600">You don't have access to this page.</div>} />
        </Routes>
    );
}
import { Routes, Route, Navigate } from 'react-router-dom';
import { taskRoutes } from '../features/tasks/task.routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<div className="p-8">Login Page Stub</div>} />
      {taskRoutes}
    </Routes>
  );
}

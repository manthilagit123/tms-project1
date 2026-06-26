import { Route } from 'react-router-dom';
import TaskBoard from './TaskBoard';
import ProtectedRoute from '../../routes/ProtectedRoute';
import Dashboard from '../dashboard/Dashboard';

export const taskRoutes = (
  <>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/tasks" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
  </>
);

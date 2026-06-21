import { Route } from 'react-router-dom';
import TaskBoard from './TaskBoard';
import ProtectedRoute from '../../routes/ProtectedRoute';

export const taskRoutes = (
  <Route path="/dashboard" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
);

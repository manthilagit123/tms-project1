import { Route } from 'react-router-dom';
import UserList from './UserList';
import ProtectedRoute from '../../routes/ProtectedRoute';

export const adminRoutes = (
    <>
        <Route path="/users" element={<ProtectedRoute roles={['Admin']}><UserList /></ProtectedRoute>} />
    </>
);
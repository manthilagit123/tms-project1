
import { Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ResetPasswordPage from './ResetPasswordPage';
import ProtectedRoute from '../../routes/ProtectedRoute';

export const authRoutes = (
    <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ProtectedRoute><ResetPasswordPage /></ProtectedRoute>} />
    </>
);
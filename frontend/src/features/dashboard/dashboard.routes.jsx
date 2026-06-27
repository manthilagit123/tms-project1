import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProtectedRoute from '../../routes/ProtectedRoute';
import AppShell from '../../components/AppShell';

export const dashboardRoutes = (
    <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
                <AppShell>
                    <Dashboard />
                </AppShell>
            </ProtectedRoute>
        }
    />
);

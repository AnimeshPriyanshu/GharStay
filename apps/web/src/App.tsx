import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth-context';
import { Layout } from './components/layout';
import {
  HomePage,
  SearchPage,
  PropertyPage,
  EmergencyPage,
  HostPage,
  GuestDashboard,
  HostDashboard,
  PartnerDashboard,
  LoginPage,
  RegisterPage,
} from './pages';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const GuestOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      </Layout>
    );
  }

  if (user) {
    return <Navigate to="/guest/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<SearchPage />} />
      <Route path="/property/:id" element={<PropertyPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/host" element={<HostPage />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <LoginPage />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnlyRoute>
            <RegisterPage />
          </GuestOnlyRoute>
        }
      />

      {/* Protected Routes - Guest */}
      <Route
        path="/guest/dashboard"
        element={
          <ProtectedRoute allowedRoles={['GUEST', 'ADMIN']}>
            <GuestDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Host */}
      <Route
        path="/host/dashboard"
        element={
          <ProtectedRoute allowedRoles={['HOST', 'ADMIN']}>
            <HostDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Local Partner */}
      <Route
        path="/partner/dashboard"
        element={
          <ProtectedRoute allowedRoles={['LOCAL_PARTNER', 'ADMIN']}>
            <PartnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <HostDashboard />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <GuestDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
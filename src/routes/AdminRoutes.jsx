import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_TYPES, ROUTES } from '../utils/constants';
import DashboardLayout from '../components/shared/DashboardLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
// import UserManagement from '../components/admin/UserManagement';
// import SystemSettings from '../components/admin/SystemSettings';
// import Reports from '../components/admin/Reports';

// Admin Protected Route Component
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, getUserRole } = useAuth();
  const userRole = getUserRole();

  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (userRole !== USER_TYPES.ADMIN) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      [USER_TYPES.BLOOD_BANK]: ROUTES.BLOOD_BANK,
      [USER_TYPES.STAFF]: ROUTES.STAFF,
      [USER_TYPES.DONOR]: ROUTES.DONOR,
      [USER_TYPES.CONSUMERS]: ROUTES.CONSUMERS,
      [USER_TYPES.HOSPITAL]: ROUTES.HOSPITAL,
      [USER_TYPES.CUSTOMER]: ROUTES.CUSTOMER,
    };
    
    return <Navigate to={dashboardRoutes[userRole] || ROUTES.LOGIN} replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } 
      />
      {/* <Route 
        path="/users" 
        element={
          <AdminProtectedRoute>
            <UserManagement />
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <AdminProtectedRoute>
            <SystemSettings />
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <AdminProtectedRoute>
            <Reports />
          </AdminProtectedRoute>
        } 
      /> */}
      {/* Redirect any unmatched routes to the admin dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.ADMIN} replace />} />
    </Routes>
  );
};

export default AdminRoutes;
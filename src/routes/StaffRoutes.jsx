import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_TYPES, ROUTES } from '../utils/constants';
import DashboardLayout from '../components/shared/DashboardLayout';
import StaffDashboard from '../components/staff/StaffDashboard';
// import DonorManagement from '../components/staff/DonorManagement';
// import InventoryControl from '../components/staff/InventoryControl';
// import StaffSchedule from '../components/staff/StaffSchedule';

// Staff Protected Route Component
const StaffProtectedRoute = ({ children }) => {
  const { isAuthenticated, getUserRole } = useAuth();
  const userRole = getUserRole();

  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (userRole !== USER_TYPES.STAFF) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      [USER_TYPES.ADMIN]: ROUTES.ADMIN,
      [USER_TYPES.BLOOD_BANK]: ROUTES.BLOOD_BANK,
      [USER_TYPES.DONOR]: ROUTES.DONOR,
      [USER_TYPES.CONSUMERS]: ROUTES.CONSUMERS,
      [USER_TYPES.HOSPITAL]: ROUTES.HOSPITAL,
      [USER_TYPES.CUSTOMER]: ROUTES.CUSTOMER,
    };
    
    return <Navigate to={dashboardRoutes[userRole] || ROUTES.LOGIN} replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const StaffRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <StaffProtectedRoute>
            <StaffDashboard />
          </StaffProtectedRoute>
        } 
      />
      {/* <Route 
        path="/donors" 
        element={
          <StaffProtectedRoute>
            <DonorManagement />
          </StaffProtectedRoute>
        } 
      />
      <Route 
        path="/inventory" 
        element={
          <StaffProtectedRoute>
            <InventoryControl />
          </StaffProtectedRoute>
        } 
      />
      <Route 
        path="/schedule" 
        element={
          <StaffProtectedRoute>
            <StaffSchedule />
          </StaffProtectedRoute>
        } 
      /> */}
      {/* Redirect any unmatched routes to the staff dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.STAFF} replace />} />
    </Routes>
  );
};

export default StaffRoutes;
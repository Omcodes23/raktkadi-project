import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_TYPES, ROUTES } from '../utils/constants';
import DashboardLayout from '../components/shared/DashboardLayout';
import ConsumerDashboard from '../components/consumer/ConsumerDashboard';
// import BloodRequests from '../components/consumer/BloodRequests';
// import ConsumerProfile from '../components/consumer/ConsumerProfile';
// import RequestHistory from '../components/consumer/RequestHistory';

// Consumer Protected Route Component
const ConsumerProtectedRoute = ({ children }) => {
  const { isAuthenticated, getUserRole } = useAuth();
  const userRole = getUserRole();

  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (userRole !== USER_TYPES.CONSUMER) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      [USER_TYPES.ADMIN]: ROUTES.ADMIN,
      [USER_TYPES.BLOOD_BANK]: ROUTES.BLOOD_BANK,
      [USER_TYPES.STAFF]: ROUTES.STAFF,
      [USER_TYPES.DONOR]: ROUTES.DONOR,
      [USER_TYPES.HOSPITAL]: ROUTES.HOSPITAL,
      [USER_TYPES.CUSTOMER]: ROUTES.CUSTOMER,
    };
    
    return <Navigate to={dashboardRoutes[userRole] || ROUTES.LOGIN} replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const ConsumerRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ConsumerProtectedRoute>
            <ConsumerDashboard />
          </ConsumerProtectedRoute>
        } 
      />
      {/* <Route 
        path="/requests" 
        element={
          <ConsumerProtectedRoute>
            <BloodRequests />
          </ConsumerProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ConsumerProtectedRoute>
            <ConsumerProfile />
          </ConsumerProtectedRoute>
        } 
      />
      <Route 
        path="/history" 
        element={
          <ConsumerProtectedRoute>
            <RequestHistory />
          </ConsumerProtectedRoute>
        } 
      /> */}
      {/* Redirect any unmatched routes to the consumer dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.CONSUMER} replace />} />
    </Routes>
  );
};

export default ConsumerRoutes;
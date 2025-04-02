import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_TYPES, ROUTES } from '../utils/constants';
import DashboardLayout from '../components/shared/DashboardLayout';
import DonorDashboard from '../components/donor/DonorDashboard';
// import DonationHistory from '../components/donor/DonationHistory';
// import UpcomingDrives from '../components/donor/UpcomingDrives';
// import DonorProfile from '../components/donor/DonorProfile';
// import HealthRecords from '../components/donor/HealthRecords';

// Donor Protected Route Component
const DonorProtectedRoute = ({ children }) => {
  const { isAuthenticated, getUserRole } = useAuth();
  const userRole = getUserRole();

  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (userRole !== USER_TYPES.DONOR) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      [USER_TYPES.ADMIN]: ROUTES.ADMIN,
      [USER_TYPES.BLOOD_BANK]: ROUTES.BLOOD_BANK,
      [USER_TYPES.STAFF]: ROUTES.STAFF,
      [USER_TYPES.CONSUMERS]: ROUTES.CONSUMERS,
      [USER_TYPES.HOSPITAL]: ROUTES.HOSPITAL,
      [USER_TYPES.CUSTOMER]: ROUTES.CUSTOMER,
    };
    
    return <Navigate to={dashboardRoutes[userRole] || ROUTES.LOGIN} replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const DonorRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <DonorProtectedRoute>
            <DonorDashboard />
          </DonorProtectedRoute>
        } 
      />
      {/* <Route 
        path="/history" 
        element={
          <DonorProtectedRoute>
            <DonationHistory />
          </DonorProtectedRoute>
        } 
      />
      <Route 
        path="/drives" 
        element={
          <DonorProtectedRoute>
            <UpcomingDrives />
          </DonorProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <DonorProtectedRoute>
            <DonorProfile />
          </DonorProtectedRoute>
        } 
      />
      <Route 
        path="/health-records" 
        element={
          <DonorProtectedRoute>
            <HealthRecords />
          </DonorProtectedRoute>
        } 
      /> */}
      {/* Redirect any unmatched routes to the donor dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.DONOR} replace />} />
    </Routes>
  );
};

export default DonorRoutes;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_TYPES, ROUTES } from '../utils/constants';
import DashboardLayout from '../components/shared/DashboardLayout';
import CustomerDashboard from '../components/customer/CustomerDashboard';
import CustomerProfile from '../components/customer/CustomerProfile';
import CustomerDonationHistory from '../components/customer/CustomerDonationHistory';
import CustomerRequestHistory from '../components/customer/CustomerRequestHistory';
import CustomerBloodRequest from '../components/customer/CustomerBloodRequest';
// Customer Protected Route Component
const CustomerProtectedRoute = ({ children }) => {
  const { isAuthenticated, getUserRole } = useAuth();
  const userRole = getUserRole();
  
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  if (userRole !== USER_TYPES.CUSTOMER) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      [USER_TYPES.ADMIN]: ROUTES.ADMIN,
      [USER_TYPES.BLOOD_BANK]: ROUTES.BLOOD_BANK,
      [USER_TYPES.STAFF]: ROUTES.STAFF,
      [USER_TYPES.DONOR]: ROUTES.DONOR,
      [USER_TYPES.CONSUMER]: ROUTES.CONSUMER,
      [USER_TYPES.HOSPITAL]: ROUTES.HOSPITAL,
    };
    
    return <Navigate to={dashboardRoutes[userRole] || ROUTES.LOGIN} replace />;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
};

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <CustomerProtectedRoute>
            <CustomerDashboard />
          </CustomerProtectedRoute>
        } 
      />
      
      <Route 
        path="/donations" 
        element={
          <CustomerProtectedRoute>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-6">My Donations</h1>
              <CustomerDonationHistory />
            </div>
          </CustomerProtectedRoute>
        } 
      />
      
      <Route 
        path="/requests" 
        element={
          <CustomerProtectedRoute>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-6">My Requests</h1>
              <CustomerRequestHistory />
            </div>
          </CustomerProtectedRoute>
        } 
      />
      <Route 
        path="/request-blood" 
        element={
          <CustomerProtectedRoute>
            <CustomerBloodRequest />
          </CustomerProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <CustomerProtectedRoute>
            <CustomerProfile />
          </CustomerProtectedRoute>
        } 
      />
      
      {/* Redirect any unmatched routes to the customer dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.CUSTOMER} replace />} />
    </Routes>
  );
};

export default CustomerRoutes;
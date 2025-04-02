import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import Login from "./components/Login";
// import Signup from "./pages/Signup";
import { USER_TYPES, ROUTES } from "./utils/constants";

// Import public routes
import PublicRoutes from "./routes/PublicRoutes";

// Import all the role-based route modules
import AdminRoutes from "./routes/AdminRoutes";
import BloodBankRoutes from "./routes/BloodBankRoutes";
import StaffRoutes from "./routes/StaffRoutes";
import DonorRoutes from "./routes/DonorRoutes";
import ConsumerRoutes from "./routes/ConsumerRoutes";
import HospitalRoutes from "./routes/HospitalRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

// Role-based Dashboard Redirects
const dashboardRoutes = {
  [USER_TYPES.ADMIN]: ROUTES.ADMIN,
  [USER_TYPES.BLOOD_BANK]: ROUTES.BLOOD_BANK,
  [USER_TYPES.STAFF]: ROUTES.STAFF,
  [USER_TYPES.DONOR]: ROUTES.DONOR,
  [USER_TYPES.CONSUMER]: ROUTES.CONSUMER,
  [USER_TYPES.HOSPITAL]: ROUTES.HOSPITAL,
  [USER_TYPES.CUSTOMER]: ROUTES.CUSTOMER,
};

// Redirect Logged-in Users to Their Dashboard
const DashboardRouter = () => {
  const { isAuthenticated, getUserRole } = useAuth();
  
  if (isAuthenticated()) {
    const userRole = getUserRole();
    return <Navigate to={dashboardRoutes[userRole] || ROUTES.LOGIN} replace />;
  }
  
  return <Navigate to={ROUTES.LOGIN} replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes - These take priority and are accessible to all users */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Authentication Routes */}
        {/* <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} /> */}

        {/* Role-based Route Modules - Each with their own nested routes */}
        <Route path={`${ROUTES.ADMIN}/*`} element={<AdminRoutes />} />
        <Route path={`${ROUTES.BLOOD_BANK}/*`} element={<BloodBankRoutes />} />
        <Route path={`${ROUTES.STAFF}/*`} element={<StaffRoutes />} />
        <Route path={`${ROUTES.DONOR}/*`} element={<DonorRoutes />} />
        <Route path={`${ROUTES.CONSUMER}/*`} element={<ConsumerRoutes />} />
        <Route path={`${ROUTES.HOSPITAL}/*`} element={<HospitalRoutes />} />
        <Route path={`${ROUTES.CUSTOMER}/*`} element={<CustomerRoutes />} />

        {/* Legacy dashboard route - redirects to role-specific dashboard */}
        <Route path="/dashboard" element={<DashboardRouter />} />

        {/* Catch-all: Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
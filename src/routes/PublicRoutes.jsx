import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Login from "../components/Login";
import Signup from "../pages/Signup";
import ContactUs from '../pages/ContactUs';
import { ROUTES } from "../utils/constants";
// import DonationProcess from '../pages/DonationProcess';
// import ContactUs from '../pages/ContactUs';
// import BloodTypes from '../pages/BloodTypes';
// import UpcomingDrives from '../pages/UpcomingDrives';
// import FAQ from '../pages/FAQ';

// Public layout component (no authentication required)
import PublicLayout from '../components/public/PublicLayout';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {/* Main home page */}
        <Route path="/" element={<Home />} />
        
        {/* About section */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        
        {/* Donation information */}
        {/* <Route path="/donation-process" element={<DonationProcess />} />
        <Route path="/blood-types" element={<BloodTypes />} />
        <Route path="/upcoming-drives" element={<UpcomingDrives />} />
         */}
        {/* Support pages */}
        {/* <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} /> */}
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
// src/pages/Home.jsx
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";

// Import components
// import Navbar from "../components/public/home/Navbar";
import HeroSections from "../components/public/home/HeroSection";
import StatsSections from "../components/public/home/StatsSection";
import FeaturesSections from "../components/public/home/FeaturesSection";
import HowItWorksSections from "../components/public/home/HowItWorksSection";
import TestimonialsSections from "../components/public/home/TestimonialsSection";
import CTASections from "../components/public/home/CTASection";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getUserRole } = useAuth();
  const userRole = getUserRole();

  // Redirect to the respective dashboard if already logged in
  if (isAuthenticated()) {
    return <Navigate to={ROUTES[userRole]} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <HeroSections />
      <StatsSections />
      <FeaturesSections />
      <HowItWorksSections />
      <TestimonialsSections />
      <CTASections />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
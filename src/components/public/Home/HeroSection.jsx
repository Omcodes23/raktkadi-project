// src/components/home/HeroSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../../../utils/constants";

const HeroSections = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to RaktKadi</h1>
          <p className="text-xl md:text-2xl mb-8">A platform to manage blood donations and requests efficiently.</p>
          <div className="flex justify-center gap-4">
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.LOGIN)}
              className="border border-white px-8 py-4 bg-red-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-950 transition duration-300"
            >
              Login
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="px-8 py-4 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            >
              Sign Up
            </motion.button>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSections;

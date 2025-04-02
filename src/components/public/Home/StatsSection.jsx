// src/components/home/StatsSection.jsx
import React from "react";
import { motion } from "framer-motion";

const StatsSections = () => {
  const stats = [
    { number: "10,000+", text: "Donors Registered" },
    { number: "15,000+", text: "Blood Units Collected" },
    { number: "500+", text: "Partner Hospitals" },
    { number: "5,000+", text: "Lives Saved" }
  ];
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-4xl font-bold text-red-700 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSections;
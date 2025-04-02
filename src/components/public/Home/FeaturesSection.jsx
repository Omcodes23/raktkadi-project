// src/components/home/FeaturesSection.jsx
import React from "react";
import { motion } from "framer-motion";

const FeaturesSections = () => {
  const features = [
    {
      title: "Donor Management",
      description: "Register donors, track donation history, and manage donor profiles",
      icon: "🩸"
    },
    {
      title: "Inventory Tracking",
      description: "Real-time monitoring of blood units by type, collection date, and expiration",
      icon: "📊"
    },
    {
      title: "Request Management",
      description: "Streamlined process for hospitals to request blood units with priority handling",
      icon: "🏥"
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive reports on donation trends, inventory levels, and distribution",
      icon: "📈"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Blood Bank Management System</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solution for efficient blood donation and distribution
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-red-700">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSections;
// src/components/shared/Stats.jsx
import React from 'react';
import { motion } from 'framer-motion';

function Stats({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="text-sm text-gray-600">{item.label}</div>
          <div className="text-2xl font-bold text-gray-800 mt-2">
            {item.value}
          </div>
          {item.change && (
            <div
              className={`text-sm mt-2 ${
                item.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default Stats;
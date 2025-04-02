import React from 'react';

export const StatCard = ({ icon: Icon, title, value, valueColor }) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 transform hover:-translate-y-2 group">
      <div className="flex items-center justify-between">
        <Icon className={`${valueColor} w-8 h-8 group-hover:scale-110 transition-transform`} />
        <div className="text-right">
          <dt className="text-sm font-small text-gray-500">{title}</dt>
          <dd className={`mt-1 text-3xl font-bold ${valueColor}`}>{value}</dd>
        </div>
      </div>
    </div>
  );

export const HealthTip = ({ title, tips, icon: Icon }) => (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
        <Icon className="mr-3 text-green-500" size={24} />
        {title}
      </h4>
      <ul className="space-y-3 text-gray-600 text-sm">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-3 text-green-500 mt-1">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );

export const ProfileInfoCard = ({ icon: Icon, title, value, className = '' }) => (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 flex items-start w-full">
      <Icon className={`mr-4 w-6 h-6 flex-shrink-0 ${className}`} />
      <div className="overflow-hidden">
        <dt className="text-sm text-gray-500">{title}</dt>
        <dd className="text-lg font-semibold text-gray-800 break-words">{value || 'Not provided'}</dd>
      </div>
    </div>
  );

export default { StatCard, HealthTip, ProfileInfoCard };
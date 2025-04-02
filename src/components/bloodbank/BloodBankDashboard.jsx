// src/components/bloodbank/BloodBankDashboard.jsx
import React from 'react';

const BloodBankDashboard = () => {
  const bloodStock = [
    { type: 'A+', units: 45 },
    { type: 'A-', units: 12 },
    { type: 'B+', units: 38 },
    { type: 'B-', units: 15 },
    { type: 'AB+', units: 20 },
    { type: 'AB-', units: 8 },
    { type: 'O+', units: 55 },
    { type: 'O-', units: 25 }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blood Bank Dashboard</h1>
        <p className="text-gray-500">Manage your blood bank inventory and requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500">Total Blood Units</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">218</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500">Pending Requests</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">12</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500">Today's Donations</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">8</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500">Critical Stock</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">2</dd>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mt-8">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Blood Stock Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodStock.map((blood) => (
              <div key={blood.type} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{blood.type}</div>
                <div className="text-sm text-gray-500">Available Units</div>
                <div className="text-lg font-medium">{blood.units}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBankDashboard;
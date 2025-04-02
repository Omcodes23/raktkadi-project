// src/components/staff/StaffDashboard.jsx
import React from 'react';

const StaffDashboard = () => {
  const todaysDonations = [
    { donor: 'John Doe', bloodType: 'A+', time: '09:30 AM', status: 'Completed' },
    { donor: 'Jane Smith', bloodType: 'O-', time: '10:15 AM', status: 'In Progress' },
    { donor: 'Mike Johnson', bloodType: 'B+', time: '11:00 AM', status: 'Scheduled' }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-500">Manage donations and blood requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500">Today's Appointments</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">8</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500">Pending Tests</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">5</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500">Completed Today</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600">3</dd>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mt-8">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Donations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todaysDonations.map((donation, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.donor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.bloodType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        donation.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
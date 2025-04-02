// src/components/donor/DonorDashboard.jsx
import React from 'react';

const DonorDashboard = () => {
  const donationHistory = [
    { id: 'don-1', date: '2024-02-15', bloodBank: 'Central Blood Bank', type: 'Whole Blood', status: 'Completed' },
    { id: 'don-2', date: '2023-10-10', bloodBank: 'City Hospital', type: 'Plasma', status: 'Completed' },
    { id: 'don-3', date: '2023-06-05', bloodBank: 'Regional Center', type: 'Whole Blood', status: 'Completed' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Donor Dashboard</h1>
        <p className="text-gray-500 text-sm sm:text-base">Track your donations and schedule appointments</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <dt className="text-xs sm:text-sm font-medium text-gray-500">Total Donations</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-red-600">3</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <dt className="text-xs sm:text-sm font-medium text-gray-500">Next Eligible Date</dt>
          <dd className="mt-1 text-lg sm:text-xl font-semibold text-green-600">2024-04-15</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <dt className="text-xs sm:text-sm font-medium text-gray-500">Blood Type</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-red-600">O+</dd>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mt-8">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">Donation History</h3>
            <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              Schedule Donation
            </button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Bank
                    </th>
                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donationHistory.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {donation.date}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {donation.bloodBank}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {donation.type}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
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
    </div>
  );
};

export default DonorDashboard;
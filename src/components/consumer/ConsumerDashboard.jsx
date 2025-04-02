import React from 'react';
import { ChevronRight, FileText, Check, Clock } from 'lucide-react';

const ConsumerDashboard = () => {
  const requests = [
    { id: 'REQ001', date: '2024-02-20', bloodType: 'A+', units: 2, status: 'Pending' },
    { id: 'REQ002', date: '2024-02-15', bloodType: 'O-', units: 1, status: 'Approved' },
    { id: 'REQ003', date: '2024-02-10', bloodType: 'B+', units: 3, status: 'Completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Consumer Dashboard</h1>
          <p className="text-gray-500">Request and track blood units</p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
          New Request
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
          <div className="flex justify-center mb-2">
            <FileText className="text-gray-500" size={24} />
          </div>
          <dt className="text-xs sm:text-sm font-medium text-gray-500">Total Requests</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-red-600">3</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
          <div className="flex justify-center mb-2">
            <Clock className="text-gray-500" size={24} />
          </div>
          <dt className="text-xs sm:text-sm font-medium text-gray-500">Pending Requests</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-yellow-600">1</dd>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center col-span-2 sm:col-span-1">
          <div className="flex justify-center mb-2">
            <Check className="text-gray-500" size={24} />
          </div>
          <dt className="text-xs sm:text-sm font-medium text-gray-500">Completed Requests</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-green-600">2</dd>
        </div>
      </div>

      {/* Requests Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Blood Requests</h3>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
              New Request
            </button>
          </div>
          
          {/* Mobile View - Card-based List */}
          <div className="block sm:hidden space-y-4">
            {requests.map((request) => (
              <div 
                key={request.id} 
                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="font-semibold text-sm">
                    {request.id} - {request.bloodType}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {request.date} | {request.units} Units
                  </div>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                    request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {['Request ID', 'Date', 'Blood Type', 'Units', 'Status'].map((header) => (
                    <th 
                      key={header} 
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.bloodType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.units}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {request.status}
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

export default ConsumerDashboard;
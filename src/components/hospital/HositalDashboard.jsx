import React, { useState, useEffect, ErrorBoundary } from 'react';
import { 
  DropletIcon, 
  ShieldHalfIcon, 
  CheckCircle2Icon, 
  ClockIcon, 
  AlertCircleIcon 
} from 'lucide-react';
import { fetchHospitalDashboard } from '../../services/hospitalService';
import { StatCard } from '../shared/ui/cards';

// Error Boundary Component
class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Caught error in Dashboard:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
          <AlertCircleIcon className="h-16 w-16 text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4 text-center">
            An unexpected error occurred while loading the dashboard.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Reload Page
          </button>
          {this.state.error && (
            <details className="mt-4 max-w-full overflow-auto">
              <summary className="cursor-pointer text-gray-700">
                View Error Details
              </summary>
              <pre className="bg-gray-100 p-4 rounded-lg mt-2 text-xs text-red-700">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

const HospitalDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_bags: 0,
    total_requests: 0,
    pending_requests: 0,
    approved_requests: 0,
    rejected_requests: 0,
    urgent_requests: 0,
    recent_requests: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchHospitalDashboard();
        
        // Validate data to prevent potential rendering issues
        if (!data) {
          throw new Error('No data received from server');
        }

        setDashboardData({
          total_bags: data.total_bags || 0,
          total_requests: data.total_requests || 0,
          pending_requests: data.pending_requests || 0,
          approved_requests: data.approved_requests || 0,
          rejected_requests: data.rejected_requests || 0,
          urgent_requests: data.urgent_requests || 0,
          recent_requests: Array.isArray(data.recent_requests) ? data.recent_requests : []
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Loading State Component
  const LoadingState = () => (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center">
        <div className="mx-auto mb-4 h-20 w-20 text-red-600 animate-pulse relative">
          <DropletIcon size={80} className="animate-bounce" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-red-600 animate-ping opacity-75"></div>
          </div>
        </div>
        <p className="text-gray-700 text-xl font-semibold">Loading dashboard data...</p>
      </div>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <AlertCircleIcon className="h-12 w-12 text-red-600 mb-4" />
      <p className="text-red-600 text-lg text-center">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Retry
      </button>
    </div>
  );


  // Render Main Dashboard
  const renderDashboard = () => (
    <div className="container mx-auto px-4 py-8 space-y-8 bg-gradient-to-br from-red-50 to-red-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Dashboard</h1>
        <p className="text-gray-600">Manage blood requests and patient needs</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard
          icon={DropletIcon}
          title="Total Bags"
          value={dashboardData.total_bags}
          valueColor="text-blue-600"
        />
        <StatCard
          icon={ShieldHalfIcon}
          title="Total Requests"
          value={dashboardData.total_requests}
          valueColor="text-blue-600"
        />
        <StatCard 
          icon={CheckCircle2Icon}
          title="Approved"
          value={dashboardData.approved_requests}
          valueColor="text-green-600"
        />
        <StatCard 
          icon={ClockIcon}
          title="Pending"
          value={dashboardData.pending_requests}
          valueColor="text-yellow-600"
        />
        <StatCard 
          icon={AlertCircleIcon}
          title="Urgent"
          value={dashboardData.urgent_requests}
          valueColor="text-red-600"
        />
        <StatCard 
          icon={AlertCircleIcon}
          title="Rejected"
          value={dashboardData.rejected_requests}
          valueColor="text-red-600"
        />
      </div>

      {/* Recent Blood Requests */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Blood Requests</h3>
          
          {dashboardData.recent_requests.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No recent blood requests
            </div>
          ) : (
            <>
              {/* Mobile/Tablet View */}
              <div className="block md:hidden space-y-4">
                {dashboardData.recent_requests.map((request) => (
                  <div 
                    key={request.id} 
                    className="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{request.patient}</p>
                      <p className="text-red-600">{request.bloodType}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'Rejected'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Patient Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Blood Type</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recent_requests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{request.patient}</td>
                        <td className="py-3 px-4 text-red-600 font-semibold">{request.bloodType}</td>
                        <td
                          className={`py-3 px-4 font-medium ${
                            request.status === 'Approved'
                              ? 'text-green-600'
                              : request.status === 'Pending'
                              ? 'text-yellow-600'
                              : request.status === 'Rejected'
                              ? 'text-gray-600'
                              : 'text-red-600'
                          }`}
                        >
                          {request.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <DashboardErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        {loading ? <LoadingState /> : 
         error ? <ErrorState /> : 
         renderDashboard()}
      </div>
    </DashboardErrorBoundary>
  );
};

export default HospitalDashboard;
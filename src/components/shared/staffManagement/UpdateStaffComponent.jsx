import React, { useState, useEffect } from 'react';
import { 
  UserCog, 
  AlertCircle, 
  CheckCircle,
  Mail,
  Search,
  User,
  Phone,
  Shield,
  Loader,
  Droplet
} from 'lucide-react';
import { updateStaff, getStaffByEmail } from '../../../services/shared/staffManagementService';

const UpdateStaffComponent = () => {
  const [staffData, setStaffData] = useState({
    email: '',
    name: '',
    contact: '',
    role: ''
  });

  const [searchEmail, setSearchEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setError("Please enter an email to search");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const staff = await getStaffByEmail(searchEmail);
      setStaffData({
        email: staff.email,
        name: staff.name,
        contact: staff.contact,
        role: staff.role,
      });
      setError(null);
      setSuccess(null);
      setSearchPerformed(true);
    } catch (err) {
      setError(err.message || "Staff member not found");
      setStaffData({
        email: '',
        name: '',
        contact: '',
        role: ''
      });
      setSearchPerformed(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await updateStaff(searchEmail, staffData);
      setSuccess('Staff member updated successfully');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to update staff member");
    } finally {
      setLoading(false);
    }
  };

  // Role options for dropdown
  const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MANAGER', label: 'Manager' },
    { value: 'STAFF', label: 'Staff' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Receptionist', label: 'Receptionist' }
  ];

  // Loading State Component
  const LoadingState = () => (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center">
        <div className="mx-auto mb-4 h-20 w-20 text-red-600 animate-pulse relative">
          <Droplet size={80} className="animate-bounce" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-red-600 animate-ping opacity-75"></div>
          </div>
        </div>
        <p className="text-gray-700 text-xl font-semibold">Processing request...</p>
      </div>
    </div>
  );

  if (loading && !searchPerformed) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="border-b p-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <UserCog className="mr-2 text-red-500" />
              Update Staff Member
            </h2>
            <p className="text-gray-600 mt-1">Modify staff member information</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Search Section */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Search className="mr-2 text-blue-500 h-5 w-5" />
                Find Staff Member
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    placeholder="Enter staff email to search"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className={`px-6 py-2 rounded-md text-white font-medium transition duration-300 flex items-center justify-center ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <p className="text-red-800 font-semibold">Error</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <p className="text-green-800 font-semibold">Success</p>
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              </div>
            )}

            {/* Update Form */}
            {searchPerformed && (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl">
                <div className="bg-blue-50 p-4 rounded-t-xl border-b border-blue-100">
                  <h3 className="text-lg font-medium text-blue-900 flex items-center">
                    <UserCog className="mr-2 text-blue-500 h-5 w-5" />
                    Staff Information
                  </h3>
                </div>
                
                <div className="p-4 space-y-4">
                  {/* Email Field - Read Only */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="block text-sm font-medium text-gray-700 flex items-center md:justify-end">
                      <Mail className="h-4 w-4 mr-1 text-gray-500 md:mr-2" />
                      Email
                    </label>
                    <div className="md:col-span-2">
                      <input
                        type="email"
                        name="email"
                        value={staffData.email}
                        readOnly
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                      />
                      <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </div>
                  
                  {/* Name Field */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="block text-sm font-medium text-gray-700 flex items-center md:justify-end">
                      <User className="h-4 w-4 mr-1 text-gray-500 md:mr-2" />
                      Full Name
                    </label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="name"
                        value={staffData.name}
                        onChange={handleChange}
                        placeholder="Full name of staff member"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  {/* Contact Field */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="block text-sm font-medium text-gray-700 flex items-center md:justify-end">
                      <Phone className="h-4 w-4 mr-1 text-gray-500 md:mr-2" />
                      Contact
                    </label>
                    <div className="md:col-span-2">
                      <input
                        type="tel"
                        name="contact"
                        value={staffData.contact}
                        onChange={handleChange}
                        placeholder="Contact number"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  {/* Role Field */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="block text-sm font-medium text-gray-700 flex items-center md:justify-end">
                      <Shield className="h-4 w-4 mr-1 text-gray-500 md:mr-2" />
                      Role
                    </label>
                    <div className="md:col-span-2">
                      <select
                        name="role"
                        value={staffData.role}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Select a role</option>
                        {roleOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-xl">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <UserCog className="h-4 w-4 mr-2" />
                        Update Staff Member
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
            
            {/* Empty State */}
            {!searchPerformed && !error && (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Mail className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Search for a staff member</h3>
                <p className="mt-1 text-gray-500">
                  Enter the email address of the staff member you want to update
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaffComponent;
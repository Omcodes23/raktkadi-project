import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { USER_TYPES } from '../utils/constants';
import FormInput from '../components/shared/form/FormInput'; // Assuming you have a FormInput component

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    blood_group: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        USER_TYPES.CUSTOMERS,
        {
          contact: formData.contact,
          blood_group: formData.blood_group,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      );
      
      setSuccess('Registration successful! Please check your email for verification.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Blood Bank Management
          </h2>
          <p className="text-center text-sm text-gray-600">
            Create your account
          </p>
        </div>

        {(error || success) && (
          <div className={`rounded-md ${error ? 'bg-red-50' : 'bg-green-50'} p-2 mb-4`}>
            <div className="flex">
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${error ? 'text-red-800' : 'text-green-800'}`}>
                  {error || success}
                </h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              autoComplete="email"
            />
            
            <FormInput
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
            />
            
            <FormInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="new-password"
            />
            
            <FormInput
              type="select"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              options={bloodGroupOptions}
            />
            
            <FormInput
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            
            <FormInput
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            
            <FormInput
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
            
            <FormInput
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
            />
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
            >
              {loading ? 'Registering...' : 'Sign up'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-1/2 flex justify-center py-2 px-4 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? 
            <button 
              onClick={() => navigate('/login')}
              className="ml-1 text-red-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
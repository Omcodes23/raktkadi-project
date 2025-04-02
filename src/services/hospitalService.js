// src/services/hospitalService.js
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { getAuthToken } from './authService';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add an interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Fetches hospital dashboard data from the API
 */
export const fetchHospitalDashboard = async () => {
  try {
    const response = await api.get('/inventory/hospital-dashboard/');
    return response.data;
  } catch (error) {
    console.error('Error in fetchHospitalDashboard:', error);
    throw new Error(
      `Failed to fetch hospital dashboard data: ${error.response?.data?.message || error.message}. ` +
      `If this persists, please try logging out and back in.`
    );
  }
};

// Commented out functions can be uncommented and converted similarly when needed
// /**
//  * Fetches recent blood requests for the hospital
//  * @returns {Promise<Array>} Array of recent blood requests
//  */
// export const fetchRecentBloodRequests = async () => {
//   try {
//     const response = await api.get('/inventory/blood-requests/recent/');
//     return response.data;
//   } catch (error) {
//     console.error('Error in fetchRecentBloodRequests:', error);
//     throw new Error(`Failed to fetch recent blood requests: ${error.response?.data?.message || error.message}`);
//   }
// };

// /**
//  * Updates the status of a blood request
//  * @param {string|number} requestId - The ID of the request to update
//  * @param {string} status - The new status (Approved, Rejected, Pending, Emergency)
//  * @returns {Promise<Object>} The updated request
//  */
// export const updateBloodRequestStatus = async (requestId, status) => {
//   try {
//     const response = await api.patch(`/inventory/blood-requests/${requestId}/status/`, { status });
//     return response.data;
//   } catch (error) {
//     console.error('Error in updateBloodRequestStatus:', error);
//     throw new Error(`Failed to update request status: ${error.response?.data?.message || error.message}`);
//   }
// };
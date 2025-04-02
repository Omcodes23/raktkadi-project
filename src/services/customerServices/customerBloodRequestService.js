import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { getAuthToken } from '../authService';

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
 * Create a new blood request
 * @param {Object} requestData - The blood request data
 * @returns {Promise<Object>} The created request
 */
export const createBloodRequest = async (requestData) => {
  try {
    const response = await api.post('/inventory/request/create/', requestData);
    return response.data;
  } catch (error) {
    console.error('Error in createBloodRequest:', error);
    throw new Error(
      `Failed to create blood request: ${error.response?.data?.message || error.message}`
    );
  }
};

/**
 * Check blood availability for a specific blood group
 * @param {string} bloodGroup - The blood group to check
 * @returns {Promise<Array>} Array of blood availability data
 */
export const checkBloodAvailability = async (bloodGroup) => {
  try {
    const response = await api.get(`/inventory/blood-availability/${bloodGroup}/`);
    return response.data;
  } catch (error) {
    console.error('Error in checkBloodAvailability:', error);
    throw new Error(
      `Failed to check blood availability: ${error.response?.data?.message || error.message}`
    );
  }
};
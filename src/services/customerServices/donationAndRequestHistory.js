// src/services/CustomerService.js
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { getAuthToken } from '../authService';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

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

// Get donation history
export const getDonationHistory = async () => {
  try {
    const response = await api.get('/inventory/donation-history/');
    return response.data;
  } catch (error) {
    console.error('Error fetching donation history:', error);
    throw new Error(`Failed to fetch donation history: ${error.response?.data?.message || error.message}`);
  }
};

// Get request history
export const getRequestHistory = async () => {
  try {
    const response = await api.get('/inventory/request-history/');
    return response.data;
  } catch (error) {
    console.error('Error fetching request history:', error);
    throw new Error(`Failed to fetch request history: ${error.response?.data?.message || error.message}`);
  }
};
import axios from 'axios';
import { API_URL } from '../utils/constants';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login/', { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Network error occurred');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error processing login request');
    }
  }
};

export const registerUser = async (name, email, password, userType, additionalData = {}) => {
  try {
    // Combine basic user data with additional profile data
    const userData = {
      name,
      email,
      password,
      user_type: userType, 
      ...additionalData,
    };

    const response = await api.post('/customers/', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('Network error occurred');
    } else {
      throw new Error('Error processing registration request');
    }
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getAuthUserType = () => {
  return localStorage.getItem('userType');
};

export const setAuthCredentials = (token, userType) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userType', userType);
};

export const clearAuthCredentials = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userType');
};

// Optional: Add an interceptor to include auth token in requests
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
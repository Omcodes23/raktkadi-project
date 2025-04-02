// src/services/staffService.js
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { getAuthToken } from '../authService';

const api = axios.create({
  baseURL: API_URL,
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

// Create new staff member
export const createStaff = async (staffData) => {
  try {
    const response = await api.post('/staff/', staffData);
    return response.data;
  } catch (error) {
    console.error('Error creating staff:', error);
    throw new Error(`Failed to create staff: ${error.response?.data?.message || error.message}`);
  }
};

// Update staff member
export const updateStaff = async (email, staffData) => {
  try {
    const response = await api.put(`/staff/${email}/`, staffData);
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error);
    throw new Error(`Failed to update staff: ${error.response?.data?.message || error.message}`);
  }
};

// List all staff members
export const listStaff = async () => {
  try {
    const response = await api.get('/staff/');
    return response.data;
  } catch (error) {
    console.error('Error listing staff:', error);
    throw new Error(`Failed to list staff: ${error.response?.data?.message || error.message}`);
  }
};

// Get staff member by email
export const getStaffByEmail = async (email) => {
  try {
    const response = await api.get(`/staff/${email}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching staff details:', error);
    throw new Error(`Failed to fetch staff details: ${error.response?.data?.message || error.message}`);
  }
};

// Delete staff member
export const deleteStaff = async (email) => {
  try {
    const response = await api.delete(`/staff/${email}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw new Error(`Failed to delete staff: ${error.response?.data?.message || error.message}`);
  }
};
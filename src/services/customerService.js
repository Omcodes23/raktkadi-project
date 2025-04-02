import axios from 'axios';
import { BASE_URL, API_URL } from '../utils/constants';
import { getAuthToken } from './authService';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
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
 * Fetch customer dashboard data
 * @returns {Promise<Object>} Dashboard data
 */
export const fetchCustomerDashboard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/inventory/customer-dashboard/`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    });

    const data = response.data;
    
    // Transform the profile_img URL if it exists and is a relative path
    if (data.profile_img && !data.profile_img.startsWith('http')) {
      data.profile_img = `${API_URL}${data.profile_img}`;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchCustomerDashboard:', error);
    throw new Error(
      `Failed to fetch dashboard data: ${error.response?.data?.message || error.message}. ` +
      `If this persists, please try logging out and back in.`
    );
  }
};

/**
 * Fetch customer profile data
 * @returns {Promise<Object>} Profile data
 */
export const fetchCustomerProfile = async () => {
  try {
    const response = await api.get('/customers/');
    const data = response.data;
    
    if (data.profile_img && !data.profile_img.startsWith('http')) {
      data.profile_img = `${API_URL}${data.profile_img}`;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchCustomerProfile:', error);
    throw new Error(`Failed to fetch profile data: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Update customer profile including optional image upload
 * @param {Object} profileData - Profile data to update
 * @param {File} [imageFile] - Optional image file to upload
 * @returns {Promise<Object>} Updated profile data
 */
export const updateCustomerProfile = async (profileData, imageFile = null) => {
  try {
    // Create a copy of the data to avoid modifying the original
    const dataToSend = { ...profileData };
    
    // Remove read-only fields to prevent unintended updates
    delete dataToSend.email;
    delete dataToSend.blood_group;
    delete dataToSend.last_donation;
    
    // Remove the profile_img field if it's a URL (not a file)
    if (dataToSend.profile_img && typeof dataToSend.profile_img === 'string') {
      delete dataToSend.profile_img;
    }
    
    // Ensure pincode is a number
    if (dataToSend.pincode && typeof dataToSend.pincode === 'string') {
      dataToSend.pincode = parseInt(dataToSend.pincode, 10);
    }
    
    console.log('Cleaned data to send:', dataToSend);
    
    let response;
    
    // If we have an image file, use FormData to send both profile data and image
    if (imageFile) {
      const formData = new FormData();
      
      // Add all profile data fields to formData
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
          formData.append(key, String(dataToSend[key]));
        }
      });
      
      // Add the image file
      formData.append('profile_img', imageFile);
      
      // Log the FormData entries for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      // Use the api instance with the correct baseURL
      response = await api.put('/customers/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    } else {
      // If no image, send JSON data
      response = await api.put('/customers/', dataToSend);
    }

    const data = response.data;
    
    // Transform the profile_img URL if it exists and is a relative path
    if (data.profile_img && !data.profile_img.startsWith('http')) {
      data.profile_img = `${API_URL}${data.profile_img}`;
    }
    
    return data;
  } catch (error) {
    console.error('Error in updateCustomerProfile:', error);
    // Add more detailed error information
    const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         error.message || 
                         'Unknown error';
    throw new Error(`Failed to update profile: ${errorMessage}`);
  }
};
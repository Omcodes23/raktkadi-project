import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  setAuthCredentials,
  clearAuthCredentials,
  getAuthToken,
  getAuthUserType,
  registerUser
} from '../services/authService';
import { USER_TYPES } from '../utils/constants';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getAuthToken());
  const [userType, setUserType] = useState(getAuthUserType());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  // Login and save credentials
  const login = useCallback((authToken, type) => {
    if (!Object.values(USER_TYPES).includes(type)) {
      console.error(`Invalid user type: ${type}`);
      setError('Invalid user type');
      return;
    }
    setAuthCredentials(authToken, type);
    setToken(authToken);
    setUserType(type);
    setError(null);
  }, []);
  
  const signup = useCallback(async (name, email, password, additionalData = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(name, email, password, additionalData);
      setMessage(response.message || 'Registration successful');
      return response;
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Logout and clear credentials
  const logout = useCallback(() => {
    clearAuthCredentials();
    setToken(null);
    setUserType(null);
  }, []);

  
  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!token;
  }, [token]);
  console.log(`Token: ${token}`);

  // Get the current user's role
  const getUserRole = useCallback(() => {
    return userType || null;
  }, [userType]);
  
  const value = {
    token,
    userType,
    loading,
    error,
    message,
    login,
    signup,
    logout,
    isAuthenticated,
    getUserRole,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
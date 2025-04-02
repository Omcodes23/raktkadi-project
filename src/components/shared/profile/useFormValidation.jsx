import { useState } from 'react';

const useFormValidation = (initialValidations = {}) => {
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value, rules = {}) => {
    const errors = {};

    // Required field validation
    if (rules.required && (!value || value.trim() === '')) {
      errors[name] = `${name.replace('_', ' ').charAt(0).toUpperCase() + name.replace('_', ' ').slice(1)} is required`;
    }

    // Contact number validation
    if (name === 'contact' && value && !/^[0-9+\-\s]{10,15}$/.test(value)) {
      errors[name] = 'Please enter a valid contact number';
    }

    // Pincode validation
    if (name === 'pincode' && value && !/^\d{5,6}$/.test(value)) {
      errors[name] = 'Please enter a valid pincode';
    }

    // Email validation
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[name] = 'Please enter a valid email address';
    }

    return errors;
  };

  const validate = (formData, validationRules = {}) => {
    let errors = {};

    Object.keys(formData).forEach(key => {
      const fieldErrors = validateField(key, formData[key], validationRules[key]);
      errors = { ...errors, ...fieldErrors };
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearFieldError = (fieldName) => {
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  return {
    validationErrors,
    validate,
    clearFieldError,
    validateField
  };
};

export default useFormValidation;
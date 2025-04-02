// src/utils/roleMapping.js
import { USER_TYPES } from './constants';

// Mapping function to convert user types to sidebar role keys
export const mapUserTypeToSidebarRole = (userType) => {
  const roleMapping = {
    [USER_TYPES.ADMIN]: 'admin',
    [USER_TYPES.BLOOD_BANK]: 'bloodbank',
    [USER_TYPES.STAFF]: 'staff',
    [USER_TYPES.DONOR]: 'donor',
    [USER_TYPES.CONSUMER]: 'consumer'
  };

  const mappedRole = roleMapping[userType];
  
  console.log('Raw User Type:', userType);
  console.log('Mapped Sidebar Role:', mappedRole);

  return mappedRole;
};
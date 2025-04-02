import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mapUserTypeToSidebarRole } from '../../utils/roleMapping';

const Sidebar = () => {
  const { getUserRole } = useAuth();
  const location = useLocation();
  
  // Get the mapped role
  const userRole = mapUserTypeToSidebarRole(getUserRole());

  const navItems = {
    admin: [
      { name: 'Dashboard', path: '/admin' },
      { name: 'Manage Users', path: '/admin/users' },
      { name: 'Blood Banks', path: '/admin/blood-banks' },
      { name: 'Reports', path: '/admin/reports' }
    ],
    bloodbank: [
      { name: 'Dashboard', path: '/bloodbank' },
      { name: 'Blood Stock', path: '/bloodbank/stock' },
      { name: 'Donations', path: '/bloodbank/donations' },
      { name: 'Requests', path: '/bloodbank/requests' }
    ],
    staff: [
      { name: 'Dashboard', path: '/staff' },
      { name: 'Manage Donations', path: '/staff/donations' },
      { name: 'Handle Requests', path: '/staff/requests' }
    ],
    donor: [
      { name: 'Dashboard', path: '/donor' },
      { name: 'Donation History', path: '/donor/history' },
      { name: 'Schedule Donation', path: '/donor/schedule' }
    ],
    consumer: [
      { name: 'Dashboard', path: '/consumer' },
      { name: 'Request Blood', path: '/consumer/request' },
      { name: 'Request History', path: '/consumer/history' }
    ]
  };

  // Add extensive logging
  console.group('Sidebar Navigation Debug');
  console.log('Current User Role:', userRole);
  console.log('Available Roles:', Object.keys(navItems));
  console.log('Current Nav Items:', navItems[userRole] || 'No items found');
  console.groupEnd();

  // Get current navigation items, with fallback to empty array
  const currentNavItems = navItems[userRole] || [];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-red-700 text-white">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-red-800">
          <span className="text-xl font-bold">Blood Bank</span>
        </div>
        {currentNavItems.length > 0 ? (
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              {currentNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-red-800 text-white'
                        : 'hover:bg-red-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="flex items-center justify-center flex-1 text-red-200">
            No navigation items available
          </div>
        )}
        <div className="p-4 bg-red-800">
          <p className="text-sm text-red-200">
            Role: {userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
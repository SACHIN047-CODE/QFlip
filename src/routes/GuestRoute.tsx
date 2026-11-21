import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const getDashboardPathForRole = (role?: UserRole): string => {
  switch (role) {
    case 'doctor':
      return '/doctor/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'staff':
      return '/staff/dashboard';
    case 'lab':
      return '/lab/dashboard';
    case 'pharmacy':
      return '/pharmacy/dashboard';
    case 'patient':
    default:
      return '/patient/dashboard';
  }
};

/**
 * GuestRoute ensures authenticated users cannot access login or register pages.
 * Any logged-in user navigating here is automatically redirected to their role's dashboard.
 */
export const GuestRoute: React.FC = () => {
  const { user, role, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardPathForRole(role)} replace />;
  }

  return <Outlet />;
};

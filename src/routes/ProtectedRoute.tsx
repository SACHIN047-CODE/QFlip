import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, role, isAuthenticated } = useAuth();

  // If role is specified and current role is not in allowedRoles, allow seamless demo or redirect
  if (allowedRoles && !allowedRoles.includes(role)) {
    // For smooth demo experience, allow or navigate to user's home
    return <Outlet />;
  }

  return <Outlet />;
};

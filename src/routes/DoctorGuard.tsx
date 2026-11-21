import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DoctorGuard: React.FC = () => {
  const { user, role, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Only verified doctors or admins are permitted in clinical workspace
  if (role !== 'doctor' && role !== 'admin') {
    return <Navigate to="/patient/dashboard" replace />;
  }

  return <Outlet />;
};

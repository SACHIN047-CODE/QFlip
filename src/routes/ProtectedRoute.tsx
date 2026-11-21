import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, role, isAuthenticated } = useAuth();
  const location = useLocation();

  // 1. Mandatory Login Gate: unauthenticated users MUST log in first
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role-Based Access Control (RBAC): restrict access if role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'staff') return <Navigate to="/staff/dashboard" replace />;
    if (role === 'lab') return <Navigate to="/lab/dashboard" replace />;
    if (role === 'pharmacy') return <Navigate to="/pharmacy/dashboard" replace />;
    return <Navigate to="/patient/dashboard" replace />;
  }

  return <Outlet />;
};

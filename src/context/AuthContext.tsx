import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService, MOCK_USERS } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole, password?: string) => Promise<void>;
  register: (data: { name: string; phone: string; abhaId?: string; role?: UserRole; email: string; password?: string }) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  const login = async (email: string, role?: UserRole, password?: string) => {
    const res = await authService.login(email, role, password);
    setUser(res.user);
  };

  const register = async (data: { name: string; phone: string; abhaId?: string; role: UserRole; email: string }) => {
    const res = await authService.register(data);
    setUser(res.user);
  };

  const logout = () => {
    sessionStorage.removeItem('qflip_doctor_verified');
    authService.logout();
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole !== 'doctor' && newRole !== 'admin') {
      sessionStorage.removeItem('qflip_doctor_verified');
    }
    const newUser = authService.switchRole(newRole);
    setUser(newUser);
  };

  const currentRole: UserRole = user?.role || 'patient';

  return (
    <AuthContext.Provider
      value={{
        user,
        role: currentRole,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

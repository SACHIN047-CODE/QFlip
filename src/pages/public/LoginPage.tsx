import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('doctor');
  const [email, setEmail] = useState('doctor@careflow.gov.in');
  const [password, setPassword] = useState('careflow2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
    switch (selectedRole) {
      case 'patient':
        setEmail('patient@careflow.gov.in');
        break;
      case 'doctor':
        setEmail('doctor@careflow.gov.in');
        break;
      case 'staff':
        setEmail('staff@careflow.gov.in');
        break;
      case 'admin':
        setEmail('admin@careflow.gov.in');
        break;
      case 'lab':
        setEmail('lab@careflow.gov.in');
        break;
      case 'pharmacy':
        setEmail('pharmacy@careflow.gov.in');
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your official email/ID and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, role);
      if (role === 'doctor' || role === 'admin') {
        sessionStorage.setItem('careflow_doctor_verified', 'true');
      }
      setSuccess('Authentication verified! Redirecting to secure dashboard...');
      setTimeout(() => {
        if (role === 'doctor') navigate('/doctor/dashboard');
        else if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'staff') navigate('/staff/dashboard');
        else if (role === 'lab') navigate('/lab/dashboard');
        else if (role === 'pharmacy') navigate('/pharmacy/dashboard');
        else navigate('/patient/dashboard');
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-light-surface-variant/30">
      <div className="max-w-md w-full bg-light-surface rounded-2xl border border-light-outline p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
              <path
                d="M4 18L10 6L18 28L24 14L30 22"
                stroke="#2585E8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <circle cx="30" cy="22" r="3.5" fill="#F2D500"></circle>
            </svg>
            <span className="font-headline text-headline-sm font-extrabold text-light-primary">
              care<span className="text-secondary font-medium">flow</span>
            </span>
          </Link>
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            Hospital SSO &amp; Portal Authentication
          </h2>
          <p className="text-xs text-light-on-surface-variant mt-1">
            Access role-protected clinical workflows, ABHA gateway, and live OPD dashboards
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="text-[11px] font-bold text-light-on-surface-variant uppercase block mb-1.5">
            Select Your Role:
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-light-surface-variant rounded-xl border border-light-outline text-xs">
            <button
              type="button"
              onClick={() => handleRoleChange('patient')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'patient' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('doctor')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'doctor' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('staff')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'staff' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Staff Desk
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'admin' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Administrator
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('lab')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'lab' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Lab Staff
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('pharmacy')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'pharmacy' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Chemist
            </button>
          </div>
        </div>

        {/* Feedback alerts */}
        {error && (
          <div className="p-3 bg-danger/10 border border-danger/30 rounded-xl text-xs text-danger flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-success/10 border border-success/30 rounded-xl text-xs text-success flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{success}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-light-primary block mb-1">
              Email Address / Staff ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@careflow.gov.in"
              required
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 font-body"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-light-primary">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-secondary hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-3.5 pr-10 py-2.5 text-xs rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 font-body"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-on-surface-variant hover:text-light-primary"
              >
                <span className="material-symbols-outlined text-base">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent hover:brightness-95 text-on-accent font-headline font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-on-accent border-t-transparent rounded-full animate-spin"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to {role.toUpperCase()} Workspace</span>
                <span className="material-symbols-outlined text-sm">login</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-light-outline text-center text-xs text-light-on-surface-variant">
          New patient without an account?{' '}
          <Link to="/register" className="text-secondary font-bold hover:underline">
            Register with ABHA
          </Link>
        </div>
      </div>
    </div>
  );
};

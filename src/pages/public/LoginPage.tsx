import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { user, isAuthenticated, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('patient@careflow.gov.in');
  const [password, setPassword] = useState('Careflow@2026');
  const [doctorPin, setDoctorPin] = useState('7788');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.title = 'Secure Portal Sign In — QFlip Healthcare';
  }, []);

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setError('');
    switch (selectedRole) {
      case 'patient':
        setEmail('patient@careflow.gov.in');
        setPassword('Careflow@2026');
        break;
      case 'doctor':
        setEmail('doctor@careflow.gov.in');
        setPassword('Careflow@2026');
        setDoctorPin('7788');
        break;
      case 'staff':
        setEmail('staff@careflow.gov.in');
        setPassword('Careflow@2026');
        break;
      case 'admin':
        setEmail('admin@careflow.gov.in');
        setPassword('Careflow@2026');
        break;
      case 'lab':
        setEmail('lab@careflow.gov.in');
        setPassword('Careflow@2026');
        break;
      case 'pharmacy':
        setEmail('pharmacy@careflow.gov.in');
        setPassword('Careflow@2026');
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    // Doctor clearance PIN check: ONLY required when signing in as Doctor
    const isDoctorLogin = role === 'doctor' || email.toLowerCase().includes('doctor');
    if (isDoctorLogin) {
      if (!doctorPin || doctorPin.trim() !== '7788') {
        setError('Incorrect Doctor PIN. Please enter your 4-digit doctor authorization PIN (Default: 7788).');
        return;
      }
      sessionStorage.setItem('qflip_doctor_verified', 'true');
    }

    try {
      setLoading(true);
      await login(email, role);
      setSuccess('Credentials verified! Loading your secure portal...');
      setTimeout(() => {
        if (role === 'doctor') navigate('/doctor/dashboard');
        else if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'staff') navigate('/staff/dashboard');
        else if (role === 'lab') navigate('/lab/dashboard');
        else if (role === 'pharmacy') navigate('/pharmacy/dashboard');
        else navigate('/patient/dashboard');
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="max-w-md w-full glass-card p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center relative">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
              <path
                d="M4 18L10 6L18 28L24 14L30 22"
                stroke="#0F766E"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <circle cx="30" cy="22" r="3.5" fill="#14B8A6"></circle>
            </svg>
            <span className="font-headline text-headline-sm font-extrabold text-light-primary">
              CARE<span className="text-secondary font-medium">FLOW</span>
            </span>
          </Link>
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            {t('auth.login_title', 'Hospital SSO & Portal Authentication')}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access role-protected clinical workflows, ABHA gateway, and live OPD dashboards
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
            Select Your Role:
          </label>
          <div className="flex items-center p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 gap-1 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`flex-1 py-2 px-2 rounded-xl font-bold transition-all text-center ${role === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('doctor')}
              className={`flex-1 py-2 px-2 rounded-xl font-bold transition-all text-center ${role === 'doctor' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('patient')}
              className={`flex-1 py-2 px-2 rounded-xl font-bold transition-all text-center ${role === 'patient' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('staff')}
              className={`flex-1 py-2 px-2 rounded-xl font-bold transition-all text-center ${role === 'staff' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
            >
              Staff
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('lab')}
              className={`flex-1 py-2 px-2 rounded-xl font-bold transition-all text-center ${role === 'lab' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
            >
              Lab
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('pharmacy')}
              className={`flex-1 py-2 px-2 rounded-xl font-bold transition-all text-center ${role === 'pharmacy' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'
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
              placeholder="name@qflip.gov.in"
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

          {/* Doctor Clearance PIN: ONLY visible & required for Doctor logins */}
          {(role === 'doctor' || email.toLowerCase().includes('doctor')) && (
            <div className="p-3.5 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-amber-600">badge</span>
                  Doctor Security Clearance PIN
                </label>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  Demo PIN: 7788
                </span>
              </div>
              <input
                type="password"
                value={doctorPin}
                onChange={(e) => setDoctorPin(e.target.value)}
                placeholder="Enter 4-digit PIN (7788)"
                maxLength={6}
                required
                className="w-full px-3.5 py-2 text-xs font-mono font-bold tracking-widest rounded-lg border border-amber-300 bg-white text-light-primary focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-[10px] text-amber-700">
                Authorized clinical clearance required for Doctor OPD consultation queue and prescriptions.
              </p>
            </div>
          )}

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
        <div className="pt-2 border-t border-light-outline text-center text-xs text-light-on-surface-variant">
          New patient without an account?{' '}
          <Link to="/register" className="text-secondary font-bold hover:underline">
            Register with ABHA
          </Link>
        </div>
      </div>
    </div>
  );
};

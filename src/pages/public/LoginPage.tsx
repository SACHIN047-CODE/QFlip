import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { DEMO_ACCOUNTS } from '../../services/authService';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('sachin@example.com');
  const [password, setPassword] = useState('Demo@12345');
  const [doctorPin, setDoctorPin] = useState('7788');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [demoCategory, setDemoCategory] = useState<'admin' | 'doctors' | 'patients' | 'staff'>('admin');

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setError('');
    switch (selectedRole) {
      case 'admin':
        setEmail('sachin@example.com');
        setPassword('Demo@12345');
        break;
      case 'doctor':
        setEmail('rahul@example.com');
        setPassword('Demo@12346');
        setDoctorPin('7788');
        break;
      case 'patient':
        setEmail('amit@example.com');
        setPassword('Demo@12347');
        break;
      case 'staff':
        setEmail('staff@careflow.gov.in');
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

  const handleSelectDemoUser = (userEmail: string, userRole: UserRole, userPassword?: string) => {
    setEmail(userEmail);
    setRole(userRole);
    setPassword(userPassword || 'Careflow@2026');
    if (userRole === 'doctor') {
      setDoctorPin('7788');
    }
    setError('');
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
    const isDoctorLogin = role === 'doctor' || email.toLowerCase().includes('doctor') || email.toLowerCase().startsWith('dr.');
    if (isDoctorLogin) {
      if (!doctorPin || doctorPin.trim() !== '7788') {
        setError('Incorrect Doctor PIN. Please enter your 4-digit doctor authorization PIN (Default: 7788).');
        return;
      }
      sessionStorage.setItem('qflip_doctor_verified', 'true');
    }

    try {
      setLoading(true);
      await login(email, role, password);
      setSuccess('Credentials verified in Firebase! Loading your workspace...');
      setTimeout(() => {
        if (role === 'doctor') navigate('/doctor/dashboard');
        else if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'staff') navigate('/staff/dashboard');
        else if (role === 'lab') navigate('/lab/dashboard');
        else if (role === 'pharmacy') navigate('/pharmacy/dashboard');
        else navigate('/patient/dashboard');
      }, 400);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const doctorsList = DEMO_ACCOUNTS.filter(u => u.role === 'doctor');
  const patientsList = DEMO_ACCOUNTS.filter(u => u.role === 'patient');
  const adminList = DEMO_ACCOUNTS.filter(u => u.role === 'admin');
  const staffList = DEMO_ACCOUNTS.filter(u => ['staff', 'lab', 'pharmacy'].includes(u.role));

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-light-surface-variant/30">
      <div className="max-w-xl w-full bg-light-surface rounded-2xl border border-light-outline p-6 sm:p-8 shadow-xl space-y-5">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
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
              Q<span className="text-secondary font-medium">Flip</span>
            </span>
          </Link>
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            Hospital SSO &amp; Portal Authentication
          </h2>
          <p className="text-xs text-light-on-surface-variant mt-1">
            Connected to <strong>Firebase Database</strong> • Role-based access control (RBAC)
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="text-[11px] font-bold text-light-on-surface-variant uppercase block mb-1.5">
            Select Your Role:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-light-surface-variant rounded-xl border border-light-outline text-xs">
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'admin' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Admin
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
              onClick={() => handleRoleChange('patient')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'patient' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('staff')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'staff' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Staff
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('lab')}
              className={`py-2 px-1 rounded-lg font-bold transition-all text-center ${
                role === 'lab' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant hover:text-light-primary'
              }`}
            >
              Lab
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
          <div className="p-3.5 bg-danger/10 border border-danger/30 rounded-xl text-xs text-danger space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>{error}</span>
            </div>
            {(error.toLowerCase().includes('register first') || error.toLowerCase().includes('not found')) && (
              <div className="pt-2 border-t border-danger/20 flex items-center justify-between">
                <span className="text-[11px] text-light-on-surface-variant">Not registered in Firebase database?</span>
                <Link
                  to="/register"
                  className="px-3 py-1.5 bg-secondary text-white font-bold rounded-lg text-xs hover:brightness-110 shadow-xs inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">how_to_reg</span>
                  Register Now (role="patient")
                </Link>
              </div>
            )}
          </div>
        )}

        {success && (
          <div className="p-3 bg-success/10 border border-success/30 rounded-xl text-xs text-success flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{success}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-light-primary block mb-1">
              Email Address / Username
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 font-body"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-light-primary">Password</label>
              <span className="text-[10px] text-light-on-surface-variant font-mono">
                Key: <strong className="text-secondary">{password || 'Demo@12345'}</strong>
              </span>
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
          {(role === 'doctor' || email.toLowerCase().includes('doctor') || email.toLowerCase().startsWith('dr.')) && (
            <div className="p-3 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl space-y-1 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-amber-600">badge</span>
                  Doctor Security Clearance PIN
                </label>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  Doctor PIN: 7788
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
            className="w-full py-2.5 bg-accent hover:brightness-95 text-on-accent font-headline font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-on-accent border-t-transparent rounded-full animate-spin"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In as {email}</span>
                <span className="material-symbols-outlined text-sm">login</span>
              </>
            )}
          </button>
        </form>

        {/* Real Demo Accounts Directory (Stored in Firebase Database) */}
        <div className="pt-3 border-t border-light-outline space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-light-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-secondary">database</span>
              Firebase Database Accounts (1-Click Fill)
            </span>
            <div className="flex bg-light-surface-variant rounded-lg p-0.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setDemoCategory('admin')}
                className={`px-2 py-1 rounded transition-all ${
                  demoCategory === 'admin' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant'
                }`}
              >
                🏢 Admin (2)
              </button>
              <button
                type="button"
                onClick={() => setDemoCategory('doctors')}
                className={`px-2 py-1 rounded transition-all ${
                  demoCategory === 'doctors' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant'
                }`}
              >
                🩺 Doctors (4)
              </button>
              <button
                type="button"
                onClick={() => setDemoCategory('patients')}
                className={`px-2 py-1 rounded transition-all ${
                  demoCategory === 'patients' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant'
                }`}
              >
                👤 Patients (4)
              </button>
              <button
                type="button"
                onClick={() => setDemoCategory('staff')}
                className={`px-2 py-1 rounded transition-all ${
                  demoCategory === 'staff' ? 'bg-white shadow text-secondary' : 'text-light-on-surface-variant'
                }`}
              >
                🏥 Staff (3)
              </button>
            </div>
          </div>

          {/* ADMINS */}
          {demoCategory === 'admin' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn text-[11px]">
              {adminList.map((adm) => {
                const isSelected = email.toLowerCase() === adm.email.toLowerCase();
                return (
                  <button
                    key={adm.id}
                    type="button"
                    onClick={() => handleSelectDemoUser(adm.email, 'admin', adm.password)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-secondary/15 border-secondary ring-2 ring-secondary/30'
                        : 'border-light-outline hover:bg-light-surface-variant/60'
                    }`}
                  >
                    <div className="font-bold text-light-primary truncate">{adm.name}</div>
                    <div className="text-[10px] text-secondary font-mono">{adm.email}</div>
                    <div className="text-[10px] text-light-on-surface-variant font-mono mt-0.5">
                      Password: <strong>{adm.password}</strong>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* DOCTORS */}
          {demoCategory === 'doctors' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn text-[11px]">
              {doctorsList.map((doc) => {
                const isSelected = email.toLowerCase() === doc.email.toLowerCase();
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelectDemoUser(doc.email, 'doctor', doc.password)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-light-outline hover:bg-light-surface-variant/60'
                    }`}
                  >
                    <div className="font-bold text-light-primary truncate">{doc.name}</div>
                    <div className="text-[10px] text-secondary font-semibold">{doc.department}</div>
                    <div className="text-[10px] text-light-on-surface-variant font-mono">{doc.email}</div>
                    <div className="text-[10px] text-light-on-surface-variant font-mono mt-0.5 flex items-center justify-between">
                      <span>Pass: <strong>{doc.password}</strong></span>
                      <span className="text-[9px] text-amber-700 font-bold bg-amber-50 px-1 rounded border border-amber-200">
                        PIN: 7788
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* PATIENTS */}
          {demoCategory === 'patients' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn text-[11px]">
              {patientsList.map((pat) => {
                const isSelected = email.toLowerCase() === pat.email.toLowerCase();
                return (
                  <button
                    key={pat.id}
                    type="button"
                    onClick={() => handleSelectDemoUser(pat.email, 'patient', pat.password)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-secondary/10 border-secondary ring-2 ring-secondary/30'
                        : 'border-light-outline hover:bg-light-surface-variant/60'
                    }`}
                  >
                    <div className="font-bold text-light-primary truncate">{pat.name}</div>
                    <div className="text-[10px] text-light-on-surface-variant font-mono">{pat.email}</div>
                    <div className="text-[10px] text-light-on-surface-variant font-mono mt-0.5">
                      Password: <strong>{pat.password}</strong>
                    </div>
                    <div className="text-[9px] text-emerald-700 font-medium truncate mt-0.5">
                      ABHA: {pat.abhaId}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* STAFF */}
          {demoCategory === 'staff' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 animate-fadeIn text-[11px]">
              {staffList.map((st) => {
                const isSelected = email.toLowerCase() === st.email.toLowerCase();
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectDemoUser(st.email, st.role, st.password)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-secondary/10 border-secondary ring-2 ring-secondary/30'
                        : 'border-light-outline hover:bg-light-surface-variant/60'
                    }`}
                  >
                    <div className="font-bold text-light-primary truncate">{st.name}</div>
                    <div className="text-[10px] text-secondary font-mono">{st.email}</div>
                    <div className="text-[10px] text-light-on-surface-variant font-mono mt-0.5">
                      Password: <strong>{st.password}</strong>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

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

export default LoginPage;

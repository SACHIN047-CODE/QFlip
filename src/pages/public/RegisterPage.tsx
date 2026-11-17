import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Harmanpreet Kaur',
    phone: '9812401824',
    email: 'harman.kaur@gmail.com',
    abhaId: '91-8841-2091-7762',
    role: 'patient' as const,
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        abhaId: formData.abhaId,
        role: formData.role,
      });
      setSuccess('ABHA Patient Account verified and created! Redirecting to Patient Portal...');
      setTimeout(() => navigate('/patient/dashboard'), 800);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-light-surface-variant/30">
      <div className="max-w-md w-full bg-light-surface rounded-2xl border border-light-outline p-8 shadow-xl space-y-6">
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
            Patient Portal Registration
          </h2>
          <p className="text-xs text-light-on-surface-variant mt-1">
            Link your Ayushman Bharat Health Account (ABHA) for instant digital OPD slips
          </p>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-light-primary block mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">Mobile (10 Digits)</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-code focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">ABHA Address (Optional)</label>
              <input
                type="text"
                placeholder="91-XXXX-XXXX-XXXX"
                value={formData.abhaId}
                onChange={(e) => setFormData({ ...formData, abhaId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-code focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-light-primary block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">Create Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent hover:brightness-95 text-on-accent font-headline font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-on-accent border-t-transparent rounded-full animate-spin"></span>
                <span>Creating ABHA Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-light-outline text-center text-xs text-light-on-surface-variant">
          Already registered?{' '}
          <Link to="/login" className="text-secondary font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-light-surface-variant/30">
      <div className="max-w-md w-full bg-light-surface rounded-2xl border border-light-outline p-8 shadow-xl space-y-6">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-secondary mb-2">lock_reset</span>
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            Reset Portal Access Password
          </h2>
          <p className="text-xs text-light-on-surface-variant mt-1">
            Enter your registered official email or mobile to receive an OTP verification link
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-success/10 border border-success/30 rounded-xl text-center space-y-3">
            <span className="material-symbols-outlined text-3xl text-success">mark_email_read</span>
            <div className="text-xs font-bold text-success">Reset instructions sent!</div>
            <p className="text-[11px] text-light-on-surface-variant">
              Please check your inbox or registered SMS on your phone.
            </p>
            <Link
              to="/login"
              className="inline-block px-4 py-2 bg-light-primary text-white text-xs font-bold rounded-lg"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-light-primary block mb-1">Official Email or ABHA ID</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@careflow.gov.in"
                className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-accent text-on-accent font-bold rounded-lg hover:brightness-95 transition-all shadow-sm"
            >
              Send Password Reset OTP
            </button>
            <div className="text-center">
              <Link to="/login" className="text-xs text-secondary font-semibold hover:underline">
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

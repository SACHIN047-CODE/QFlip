import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { VoiceInputModal } from './VoiceInputModal';

interface NavbarProps {
  mode?: 'public' | 'patient' | 'dashboard';
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mode = 'public', onMenuToggle }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleHospitalCommandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Top Utility Bar (inspired by Wavenet designs) */}
      <aside className="border-b border-light-outline/70 bg-light-surface-variant/40 py-2 px-6 sm:px-12 text-xs text-light-on-surface-variant hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-sm text-secondary">support_agent</span>
              Emergency Helplines: <strong>108 / 102</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-success">verified</span>
              National Health Mission &amp; Ayushman Bharat ABHA Enabled
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-code text-light-primary font-semibold">Toll Free: 1800 180 2026</span>
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="hover:text-secondary flex items-center gap-1 transition-colors text-secondary font-bold"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              Voice OPD (बोलकर पर्ची बनाएं)
            </button>
          </div>
        </div>
      </aside>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-light-surface/95 backdrop-blur-none border-b border-light-outline/80 px-6 sm:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="md:hidden p-2 rounded-lg text-light-primary hover:bg-light-surface-variant"
              >
                <span className="material-symbols-outlined text-xl">menu</span>
              </button>
            )}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
                  <path
                    d="M4 18L10 6L18 28L24 14L30 22"
                    stroke="#2585E8"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <circle cx="30" cy="22" r="3.5" fill="#F2D500"></circle>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-headline-sm font-extrabold tracking-tight text-light-primary leading-none">
                  Q<span className="text-secondary font-medium">Flip</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-light-on-surface-variant font-bold">
                  Health Logistics AI
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links based on mode */}
          {mode === 'public' && (
            <nav className="hidden lg:flex items-center gap-8 text-label-md font-label text-light-on-surface">
              <NavLink
                to="/patient/dashboard"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                Patient Services
              </NavLink>
              <button
                type="button"
                onClick={handleHospitalCommandClick}
                className="hover:text-secondary transition-colors flex items-center gap-1 font-semibold"
              >
                <span>Hospital Command</span>
                <span className="material-symbols-outlined text-xs text-secondary">lock</span>
              </button>
              <NavLink
                to="/ai/dashboard"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-extrabold' : 'text-secondary font-bold hover:brightness-90'
                  }`
                }
              >
                AI &amp; Digital Twin
              </NavLink>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                Feedback &amp; Grievance
              </NavLink>
            </nav>
          )}

          {mode === 'patient' && (
            <nav className="hidden md:flex items-center gap-6 text-label-md font-label text-light-on-surface">
              <NavLink
                to="/patient/dashboard"
                end
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                My Dashboard
              </NavLink>
              <NavLink
                to="/patient/queue"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                Smart Queue Tracker
              </NavLink>
              <NavLink
                to="/patient/registration"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                Book / Register
              </NavLink>
              <NavLink
                to="/patient/prescriptions"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                Prescriptions
              </NavLink>
              <NavLink
                to="/patient/lab-tests"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                Lab Tests
              </NavLink>
              <NavLink
                to="/patient/pharmacy"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                Pharmacy Orders
              </NavLink>
            </nav>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Voice Input Quick Button */}
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>Voice OPD</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="w-9 h-9 rounded-lg border border-light-outline bg-light-surface hover:bg-light-surface-variant flex items-center justify-center text-light-primary transition-colors relative"
              >
                <span className="material-symbols-outlined text-lg">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-light-surface rounded-2xl border border-light-outline shadow-2xl z-50 p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-light-outline">
                    <span className="font-headline text-sm font-bold text-light-primary">Live Hospital Alerts</span>
                    <span className="text-[11px] font-semibold text-secondary">{unreadCount} unread</span>
                  </div>
                  <div className="divide-y divide-light-outline-variant max-h-72 overflow-y-auto my-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markAsRead(n.id);
                          if (n.actionUrl) navigate(n.actionUrl);
                          setIsNotifOpen(false);
                        }}
                        className={`p-3 text-xs hover:bg-light-surface-variant cursor-pointer rounded-lg transition-colors ${
                          !n.read ? 'bg-secondary/5 font-medium' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-light-primary font-bold">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-light-on-surface-variant font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-light-on-surface-variant text-[11px] mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-light-outline text-center">
                    <Link
                      to="/patient/notifications"
                      onClick={() => setIsNotifOpen(false)}
                      className="text-xs text-secondary font-bold hover:underline"
                    >
                      View All Alerts &amp; SMS History
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Session / Authentication Controls */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-light-primary leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-secondary">
                    {user.role} • {user.id}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 hover:bg-danger/20 text-danger text-xs font-bold rounded-lg border border-danger/30 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 bg-light-primary hover:bg-slate-800 text-white font-label text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Portal Login</span>
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center gap-1.5 border border-light-outline hover:bg-light-surface-variant text-light-primary font-label text-xs font-bold px-3 py-2 rounded-lg transition-all"
                >
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onComplete={(transcript, dept, symptoms) => {
          navigate('/patient/registration', {
            state: { voiceTranscript: transcript, suggestedDepartment: dept, symptoms },
          });
        }}
      />
    </>
  );
};

import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { VoiceInputModal } from './VoiceInputModal';
import { HospitalMapModal } from './HospitalMapModal';

interface NavbarProps {
  mode?: 'public' | 'patient' | 'dashboard';
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mode = 'public', onMenuToggle }) => {
  const { user, role, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleHospitalCommandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileNavOpen(false);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Top Utility Bar (Clean Clinical Header) */}
      <aside className="border-b border-slate-200/70 bg-white/60 backdrop-blur-sm py-2 px-6 sm:px-12 text-xs text-slate-500 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-sm text-[#0F766E]">support_agent</span>
              Emergency Helplines:{' '}
              <a href="tel:108" className="font-bold text-[#DC2626] hover:underline">
                108
              </a>
              {' '}/{' '}
              <a href="tel:102" className="font-bold text-[#DC2626] hover:underline">
                102
              </a>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="material-symbols-outlined text-sm text-[#16A34A]">verified</span>
              National Health Mission &amp; Ayushman Bharat ABHA Enabled
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-slate-700 font-semibold">
              Toll Free:{' '}
              <a href="tel:18001802026" className="text-[#0F766E] hover:underline">
                1800 180 2026
              </a>
            </span>
            <button
              onClick={() => setIsMapOpen(true)}
              className="hover:text-[#0F766E] flex items-center gap-1 transition-colors text-slate-600"
            >
              <span className="material-symbols-outlined text-sm text-[#0F766E]">map</span>
              Hospital Map
            </button>
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all font-semibold"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              Voice OPD (बोलकर पर्ची बनाएं)
            </button>
          </div>
        </div>
      </aside>

      {/* Main Navigation Bar — Glass Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-12 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {onMenuToggle ? (
              <button
                type="button"
                onClick={onMenuToggle}
                aria-label="Open sidebar menu"
                className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
              >
                <span className="material-symbols-outlined text-xl">menu</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileNavOpen}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
              >
                <span className="material-symbols-outlined text-xl">
                  {isMobileNavOpen ? 'close' : 'menu'}
                </span>
              </button>
            )}
            <Link
              to="/"
              onClick={() => setIsMobileNavOpen(false)}
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 rounded-xl p-1"
              aria-label="CAREFLOW Healthcare Homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:bg-[#115E59] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                  CARE<span className="text-[#0F766E]">FLOW</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  QFlip Health OS
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links based on mode */}
          {mode === 'public' && (
            <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-600">
              <NavLink
                to="/patient/dashboard"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                Patient Services
              </NavLink>
              <button
                type="button"
                onClick={handleHospitalCommandClick}
                className="px-3 py-1.5 rounded-lg hover:text-[#0F766E] hover:bg-slate-50 transition-all flex items-center gap-1"
              >
                <span>Hospital Command</span>
                <span className="material-symbols-outlined text-xs text-slate-400">lock</span>
              </button>
              <NavLink
                to="/ai/dashboard"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#7C3AED]/10 text-[#7C3AED] font-semibold' : 'text-[#7C3AED] hover:bg-[#7C3AED]/5 font-semibold'
                  }`
                }
              >
                AI &amp; Digital Twin
              </NavLink>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                Feedback &amp; Grievance
              </NavLink>
            </nav>
          )}

          {mode === 'patient' && (
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
              <NavLink
                to="/patient/dashboard"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                My Dashboard
              </NavLink>
              <NavLink
                to="/patient/queue"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                Smart Queue Tracker
              </NavLink>
              <NavLink
                to="/patient/registration"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                Book / Register
              </NavLink>
              <NavLink
                to="/patient/prescriptions"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                Prescriptions
              </NavLink>
              <NavLink
                to="/patient/lab-tests"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                Lab Tests
              </NavLink>
              <NavLink
                to="/patient/pharmacy"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#0F766E]/20 bg-[#E6F4F1] hover:bg-[#0F766E] hover:text-white text-[#0F766E] text-xs font-semibold transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>Voice OPD</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white/80 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors relative"
              >
                <span className="material-symbols-outlined text-lg">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl z-50 p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-900">Live Hospital Alerts</span>
                    <span className="text-[11px] font-semibold text-[#0F766E]">{unreadCount} unread</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markAsRead(n.id);
                          if (n.actionUrl) navigate(n.actionUrl);
                          setIsNotifOpen(false);
                        }}
                        className={`p-3 text-xs hover:bg-slate-50 cursor-pointer rounded-xl transition-colors ${
                          !n.read ? 'bg-[#E6F4F1]/40 font-medium' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-slate-900 font-bold">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/patient/notifications"
                      onClick={() => setIsNotifOpen(false)}
                      className="text-xs text-[#0F766E] font-bold hover:underline"
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
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#0F766E]">
                    {user.role} • {user.id}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#DC2626]/10 hover:bg-[#DC2626]/20 text-[#DC2626] text-xs font-semibold rounded-xl border border-[#DC2626]/20 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Portal Login</span>
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center gap-1.5 border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
                >
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Menu */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur-md shadow-2xl h-full flex flex-col border-r border-slate-200 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0F766E] flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-base font-extrabold text-slate-900">
                  CARE<span className="text-[#0F766E]">FLOW</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Close navigation drawer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* User Session Banner (if logged in) */}
            {user && (
              <div className="p-4 border-b border-slate-200 bg-[#E6F4F1]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="text-[10px] uppercase font-bold text-[#0F766E]">
                    {user.role} • {user.id}
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileNavOpen(false);
                    navigate('/login');
                  }}
                  className="px-2.5 py-1 text-xs font-bold text-[#DC2626] bg-[#DC2626]/10 hover:bg-[#DC2626]/20 rounded-md border border-[#DC2626]/20"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Drawer Navigation Links */}
            <div className="p-4 flex-grow space-y-1 text-sm font-semibold text-slate-700">
              <NavLink
                to="/"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-bold' : 'hover:bg-slate-50'
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg text-[#0F766E]">home</span>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/patient/dashboard"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-bold' : 'hover:bg-slate-50'
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg text-[#0F766E]">person</span>
                <span>Patient Portal &amp; OPD Slip</span>
              </NavLink>

              <NavLink
                to="/patient/queue"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-bold' : 'hover:bg-slate-50'
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg text-[#0F766E]">pin</span>
                <span>Smart Queue Tracker</span>
              </NavLink>

              <NavLink
                to="/patient/prescriptions"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-bold' : 'hover:bg-slate-50'
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg text-[#0F766E]">prescriptions</span>
                <span>Digital Prescriptions</span>
              </NavLink>

              <NavLink
                to="/patient/lab-tests"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-bold' : 'hover:bg-slate-50'
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg text-[#0F766E]">biotech</span>
                <span>Laboratory Reports</span>
              </NavLink>

              <NavLink
                to="/ai/dashboard"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-[#7C3AED]/10 text-[#7C3AED] font-bold' : 'hover:bg-slate-50 text-[#7C3AED]'
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg">psychology</span>
                <span>AI &amp; Digital Twin</span>
              </NavLink>

              <button
                type="button"
                onClick={handleHospitalCommandClick}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg text-[#0F766E]">corporate_fare</span>
                  <span>Hospital Command</span>
                </div>
                <span className="material-symbols-outlined text-xs text-slate-400">lock</span>
              </button>

              <NavLink
                to="/feedback"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-bold' : 'hover:bg-slate-50'
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg text-[#0F766E]">rate_review</span>
                <span>Feedback &amp; Grievance</span>
              </NavLink>

              <div className="pt-3 pb-1 border-t border-slate-200 my-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                  Legal &amp; Policy
                </span>
                <NavLink
                  to="/privacy"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-3 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">security</span>
                  <span>Privacy Policy</span>
                </NavLink>
                <NavLink
                  to="/terms"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-3 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">gavel</span>
                  <span>Terms and Conditions</span>
                </NavLink>
              </div>
            </div>

            {/* Quick Interactive Actions */}
            <div className="p-4 border-t border-slate-200 space-y-2 bg-slate-50/50">
              <button
                type="button"
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsVoiceOpen(true);
                }}
                className="w-full py-2.5 px-3 bg-[#E6F4F1] hover:bg-[#0F766E] hover:text-white text-[#0F766E] border border-[#0F766E]/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-sm">mic</span>
                <span>Voice OPD (बोलकर पर्ची बनाएं)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsMapOpen(true);
                }}
                className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-[#0F766E]">map</span>
                <span>Hospital Indoor Map</span>
              </button>

              {!user && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="py-2.5 px-3 text-center bg-[#0F766E] hover:bg-[#115E59] text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Portal Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="py-2.5 px-3 text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Helplines inside drawer */}
              <div className="pt-3 border-t border-slate-200 text-center space-y-1">
                <div className="text-[11px] text-slate-500">
                  Emergency Ambulance:{' '}
                  <a href="tel:108" className="font-bold text-[#DC2626] hover:underline">
                    108
                  </a>
                </div>
                <div className="text-[11px] text-slate-500">
                  National Health Toll-Free:{' '}
                  <a href="tel:18001802026" className="font-bold text-[#0F766E] hover:underline">
                    1800 180 2026
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Hospital Interactive Navigation Modal */}
      <HospitalMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </>
  );
};

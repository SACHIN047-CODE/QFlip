import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { VoiceInputModal } from './VoiceInputModal';
import { VoiceChatAssistantModal } from '../assistant/VoiceChatAssistantModal';

interface NavbarProps {
  mode?: 'public' | 'patient' | 'dashboard';
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mode = 'public', onMenuToggle }) => {
  const { user, role, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
      {/* Top Utility & Emergency Helpline Bar */}
      <aside className="border-b border-light-outline/70 bg-light-surface-variant/60 py-1.5 px-3 sm:px-6 lg:px-12 text-xs text-light-on-surface-variant">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          {/* Emergency Helpline Numbers */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="flex items-center gap-1 font-bold text-light-primary">
              <span className="material-symbols-outlined text-sm text-danger animate-pulse">sos</span>
              <span className="hidden sm:inline">{t('emergency.title', 'Emergency Helplines')}:</span>
            </span>

            {/* 112: Main Emergency Helpline (Highest Visual Priority) */}
            <a
              href="tel:112"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-danger text-white font-bold font-code text-xs shadow-sm hover:bg-danger/90 active:scale-95 transition-all border border-danger/30"
              title="Click to Call 112 National Emergency Helpline"
            >
              <span className="material-symbols-outlined text-xs">emergency</span>
              <span>112</span>
              <span className="text-[10px] uppercase font-semibold hidden md:inline ml-0.5">
                (Main Emergency)
              </span>
            </a>

            {/* 108: Ambulance Emergency Service */}
            <a
              href="tel:108"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold font-code text-xs hover:bg-amber-500/25 active:scale-95 transition-colors border border-amber-500/30"
              title="Click to Call 108 Ambulance Emergency Service"
            >
              <span className="material-symbols-outlined text-xs text-amber-600">ambulance</span>
              <span>108</span>
              <span className="text-[10px] text-light-on-surface-variant hidden lg:inline">
                (Ambulance)
              </span>
            </a>

            {/* 102: Ambulance Service */}
            <a
              href="tel:102"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/15 text-secondary font-bold font-code text-xs hover:bg-secondary/25 active:scale-95 transition-colors border border-secondary/30"
              title="Click to Call 102 Maternal & Child Ambulance Service"
            >
              <span className="material-symbols-outlined text-xs">local_hospital</span>
              <span>102</span>
              <span className="text-[10px] text-light-on-surface-variant hidden lg:inline">
                (Ambulance)
              </span>
            </a>
          </div>

          {/* Right Utilities: Map, Voice, and One-Click Multi-Language Conversion */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            <button
              onClick={() => setIsMapOpen(true)}
              className="hover:text-secondary flex items-center gap-1 transition-colors text-light-primary font-medium"
            >
            </button>

            <button
              onClick={() => setIsVoiceOpen(true)}
              className="hover:text-secondary flex items-center gap-1 transition-colors text-secondary font-bold"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span className="hidden md:inline">{t('nav.voice_opd_sub', 'Voice OPD (बोलकर पर्ची बनाएं)')}</span>
              <span className="md:hidden">Voice OPD</span>
            </button>

            {/* Language Selector in Top Utility Bar */}
            <LanguageSelector variant="compact" />
          </div>
        </div>
      </aside>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-light-surface/95 backdrop-blur-none border-b border-light-outline/80 px-4 sm:px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onMenuToggle) {
                  onMenuToggle();
                } else {
                  setIsMobileNavOpen(!isMobileNavOpen);
                }
              }}
              className="md:hidden p-2 rounded-lg text-light-primary hover:bg-light-surface-variant"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined text-xl">
                {isMobileNavOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
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
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-headline-sm font-extrabold tracking-tight text-light-primary leading-none">
                  Q<span className="text-secondary font-medium">Flip</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-light-on-surface-variant font-bold">
                  Health Logistics
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links based on mode */}
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
                {t('nav.patient_services', 'Patient Services')}
              </NavLink>
              <button
                type="button"
                onClick={handleHospitalCommandClick}
                className="hover:text-secondary transition-colors flex items-center gap-1 font-semibold"
              >
                <span>{t('nav.hospital_command', 'Hospital Command')}</span>
                <span className="material-symbols-outlined text-xs text-secondary">lock</span>
              </button>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'hover:text-secondary'
                  }`
                }
              >
                {t('nav.feedback', 'Feedback & Grievance')}
              </NavLink>
            </nav>
          )}

          {mode === 'patient' && (
            <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600">
              <NavLink
                to="/patient/dashboard"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.dashboard', 'Dashboard')}
              </NavLink>
              <NavLink
                to="/patient/queue"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.queue', 'Smart Queue Tracker')}
              </NavLink>
              <NavLink
                to="/patient/registration"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.book_opd', 'Book OPD')}
              </NavLink>
              <NavLink
                to="/patient/prescriptions"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.prescriptions', 'Prescriptions')}
              </NavLink>
              <NavLink
                to="/patient/lab-tests"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.lab_tests', 'Lab Tests')}
              </NavLink>
              <NavLink
                to="/patient/pharmacy"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.pharmacy', 'Pharmacy')}
              </NavLink>
              <NavLink
                to="/patient/medical-history"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-[#E6F4F1] text-[#0F766E] font-semibold' : 'hover:text-[#0F766E] hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.medical_history', 'Medical Records')}
              </NavLink>
            </nav>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Voice Input Quick Button */}
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span className="hidden sm:inline">{t('nav.voice_opd', 'Voice OPD')}</span>
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
                {mode !== 'patient' && user.role !== 'patient' && (
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-bold text-light-primary leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-secondary">
                      {user.role} • {user.id}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 hover:bg-danger/20 text-danger text-xs font-bold rounded-lg border border-danger/30 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span className="hidden sm:inline">{t('nav.logout', 'Logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 bg-light-primary hover:bg-slate-800 text-white font-label text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>{t('nav.login', 'Portal Login')}</span>
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center gap-1.5 border border-light-outline hover:bg-light-surface-variant text-light-primary font-label text-xs font-bold px-3 py-2 rounded-lg transition-all"
                >
                  <span>{t('nav.register', 'Register')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {isMobileNavOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Language
              </span>
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-3 py-1 rounded bg-[#0F766E]/10 border border-[#0F766E]/30 text-[#0F766E] text-xs font-bold"
              >
                {language === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}
              </button>
            </div>

            {mode === 'patient' ? (
              <>
                <NavLink
                  to="/patient/dashboard"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/patient/queue"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Smart Queue Tracker
                </NavLink>
                <NavLink
                  to="/patient/registration"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Book OPD
                </NavLink>
                <NavLink
                  to="/patient/prescriptions"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Prescriptions
                </NavLink>
                <NavLink
                  to="/patient/lab-tests"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Lab Tests
                </NavLink>
                <NavLink
                  to="/patient/pharmacy"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Pharmacy
                </NavLink>
                <NavLink
                  to="/patient/medical-history"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Medical Records
                </NavLink>
                <NavLink
                  to="/feedback"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Feedback &amp; Grievance
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/patient/dashboard"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {t('nav.patient_services', 'Patient Services')}
                </NavLink>
                <button
                  onClick={(e) => {
                    setIsMobileNavOpen(false);
                    handleHospitalCommandClick(e);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {t('nav.hospital_command', 'Hospital Command')}
                </button>
                <NavLink
                  to="/feedback"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {t('nav.feedback', 'Feedback & Grievance')}
                </NavLink>
              </>
            )}

            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                setIsMapOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#0F766E] hover:bg-slate-100 flex items-center gap-1.5"
            >
            </button>
          </div>
        )}
      </header>

      {/* Voice and Chat OPD Assistant Modal */}
      <VoiceChatAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </>
  );
};

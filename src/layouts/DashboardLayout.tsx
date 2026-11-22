import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useLanguage, FULL_PAGE_TRANSLATIONS } from '../context/LanguageContext';
import { HospitalMapModal } from '../components/common/HospitalMapModal';
import { VoiceInputModal } from '../components/common/VoiceInputModal';

interface DashboardLayoutProps {
  title?: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, subtitle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('qflip_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebarCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('qflip_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const { user, role, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <div className="bg-light-bg text-light-on-surface font-body min-h-screen flex antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-light-primary/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative z-10 w-64 bg-light-surface shadow-2xl h-full flex flex-col">
            <Sidebar
              isCollapsed={false}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="bg-light-surface border-b border-light-outline px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-light-primary hover:bg-light-surface-variant"
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
            <div>
              <div className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
                <span>{language === 'hi' && title && FULL_PAGE_TRANSLATIONS[title] ? FULL_PAGE_TRANSLATIONS[title] : (title || 'Operations Management')}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20 uppercase">
                  {language === 'hi' && FULL_PAGE_TRANSLATIONS[role] ? FULL_PAGE_TRANSLATIONS[role] : role}
                </span>
              </div>
              <div className="text-xs text-light-on-surface-variant hidden sm:block">
                {language === 'hi' && subtitle && FULL_PAGE_TRANSLATIONS[subtitle] ? FULL_PAGE_TRANSLATIONS[subtitle] : (subtitle || 'Civil Hospital Ambala • Integrated Clinical Health Stream')}
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-light-outline bg-light-surface hover:bg-light-surface-variant text-light-primary text-xs font-bold transition-all shadow-sm"
              title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              <span className="material-symbols-outlined text-sm text-secondary">translate</span>
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            <button
              onClick={() => setMapOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light-outline text-xs font-semibold text-light-primary hover:bg-light-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-secondary">map</span>
              <span>Hospital Map</span>
            </button>

            <button
              onClick={() => setVoiceOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>Voice Triage</span>
            </button>

            <Link
              to="/patient/dashboard"
              className="text-xs font-semibold text-light-primary hover:text-secondary hidden sm:inline-block px-2"
            >
              Patient View
            </Link>

            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-lg border border-light-outline text-light-on-surface-variant hover:text-danger hover:border-danger/40 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>

      <HospitalMapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
      <VoiceInputModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onComplete={(transcript, dept) => alert(`Voice triage received for ${dept}: "${transcript}"`)}
      />
    </div>
  );
};

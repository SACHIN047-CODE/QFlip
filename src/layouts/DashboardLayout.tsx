import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { HospitalMapModal } from '../components/common/HospitalMapModal';
import { VoiceInputModal } from '../components/common/VoiceInputModal';
import { PageSkeleton } from '../components/common/LoadingSkeleton';

interface DashboardLayoutProps {
  title?: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, subtitle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timeout = window.setTimeout(() => setRouteLoading(false), 260);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex antialiased">
      {/* Desktop Fixed 250px Sidebar */}
      <div className="hidden md:block w-[250px] min-w-[250px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative z-10 w-[250px] glass-sidebar shadow-xl h-full flex flex-col">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="glass-header px-5 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{title || 'Operations Management'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20 uppercase">
                  {role}
                </span>
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                {subtitle || 'Civil Hospital Ambala • Integrated Clinical Health Stream'}
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMapOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-[#0F766E]">map</span>
              <span>Hospital Map</span>
            </button>

            <button
              onClick={() => setVoiceOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0F766E]/30 bg-[#E6F4F1] text-[#0F766E] text-xs font-semibold hover:bg-[#CCFBF1] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>Voice Triage</span>
            </button>

            <Link
              to="/patient/dashboard"
              className="text-xs font-semibold text-slate-600 hover:text-[#0F766E] hidden sm:inline-block px-2"
            >
              Patient Portal &rarr;
            </Link>

            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {routeLoading ? <PageSkeleton /> : <Outlet />}
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

import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { useQueue } from '../context/QueueContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { PageSkeleton } from '../components/common/LoadingSkeleton';

export const PatientLayout: React.FC = () => {
  const { user } = useAuth();
  const { myToken } = useQueue();
  const { t } = useLanguage();
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timeout = window.setTimeout(() => setRouteLoading(false), 260);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex flex-col selection:bg-[#E6F4F1] selection:text-[#0F766E]">
      {/* Single Unified Navbar for Patient Section */}
      <Navbar mode="patient" />

      {/* Compact Patient Clinical Profile & Active Token Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Patient Details */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center font-bold text-xs flex-shrink-0">
              {user?.name?.slice(0, 2).toUpperCase() || 'PT'}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-900">
                {t('patient.welcome', 'Welcome')}, {user?.name || 'Patient'}
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {t('patient.patient_id', 'ID')}: {user?.id || 'PT-10088'}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                • {t('patient.abha_id', 'ABHA')}: <strong className="font-mono text-slate-700">{user?.abhaId || '91-8274-1049-9812'}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active Token Notification Chip (Only when patient has a live token) */}
            {myToken && (
              <Link
                to="/patient/queue"
                className="inline-flex items-center gap-2.5 bg-[#E6F4F1] hover:bg-[#CCFBF1] border border-[#0F766E]/30 py-1.5 px-3 rounded-xl transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                <span className="text-[11px] font-semibold text-slate-700">{t('patient.active_token', 'Active Token')}:</span>
                <span className="text-xs font-black text-[#0F766E] font-mono">
                  {myToken.tokenNumber}
                </span>
                <span className="text-[10px] text-slate-500 pl-1 border-l border-[#0F766E]/20">
                  {t('patient.est_wait', 'Est. wait')}: <strong className="font-mono text-[#0F766E]">{myToken.estimatedWaitMinutes}m</strong>
                </span>
                <span className="material-symbols-outlined text-xs text-[#0F766E]">arrow_forward</span>
              </Link>
            )}

            {/* Quick Language Switcher */}
            <LanguageSelector variant="compact" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {routeLoading ? <PageSkeleton variant="content" /> : <Outlet />}
      </main>
    </div>
  );
};

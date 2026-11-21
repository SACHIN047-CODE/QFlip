import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { useQueue } from '../context/QueueContext';
import { PageSkeleton } from '../components/common/LoadingSkeleton';

export const PatientLayout: React.FC = () => {
  const { user } = useAuth();
  const { myToken } = useQueue();
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timeout = window.setTimeout(() => setRouteLoading(false), 260);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  const isDashboardActive = location.pathname === '/patient' || location.pathname === '/patient/dashboard';

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex flex-col selection:bg-[#E6F4F1] selection:text-[#0F766E]">
      <Navbar mode="patient" />

      {/* Patient Subheader Banner */}
      <div className="glass-surface border-b border-slate-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center font-bold text-sm">
              {user?.name?.slice(0, 2).toUpperCase() || 'PT'}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Welcome, {user?.name || 'Patient'}</span>
                <span className="text-[11px] font-code font-bold px-2 py-0.2 rounded bg-light-surface-variant text-light-on-surface-variant border border-light-outline">
                  {user?.id || 'PT-10088'}
                </span>
              </div>
              <div className="text-xs text-light-on-surface-variant">
                ABHA ID: <strong className="font-code text-light-primary">{user?.abhaId || '91-8274-1049-9812'}</strong>
              </div>
            </div>
          </div>

          {/* Current Live Token Chip */}
          {myToken && (
            <Link
              to="/patient/queue"
              className="inline-flex items-center gap-3 bg-[#E6F4F1] hover:bg-[#CCFBF1] border border-[#0F766E]/30 p-2 px-3.5 rounded-xl transition-all"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0F766E] block">Active OPD Token</span>
                <span className="text-base font-black text-slate-900 font-mono">
                  {myToken.tokenNumber}
                </span>
              </div>
              <div className="pl-3 border-l border-[#0F766E]/20 text-right">
                <span className="text-[10px] text-slate-500 block font-medium">Estimated Wait</span>
                <span className="text-sm font-bold text-[#0F766E] font-mono">
                  {myToken.estimatedWaitMinutes} mins
                </span>
              </div>
              <span className="material-symbols-outlined text-sm text-[#0F766E]">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>

      {/* Patient Sub-navigation Tabs */}
      <div className="glass-surface border-b border-slate-200/80 px-4 sm:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-xs">
          <NavLink
            to="/patient/dashboard"
            className={`py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isDashboardActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/patient/queue"
            className={({ isActive }) =>
              `py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">pin</span>
            <span>Live Token Tracker</span>
          </NavLink>

          <NavLink
            to="/patient/registration"
            className={({ isActive }) =>
              `py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Book / OPD Slip</span>
          </NavLink>

          <NavLink
            to="/patient/prescriptions"
            className={({ isActive }) =>
              `py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">prescriptions</span>
            <span>Prescriptions</span>
          </NavLink>

          <NavLink
            to="/patient/lab-tests"
            className={({ isActive }) =>
              `py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">biotech</span>
            <span>Lab Reports</span>
          </NavLink>

          <NavLink
            to="/patient/pharmacy"
            className={({ isActive }) =>
              `py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">medication</span>
            <span>Medicine Orders</span>
          </NavLink>

          <NavLink
            to="/patient/medical-history"
            className={({ isActive }) =>
              `py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">history</span>
            <span>Health History</span>
          </NavLink>

          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `py-3 px-3.5 border-b-2 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">feedback</span>
            <span>Feedback</span>
          </NavLink>
        </div>
      </div>

      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {routeLoading ? <PageSkeleton variant="content" /> : <Outlet />}
      </main>
    </div>
  );
};

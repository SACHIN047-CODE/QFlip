import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { useQueue } from '../context/QueueContext';

export const PatientLayout: React.FC = () => {
  const { user } = useAuth();
  const { myToken } = useQueue();
  const location = useLocation();

  const isDashboardActive = location.pathname === '/patient' || location.pathname === '/patient/dashboard';

  return (
    <div className="bg-light-bg text-light-on-surface font-body min-h-screen flex flex-col selection:bg-accent selection:text-on-accent">
      <Navbar mode="patient" />

      {/* Patient Subheader Banner */}
      <div className="bg-light-surface border-b border-light-outline px-6 sm:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
              {user?.name?.slice(0, 2).toUpperCase() || 'PT'}
            </div>
            <div>
              <div className="font-headline text-sm font-bold text-light-primary flex items-center gap-2">
                <span>Welcome, {user?.name || 'Patient'}</span>
                {user?.id && (
                  <span className="text-[11px] font-code font-bold px-2 py-0.2 rounded bg-light-surface-variant text-light-on-surface-variant border border-light-outline">
                    {user.id}
                  </span>
                )}
              </div>
              <div className="text-xs text-light-on-surface-variant">
                ABHA ID: <strong className="font-code text-light-primary">{user?.abhaId || 'Not Linked'}</strong>
              </div>
            </div>
          </div>

          {/* Current Live Token Chip */}
          {myToken && (
            <Link
              to="/patient/queue"
              className="inline-flex items-center gap-3 bg-accent/20 hover:bg-accent/30 border border-accent p-2 px-3.5 rounded-xl transition-all"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-on-accent block">Active OPD Token</span>
                <span className="font-headline text-base font-black text-on-accent font-code">
                  {myToken.tokenNumber}
                </span>
              </div>
              <div className="pl-3 border-l border-accent/40 text-right">
                <span className="text-[10px] text-on-accent block font-medium">Estimated Wait</span>
                <span className="font-headline text-sm font-bold text-on-accent font-code">
                  {myToken.estimatedWaitMinutes} mins
                </span>
              </div>
              <span className="material-symbols-outlined text-sm text-on-accent">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>

      {/* Patient Sub-navigation Tabs */}
      <div className="bg-light-surface border-b border-light-outline/70 px-6 sm:px-12 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-xs font-label">
          <NavLink
            to="/patient/dashboard"
            className={`py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              isDashboardActive
                ? 'border-secondary text-secondary'
                : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/patient/queue"
            className={({ isActive }) =>
              `py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">pin</span>
            <span>Live Token Tracker</span>
          </NavLink>

          <NavLink
            to="/patient/registration"
            className={({ isActive }) =>
              `py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Book / OPD Slip</span>
          </NavLink>

          <NavLink
            to="/patient/prescriptions"
            className={({ isActive }) =>
              `py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">prescriptions</span>
            <span>Prescriptions</span>
          </NavLink>

          <NavLink
            to="/patient/lab-tests"
            className={({ isActive }) =>
              `py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">biotech</span>
            <span>Lab Reports</span>
          </NavLink>

          <NavLink
            to="/patient/pharmacy"
            className={({ isActive }) =>
              `py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">medication</span>
            <span>Medicine Orders</span>
          </NavLink>

          <NavLink
            to="/patient/medical-history"
            className={({ isActive }) =>
              `py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">history</span>
            <span>Health History</span>
          </NavLink>

          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-light-on-surface-variant hover:text-light-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-base">feedback</span>
            <span>Feedback</span>
          </NavLink>
        </div>
      </div>

      <main className="flex-grow p-6 sm:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

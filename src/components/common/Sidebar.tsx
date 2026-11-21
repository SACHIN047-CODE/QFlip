import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { user, role, logout } = useAuth();
  const { tokens } = useQueue();
  const navigate = useNavigate();

  const waitingCount = tokens.filter((t) => t.status === 'WAITING').length;

  const renderNavLinks = () => {
    switch (role) {
      case 'doctor':
        return (
          <>
            <NavLink
              to="/doctor/dashboard"
              end
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">clinical_notes</span>
              <span>Live Consultation</span>
            </NavLink>

            <NavLink
              to="/doctor/patients"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">format_list_numbered</span>
                <span>Waiting Queue</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-accent text-on-accent text-xs font-bold font-code">
                {waitingCount}
              </span>
            </NavLink>

            <NavLink
              to="/doctor/prescriptions"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">prescriptions</span>
              <span>Rx Templates</span>
            </NavLink>

            <NavLink
              to="/doctor/schedule"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              <span>Doctor Schedule</span>
            </NavLink>
          </>
        );

      case 'admin':
        return (
          <>
            <NavLink
              to="/admin/dashboard"
              end
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Operations Overview</span>
            </NavLink>

            <NavLink
              to="/admin/departments"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">apartment</span>
              <span>Department Flow</span>
            </NavLink>

            <NavLink
              to="/admin/doctors"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">stethoscope</span>
              <span>Doctor Management</span>
            </NavLink>

            <NavLink
              to="/admin/staff"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">badge</span>
              <span>Staff Management</span>
            </NavLink>

            <NavLink
              to="/admin/resources"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">hotel</span>
              <span>Beds &amp; Stretchers</span>
            </NavLink>

            <NavLink
              to="/ai/dashboard"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-bold shadow-sm'
                    : 'bg-secondary/10 text-secondary font-bold hover:bg-secondary/20'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">psychology</span>
              <span>AI &amp; Digital Twin</span>
            </NavLink>

            <NavLink
              to="/admin/analytics"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">analytics</span>
              <span>Analytics &amp; Graphs</span>
            </NavLink>

            <NavLink
              to="/admin/reports"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">description</span>
              <span>Daily Reports</span>
            </NavLink>

            <NavLink
              to="/admin/complaints"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-light-primary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">confirmation_number</span>
              <span>Support Tickets &amp; Grievances</span>
            </NavLink>
          </>
        );

      case 'staff':
        return (
          <>
            <NavLink
              to="/staff/dashboard"
              end
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">how_to_reg</span>
              <span>Counter Desk</span>
            </NavLink>

            <NavLink
              to="/staff/register-patient"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>Rapid Registration</span>
            </NavLink>

            <NavLink
              to="/staff/patient-search"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">search</span>
              <span>Search &amp; ABHA Lookup</span>
            </NavLink>

            <NavLink
              to="/staff/token-management"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-secondary text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              <span>Token Management</span>
            </NavLink>
          </>
        );

      case 'lab':
        return (
          <>
            <NavLink
              to="/lab/dashboard"
              end
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">biotech</span>
              <span>Lab Overview</span>
            </NavLink>

            <NavLink
              to="/lab/test-requests"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">pending_actions</span>
              <span>Incoming Test Requests</span>
            </NavLink>

            <NavLink
              to="/lab/results"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">task</span>
              <span>Completed Reports</span>
            </NavLink>
          </>
        );

      case 'pharmacy':
        return (
          <>
            <NavLink
              to="/pharmacy/dashboard"
              end
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-success text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">local_pharmacy</span>
              <span>Pharmacy Overview</span>
            </NavLink>

            <NavLink
              to="/pharmacy/orders"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-success text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              <span>Dispensing Orders</span>
            </NavLink>

            <NavLink
              to="/pharmacy/medicines"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md font-label transition-colors ${
                  isActive
                    ? 'bg-success text-white font-semibold shadow-sm'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">inventory_2</span>
              <span>Medicine Stock &amp; Rack</span>
            </NavLink>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <aside className="w-64 bg-light-surface border-r border-light-outline flex-shrink-0 flex flex-col justify-between h-full min-h-screen">
      <div>
        {/* Brand & Doctor/Staff Identity */}
        <div className="p-6 border-b border-light-outline">
          <Link to="/" className="flex items-center gap-2.5 mb-4 group">
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
            <div className="flex flex-col">
              <span className="font-headline text-headline-sm font-extrabold tracking-tight text-light-primary leading-none">
                Q<span className="text-secondary font-medium">Flip</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-light-on-surface-variant font-bold">
                Civil Hospital Ambala
              </span>
            </div>
          </Link>

          {/* User profile snippet */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border border-light-outline"
            />
            <div className="min-w-0 flex-1">
              <div className="font-headline text-xs font-bold text-light-primary truncate">{user?.name}</div>
              <div className="text-[11px] text-light-on-surface-variant truncate">
                {user?.department || 'Civil Hospital Ambala'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">{renderNavLinks()}</nav>
      </div>

      {/* User Session & Status Footer */}
      <div className="p-4 border-t border-light-outline bg-light-surface-variant/30 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-light-primary">{user?.name}</div>
            <div className="text-[10px] uppercase font-bold text-secondary">
              {user?.id === 'doc-rajesh' || role === 'doctor'
                ? 'Doctor'
                : `${role} • ${user?.id}`}
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="Sign out of hospital session"
            className="p-1.5 rounded-lg border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
          >
            <span className="material-symbols-outlined text-xs">logout</span>
          </button>
        </div>

        <div className="text-[11px] text-light-on-surface-variant">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
            <span className="font-semibold text-light-primary">ABHA NHM Gateway Live</span>
          </div>
          <div>Telemetry sync: 1,840 events/min</div>
        </div>
      </div>
    </aside>
  );
};

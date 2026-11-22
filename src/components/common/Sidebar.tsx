import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import { LanguageSelector } from './LanguageSelector';

interface SidebarProps {
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { user, role, logout } = useAuth();
  const { tokens } = useQueue();
  const navigate = useNavigate();

  const waitingCount = tokens.filter((t) => t.status === 'WAITING').length;

  const NavItem = ({
    to,
    icon,
    label,
    badge,
    end = false,
  }: {
    to: string;
    icon: string;
    label: string;
    badge?: React.ReactNode;
    end?: boolean;
  }) => (
    <div className="relative group">
      <NavLink
        to={to}
        end={end}
        onClick={onCloseMobile}
        className={({ isActive }) =>
          `flex items-center ${
            isCollapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'
          } rounded-xl text-label-md font-label transition-all ${
            isActive
              ? 'bg-secondary text-white font-semibold shadow-sm'
              : 'text-light-on-surface-variant hover:bg-light-surface-variant hover:text-light-primary'
          }`
        }
      >
        <div className="relative flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-xl">{icon}</span>
          {isCollapsed && badge && (
            <span className="absolute -top-1.5 -right-2 px-1 py-0.2 min-w-4 h-4 rounded-full bg-accent text-on-accent text-[9px] font-bold font-code flex items-center justify-center ring-2 ring-white">
              {badge}
            </span>
          )}
        </div>
        {!isCollapsed && <span className="truncate flex-1">{label}</span>}
        {!isCollapsed && badge && <span>{badge}</span>}
      </NavLink>

      {/* Floating Tooltip in Collapsed Mode */}
      {isCollapsed && (
        <div className="hidden group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-50 items-center gap-2 pointer-events-none border border-slate-700">
          <span>{label}</span>
          {badge && (
            <span className="px-1.5 py-0.5 rounded bg-accent text-on-accent text-[10px] font-bold">
              {badge}
            </span>
          )}
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700"></span>
        </div>
      )}
    </div>
  );

  const renderNavLinks = () => {
    switch (role) {
      case 'doctor':
        return (
          <>
            <NavItem
              to="/doctor/dashboard"
              end
              icon="clinical_notes"
              label="Live Consultation"
            />
            <NavItem
              to="/doctor/patients"
              icon="format_list_numbered"
              label="Waiting Queue"
              badge={
                <span className="px-2 py-0.5 rounded-full bg-accent text-on-accent text-xs font-bold font-code">
                  {waitingCount}
                </span>
              }
            />
          </>
        );

      case 'admin':
        return (
          <>
            <NavItem
              to="/admin/dashboard"
              end
              icon="dashboard"
              label="Operations Overview"
            />
            <NavItem
              to="/admin/departments"
              icon="apartment"
              label="Department Flow"
            />
            <NavItem
              to="/admin/doctors"
              icon="stethoscope"
              label="Doctor Management"
            />
            <NavItem
              to="/admin/staff"
              icon="badge"
              label="Staff Management"
            />
            <NavItem
              to="/admin/resources"
              icon="hotel"
              label="Beds & Stretchers"
            />
            <NavItem
              to="/ai/dashboard"
              icon="psychology"
              label="AI & Digital Twin"
            />
            <NavItem
              to="/admin/analytics"
              icon="analytics"
              label="Analytics & Graphs"
            />
            <NavItem
              to="/admin/reports"
              icon="description"
              label="Daily Reports"
            />
            <NavItem
              to="/admin/complaints"
              icon="feedback"
              label="Feedback & Grievances"
            />
          </>
        );

      case 'staff':
        return (
          <>
            <NavItem
              to="/staff/dashboard"
              end
              icon="how_to_reg"
              label="Counter Desk"
            />
            <NavItem
              to="/staff/register-patient"
              icon="person_add"
              label="Rapid Registration"
            />
            <NavItem
              to="/staff/patient-search"
              icon="search"
              label="Search & ABHA Lookup"
            />
            <NavItem
              to="/staff/token-management"
              icon="receipt_long"
              label="Token Management"
            />
          </>
        );

      case 'lab':
        return (
          <>
            <NavItem
              to="/lab/dashboard"
              end
              icon="biotech"
              label="Lab Overview"
            />
            <NavItem
              to="/lab/test-requests"
              icon="pending_actions"
              label="Incoming Test Requests"
            />
            <NavItem
              to="/lab/results"
              icon="task"
              label="Completed Reports"
            />
          </>
        );

      case 'pharmacy':
        return (
          <>
            <NavItem
              to="/pharmacy/dashboard"
              end
              icon="local_pharmacy"
              label="Pharmacy Overview"
            />
            <NavItem
              to="/pharmacy/orders"
              icon="receipt_long"
              label="Dispensing Orders"
            />
            <NavItem
              to="/pharmacy/medicines"
              icon="inventory_2"
              label="Medicine Stock & Rack"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-light-surface border-r border-light-outline flex-shrink-0 flex flex-col justify-between h-full min-h-screen transition-all duration-300 ease-in-out select-none`}
    >
      <div>
        {/* Brand & Doctor/Staff Identity */}
        <div className="p-4 sm:p-5 border-b border-light-outline">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-2.5'} group`}
              title="QFlip - Civil Hospital Ambala"
            >
              <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 flex-shrink-0">
                <path
                  d="M4 18L10 6L18 28L24 14L30 22"
                  stroke="#2585E8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle cx="30" cy="22" r="3.5" fill="#F2D500"></circle>
              </svg>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-headline text-headline-sm font-extrabold tracking-tight text-light-primary leading-none">
                    Q<span className="text-secondary font-medium">Flip</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-light-on-surface-variant font-bold truncate">
                    Civil Hospital Ambala
                  </span>
                </div>
              )}
            </Link>

            {/* Collapse / Expand Toggle Button (Desktop only) */}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="hidden md:flex p-1.5 rounded-lg border border-light-outline text-light-on-surface-variant hover:text-light-primary hover:bg-light-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  {isCollapsed ? 'chevron_right' : 'chevron_left'}
                </span>
              </button>
            )}
          </div>

          {/* User profile snippet */}
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} pt-1`}
            title={`${user?.name || 'Authorized Staff'} (${role})`}
          >
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'
              }
              alt={user?.name || 'User avatar'}
              className="w-10 h-10 rounded-full object-cover border border-light-outline flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="font-headline text-xs font-bold text-light-primary truncate">
                  {user?.name}
                </div>
                <div className="text-[11px] text-light-on-surface-variant truncate">
                  {user?.department || 'Civil Hospital Ambala'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">{renderNavLinks()}</nav>
      </div>

      {/* User Session & Status Footer */}
      <div className="p-3 border-t border-light-outline bg-light-surface-variant/30 space-y-2">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="min-w-0 pr-2">
              <div className="text-xs font-bold text-light-primary truncate">{user?.name}</div>
              <div className="text-[10px] uppercase font-bold text-secondary truncate">
                {role} • {user?.id}
              </div>
            </div>
          )}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="Sign out of hospital session"
            className="p-1.5 rounded-lg border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20 transition-colors flex items-center justify-center flex-shrink-0"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>

        {/* Status indicator */}
        {!isCollapsed ? (
          <div className="text-[11px] text-light-on-surface-variant pt-1 border-t border-light-outline/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
                <span className="font-semibold text-light-primary text-[10px]">
                  ABHA Gateway Live
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Sync: active</span>
            </div>
            <div className="pt-1 flex justify-center">
              <LanguageSelector variant="compact" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center pt-1" title="ABHA Gateway Live">
            <span className="w-2.5 h-2.5 rounded-full bg-success inline-block"></span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

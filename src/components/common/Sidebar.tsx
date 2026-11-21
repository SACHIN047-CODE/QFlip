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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
      isActive
        ? 'nav-active bg-[#E6F4F1] text-[#0F766E] font-semibold shadow-xs'
        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
    }`;

  const renderNavLinks = () => {
    switch (role) {
      case 'doctor':
        return (
          <>
            <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Clinical Workspace
            </div>
            <NavLink to="/doctor/dashboard" end onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">clinical_notes</span>
              <span>Live Consultation</span>
            </NavLink>

            <NavLink to="/doctor/patients" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-3 flex-1">
                <span className="material-symbols-outlined text-lg">format_list_numbered</span>
                <span>Waiting Queue</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#0F766E] text-white text-[11px] font-semibold font-mono">
                {waitingCount}
              </span>
            </NavLink>

            <NavLink to="/doctor/prescriptions" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">prescriptions</span>
              <span>Rx Templates</span>
            </NavLink>

            <NavLink to="/doctor/schedule" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              <span>Doctor Schedule</span>
            </NavLink>
          </>
        );

      case 'admin':
        return (
          <>
            <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Command &amp; Operations
            </div>
            <NavLink to="/admin/dashboard" end onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Operations Overview</span>
            </NavLink>

            <NavLink to="/admin/departments" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">apartment</span>
              <span>Department Flow</span>
            </NavLink>

            <NavLink to="/admin/doctors" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">stethoscope</span>
              <span>Doctor Management</span>
            </NavLink>

            <NavLink to="/admin/staff" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">badge</span>
              <span>Staff Management</span>
            </NavLink>

            <NavLink to="/admin/resources" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">hotel</span>
              <span>Beds &amp; Stretchers</span>
            </NavLink>

            <div className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Intelligence &amp; Reports
            </div>
            <NavLink to="/ai/dashboard" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg text-[#7C3AED]">psychology</span>
              <span className="text-[#7C3AED] font-semibold">AI &amp; Digital Twin</span>
            </NavLink>

            <NavLink to="/admin/analytics" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">analytics</span>
              <span>Analytics &amp; Graphs</span>
            </NavLink>

            <NavLink to="/admin/reports" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">description</span>
              <span>Daily Reports</span>
            </NavLink>

            <NavLink to="/admin/complaints" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">feedback</span>
              <span>Feedback &amp; Grievances</span>
            </NavLink>
          </>
        );

      case 'staff':
        return (
          <>
            <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Front Desk Operations
            </div>
            <NavLink to="/staff/dashboard" end onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">how_to_reg</span>
              <span>Counter Desk</span>
            </NavLink>

            <NavLink to="/staff/register-patient" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>Rapid Registration</span>
            </NavLink>

            <NavLink to="/staff/patient-search" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">search</span>
              <span>Search &amp; ABHA Lookup</span>
            </NavLink>

            <NavLink to="/staff/token-management" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              <span>Token Management</span>
            </NavLink>
          </>
        );

      case 'lab':
        return (
          <>
            <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Laboratory Diagnostics
            </div>
            <NavLink to="/lab/dashboard" end onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">biotech</span>
              <span>Lab Overview</span>
            </NavLink>

            <NavLink to="/lab/test-requests" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">pending_actions</span>
              <span>Incoming Test Requests</span>
            </NavLink>

            <NavLink to="/lab/results" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">task</span>
              <span>Completed Reports</span>
            </NavLink>
          </>
        );

      case 'pharmacy':
        return (
          <>
            <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Jan Aushadhi Pharmacy
            </div>
            <NavLink to="/pharmacy/dashboard" end onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">local_pharmacy</span>
              <span>Pharmacy Overview</span>
            </NavLink>

            <NavLink to="/pharmacy/orders" onClick={onCloseMobile} className={navLinkClass}>
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              <span>Dispensing Orders</span>
            </NavLink>

            <NavLink to="/pharmacy/medicines" onClick={onCloseMobile} className={navLinkClass}>
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
    <aside className="w-[250px] min-w-[250px] glass-sidebar flex-shrink-0 flex flex-col justify-between h-full min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200/70">
          <Link to="/" className="flex items-center gap-2.5 mb-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] flex-shrink-0">
              <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6">
                <path
                  d="M4 18L10 6L18 28L24 14L30 22"
                  stroke="#0F766E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="30" cy="22" r="3.5" fill="#14B8A6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
                CARE<span className="text-[#0F766E]">FLOW</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
                Hospital OS
              </span>
            </div>
          </Link>

          {/* User profile snippet */}
          <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-slate-900 truncate">{user?.name}</div>
              <div className="text-[11px] text-slate-500 truncate capitalize">
                {role} • {user?.department || 'Civil Hospital'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">{renderNavLinks()}</nav>
      </div>

      {/* User Session & Status Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-800">{user?.name}</div>
            <div className="text-[10px] uppercase font-bold text-[#0F766E]">
              {role} • {user?.id}
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="Sign out"
            className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <span className="material-symbols-outlined text-xs">logout</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block flex-shrink-0"></span>
          <span className="truncate">ABHA Gateway Live</span>
        </div>
      </div>
    </aside>
  );
};

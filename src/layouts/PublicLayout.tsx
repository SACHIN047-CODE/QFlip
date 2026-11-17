import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';

export const PublicLayout: React.FC = () => {
  return (
    <div className="bg-light-surface text-light-on-surface font-body min-h-screen flex flex-col selection:bg-accent selection:text-on-accent">
      <Navbar mode="public" />

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Enterprise Footer as designed in Stitch Home */}
      <footer className="bg-light-primary text-white pt-16 pb-12 border-t border-light-outline">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-light-outline/20">
            {/* Col 1: Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
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
                <span className="font-headline text-headline-sm font-extrabold tracking-tight text-white leading-none">
                  care<span className="text-secondary font-medium">flow</span>
                </span>
              </div>
              <p className="text-xs text-light-surface-variant/80 max-w-sm leading-relaxed">
                Empowering public healthcare delivery across Indian Civil, District, and Sub-divisional hospitals.
                Engineered for zero-queue congestion, synchronized OPD workflows, and explainable AI crowd prediction.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 text-xs text-white border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-success"></span> ABHA M2/M3 Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 text-xs text-white border border-white/20">
                  <span className="material-symbols-outlined text-xs text-accent">shield</span> ISO 27001 Compliant
                </span>
              </div>
            </div>

            {/* Col 2: Patient Portals */}
            <div>
              <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-accent mb-4">
                Patient Portals
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <Link to="/patient/dashboard" className="hover:text-accent transition-colors">
                    Patient Live Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/patient/queue" className="hover:text-accent transition-colors">
                    Real-Time Token Tracker
                  </Link>
                </li>
                <li>
                  <Link to="/patient/registration" className="hover:text-accent transition-colors">
                    ABHA Voice OPD Registration
                  </Link>
                </li>
                <li>
                  <Link to="/patient/prescriptions" className="hover:text-accent transition-colors">
                    Digital Prescriptions
                  </Link>
                </li>
                <li>
                  <Link to="/patient/lab-tests" className="hover:text-accent transition-colors">
                    Laboratory Reports
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Hospital Command */}
            <div>
              <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-accent mb-4">
                Hospital Command
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <Link to="/admin/dashboard" className="hover:text-accent transition-colors">
                    Operations Command Center
                  </Link>
                </li>
                <li>
                  <Link to="/doctor/dashboard" className="hover:text-accent transition-colors">
                    Doctor Live OPD Desk
                  </Link>
                </li>
                <li>
                  <Link to="/staff/dashboard" className="hover:text-accent transition-colors">
                    Registration &amp; Triage Desk
                  </Link>
                </li>
                <li>
                  <Link to="/lab/dashboard" className="hover:text-accent transition-colors">
                    Diagnostics &amp; Imaging
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacy/dashboard" className="hover:text-accent transition-colors">
                    Jan Aushadhi Chemist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: AI & Diagnostics */}
            <div>
              <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-accent mb-4">
                AI Logistics
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <Link to="/ai/dashboard" className="hover:text-accent transition-colors">
                    Crowd Surge Forecasting
                  </Link>
                </li>
                <li>
                  <Link to="/ai/digital-twin" className="hover:text-accent transition-colors">
                    Digital Twin OPD Simulator
                  </Link>
                </li>
                <li>
                  <Link to="/ai/queue-optimization" className="hover:text-accent transition-colors">
                    Explainable AI Recommendations
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="hover:text-accent transition-colors">
                    Patient Grievance Redressal
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-accent transition-colors">
                    Staff Authentication
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              &copy; 2026 CareFlow Technologies. Designed for Government Health Clusters &amp; Civil Hospitals.
            </div>
            <div className="flex items-center gap-6">
              <span>National Health Portal Integration</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

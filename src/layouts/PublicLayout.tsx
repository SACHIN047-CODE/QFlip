import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { PageSkeleton } from '../components/common/LoadingSkeleton';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timeout = window.setTimeout(() => setRouteLoading(false), 260);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] font-sans min-h-screen flex flex-col selection:bg-[#E6F4F1] selection:text-[#0F766E]">
      <Navbar mode="public" />

      <main className="flex-grow">
        {routeLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PageSkeleton variant="content" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      {/* Enterprise Footer with Clinical Identity */}
      <footer className="bg-slate-900 text-slate-100 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center text-white shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-white leading-none">
                    CARE<span className="text-[#14B8A6]">FLOW</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                    QFlip Healthcare OS
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Empowering public healthcare delivery across Indian Civil, District, and Sub-divisional hospitals.
                Engineered for zero-queue congestion, synchronized OPD workflows, and explainable AI crowd prediction.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span> ABHA M2/M3 Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/10">
                  <span className="material-symbols-outlined text-xs text-[#14B8A6]">shield</span> ISO 27001 Compliant
                </span>
              </div>
            </div>

            {/* Col 2: Patient Portals */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] mb-4">
                {t('footer.patient_portals', 'Patient Portals')}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link to="/patient/dashboard" className="hover:text-white transition-colors">
                    {t('nav.dashboard', 'Patient Live Dashboard')}
                  </Link>
                </li>
                <li>
                  <Link to="/patient/queue" className="hover:text-white transition-colors">
                    {t('nav.queue', 'Real-Time Token Tracker')}
                  </Link>
                </li>
                <li>
                  <Link to="/patient/registration" className="hover:text-white transition-colors">
                    {t('nav.book_opd', 'ABHA Voice OPD Registration')}
                  </Link>
                </li>
                <li>
                  <Link to="/patient/prescriptions" className="hover:text-white transition-colors">
                    {t('nav.prescriptions', 'Digital Prescriptions')}
                  </Link>
                </li>
                <li>
                  <Link to="/patient/lab-tests" className="hover:text-white transition-colors">
                    {t('nav.lab_tests', 'Laboratory Reports')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Hospital Command */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] mb-4">
                {t('footer.hospital_command', 'Hospital Command')}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link to="/admin/dashboard" className="hover:text-white transition-colors">
                    Operations Command Center
                  </Link>
                </li>
                <li>
                  <Link to="/doctor/dashboard" className="hover:text-white transition-colors">
                    Doctor Live OPD Desk
                  </Link>
                </li>
                <li>
                  <Link to="/staff/dashboard" className="hover:text-white transition-colors">
                    Registration &amp; Triage Desk
                  </Link>
                </li>
                <li>
                  <Link to="/lab/dashboard" className="hover:text-white transition-colors">
                    Diagnostics &amp; Imaging
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacy/dashboard" className="hover:text-white transition-colors">
                    Jan Aushadhi Chemist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Support & Helplines */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] mb-4">
                {t('footer.emergency_support', 'Emergency & Support')}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#14B8A6]">phone</span>
                  <span>Toll-Free:</span>{' '}
                  <a href="tel:18001802026" className="text-white hover:text-[#14B8A6] font-semibold transition-colors">
                    1800 180 2026
                  </a>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#DC2626]">emergency</span>
                  <span>Ambulance:</span>{' '}
                  <a href="tel:108" className="text-white hover:text-[#14B8A6] font-semibold transition-colors">
                    108
                  </a>
                  <span>/</span>
                  <a href="tel:102" className="text-white hover:text-[#14B8A6] font-semibold transition-colors">
                    102
                  </a>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#14B8A6]">support_agent</span>
                  <span>Civil Desk:</span>{' '}
                  <a href="tel:01712550102" className="text-white hover:text-[#14B8A6] font-semibold transition-colors">
                    0171-2550102
                  </a>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#14B8A6]">mail</span>
                  <a href="mailto:support@qflip.gov.in" className="text-white hover:text-[#14B8A6] font-semibold transition-colors truncate">
                    support@qflip.gov.in
                  </a>
                </li>
                <li>
                  <Link to="/feedback" className="text-[#14B8A6] hover:underline font-semibold block pt-1">
                    Grievance Redressal Portal &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              &copy; {new Date().getFullYear()} CAREFLOW (QFlip) Technologies. Designed for Government Health Clusters &amp; Civil Hospitals.
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="https://www.nhp.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                National Health Portal
              </a>
              <span>•</span>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

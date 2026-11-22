import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { useLanguage } from '../../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="relative bg-light-surface py-12 lg:py-20 px-6 sm:px-12 border-b border-light-outline overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary/10 border border-secondary/20 text-secondary text-label-sm font-semibold mb-6 w-fit">
              <span className="material-symbols-outlined text-sm">local_hospital</span>
              {t('landing.badge', 'Designed for Indian Civil & District Hospitals')}
            </div>

            <h1 className="font-headline text-display-lg-mobile sm:text-display-lg text-light-primary font-extrabold tracking-tight mb-6 leading-[1.1] text-balance">
              {t('landing.hero_title_1', 'Smarter Hospitals. Shorter Waiting Times.')}
            </h1>

            <p className="font-body text-body-lg text-light-on-surface-variant max-w-xl mb-8 leading-relaxed text-pretty">
              {t('landing.hero_sub', 'Transforming government healthcare through intelligent patient-flow management, real-time hospital operations, and AI-powered queue planning for OPDs, diagnostic laboratories, and pharmacies.')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/patient/registration"
                className="inline-flex items-center gap-2.5 bg-accent hover:brightness-95 text-on-accent font-label text-label-lg font-bold px-7 py-3.5 rounded-md shadow-sm transition-all"
              >
                <span>{t('landing.get_started', 'Get Started / Book Token')}</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                to="/patient/dashboard"
                className="inline-flex items-center gap-2 bg-light-surface border-2 border-light-primary hover:bg-light-primary hover:text-white text-light-primary font-label text-label-lg font-semibold px-6 py-3.5 rounded-md transition-all"
              >
                <span>{t('landing.open_portal', 'Access Patient Portal')}</span>
              </Link>
            </div>

            {/* Voice OPD Trigger Callout */}
            <div className="mt-8 p-3.5 bg-secondary/5 rounded-xl border border-secondary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">mic</span>
                </div>
                <div>
                  <div className="font-headline text-xs font-bold text-light-primary">
                    {t('landing.voice_banner_title', 'बोलकर पर्ची बनाएं (Voice OPD Booking)')}
                  </div>
                  <div className="text-[11px] text-light-on-surface-variant">
                    {t('landing.voice_banner_sub', 'English, Hindi, Punjabi & Tamil instant symptom triage')}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsVoiceOpen(true)}
                className="px-4 py-2 bg-secondary text-white font-headline text-xs font-bold rounded-lg hover:bg-secondary/90 shadow-sm"
              >
                {t('landing.try_voice', 'Try Voice OPD')}
              </button>
            </div>

            {/* Trust Badges Under Hero */}
            <div className="mt-8 pt-6 border-t border-light-outline-variant flex flex-wrap items-center gap-6 text-xs text-light-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-success">task_alt</span>
                ABHA &amp; Ayushman Bharat Ready
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">bolt</span>
                Multi-lingual Voice OPD
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-light-primary">hub</span>
                100% Interoperable
              </div>
            </div>
          </div>

          {/* Right Column: Recreated Wavenet Angled Showcase Shape */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
            {/* Outer Structural Geometric Blue Contour Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 600 520"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 220 0 L 290 80 L 160 230 L 160 300 L 105 365 L 105 450 L 160 520"
                stroke="#2585E8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <line x1="160" y1="230" x2="210" y2="230" stroke="#2585E8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6"></line>
            </svg>

            {/* Floating Secondary Geometric Rhombus */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-28 h-28 border-2 border-secondary/50 rounded-2xl transform rotate-45 pointer-events-none z-20 bg-light-surface/60"></div>

            {/* Main Wavenet Hero Mask Container */}
            <div className="relative w-full h-[450px] z-10 filter drop-shadow-md">
              <div
                className="w-full h-full relative overflow-hidden rounded-2xl"
                style={{ clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 74%, 0% 24%)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Hospital Management Flow"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-light-primary/70 via-transparent to-transparent pointer-events-none"></div>

                {/* Live Operational Telemetry Pill */}
                <div className="absolute bottom-6 right-6 bg-white/95 p-4 rounded-xl border border-light-outline shadow-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div>
                    <div className="font-headline text-title-md font-bold text-light-primary">
                      Civil Hospital Ambala
                    </div>
                    <div className="text-xs text-light-on-surface-variant flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-success inline-block"></span> Live OPD Queue Sync: Optimal Flow
                    </div>
                  </div>
                  <div className="pl-4 border-l border-light-outline text-right">
                    <span className="font-headline text-headline-sm font-bold text-light-primary font-code">-42%</span>
                    <span className="block text-[10px] text-light-on-surface-variant font-medium">Wait Time Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-14 bg-light-surface-variant/50 border-b border-light-outline">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-light-outline">
            <div className="pt-4 sm:pt-0 sm:px-6 first:pl-0">
              <span className="block font-headline text-display-md font-extrabold text-light-primary tracking-tight font-code">
                2.4M+
              </span>
              <span className="block font-label text-title-md font-bold text-light-primary mt-1">
                {t('stats.patients_reg', 'Patients Registered')}
              </span>
              <p className="font-body text-body-sm text-light-on-surface-variant mt-1">
                {t('stats.patients_sub', 'Across 18 participating district hospital clusters.')}
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <span className="block font-headline text-display-md font-extrabold text-secondary tracking-tight font-code">
                14 Mins
              </span>
              <span className="block font-label text-title-md font-bold text-light-primary mt-1">
                {t('stats.avg_wait', 'Average Waiting Time')}
              </span>
              <p className="font-body text-body-sm text-light-on-surface-variant mt-1">
                {t('stats.avg_wait_sub', 'Reduced from historical 145 min manual OPD wait.')}
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <span className="block font-headline text-display-md font-extrabold text-light-primary tracking-tight font-code">
                85+
              </span>
              <span className="block font-label text-title-md font-bold text-light-primary mt-1">
                {t('stats.connected_depts', 'Departments Connected')}
              </span>
              <p className="font-body text-body-sm text-light-on-surface-variant mt-1">
                {t('stats.connected_depts_sub', 'General Medicine, Paediatrics, Ortho, Labs, & Chemist.')}
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6 last:pr-0">
              <span className="block font-headline text-display-md font-extrabold text-success tracking-tight font-code">
                99.4%
              </span>
              <span className="block font-label text-title-md font-bold text-light-primary mt-1">
                {t('stats.sync_appointments', 'Appointments Managed')}
              </span>
              <p className="font-body text-body-sm text-light-on-surface-variant mt-1">
                {t('stats.sync_sub', 'Zero lost tokens with real-time SMS & voice calls.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL PATIENT JOURNEY */}
      <section className="py-16 bg-light-surface border-b border-light-outline px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {t('journey.badge', 'End-to-End Orchestration')}
              </span>
              <h2 className="font-headline text-display-md font-extrabold text-light-primary mt-1">
                {t('journey.title', 'The Intelligent Patient Journey')}
              </h2>
            </div>
            <p className="font-body text-body-md text-light-on-surface-variant max-w-md mt-2 md:mt-0">
              {t('journey.sub', 'Every step is connected digitally to eliminate physical counter congestion and confusion.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="bg-light-surface-variant p-4 rounded-xl border border-light-outline">
              <span className="font-code text-xs font-bold text-secondary mb-1 block">STEP 01</span>
              <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                <span className="material-symbols-outlined text-base">how_to_reg</span>
              </div>
              <h3 className="font-headline text-label-lg font-bold text-light-primary">Registration</h3>
              <p className="text-xs text-light-on-surface-variant mt-1">ABHA card, counter or voice kiosk scan.</p>
            </div>

            <div className="bg-light-surface-variant p-4 rounded-xl border border-light-outline">
              <span className="font-code text-xs font-bold text-secondary mb-1 block">STEP 02</span>
              <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                <span className="material-symbols-outlined text-base">merge_type</span>
              </div>
              <h3 className="font-headline text-label-lg font-bold text-light-primary">Dept Assignment</h3>
              <p className="text-xs text-light-on-surface-variant mt-1">AI triages symptoms to exact clinical OPD.</p>
            </div>

            <div className="bg-accent/15 p-4 rounded-xl border-2 border-accent">
              <span className="font-code text-xs font-bold text-on-accent mb-1 block">STEP 03</span>
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-on-accent mb-2">
                <span className="material-symbols-outlined text-base">pin</span>
              </div>
              <h3 className="font-headline text-label-lg font-bold text-light-primary">Queue Token</h3>
              <p className="text-xs text-light-on-surface-variant mt-1">Dynamic digital token (e.g. OPD-104) issued.</p>
            </div>

            <div className="bg-light-surface-variant p-4 rounded-xl border border-light-outline">
              <span className="font-code text-xs font-bold text-secondary mb-1 block">STEP 04</span>
              <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                <span className="material-symbols-outlined text-base">stethoscope</span>
              </div>
              <h3 className="font-headline text-label-lg font-bold text-light-primary">Consultation</h3>
              <p className="text-xs text-light-on-surface-variant mt-1">Doctor calls next with full digital EHR.</p>
            </div>

            <div className="bg-light-surface-variant p-4 rounded-xl border border-light-outline">
              <span className="font-code text-xs font-bold text-secondary mb-1 block">STEP 05</span>
              <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                <span className="material-symbols-outlined text-base">biotech</span>
              </div>
              <h3 className="font-headline text-label-lg font-bold text-light-primary">Laboratory</h3>
              <p className="text-xs text-light-on-surface-variant mt-1">Diagnostic test queue prioritized automatically.</p>
            </div>

            <div className="bg-light-surface-variant p-4 rounded-xl border border-light-outline">
              <span className="font-code text-xs font-bold text-secondary mb-1 block">STEP 06</span>
              <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                <span className="material-symbols-outlined text-base">prescriptions</span>
              </div>
              <h3 className="font-headline text-label-lg font-bold text-light-primary">Pharmacy</h3>
              <p className="text-xs text-light-on-surface-variant mt-1">Medicine packaging sync before patient reaches desk.</p>
            </div>

            <div className="bg-light-surface-variant p-4 rounded-xl border border-light-outline">
              <span className="font-code text-xs font-bold text-success mb-1 block">STEP 07</span>
              <div className="w-8 h-8 rounded bg-success/10 flex items-center justify-center text-success mb-2">
                <span className="material-symbols-outlined text-base">task_alt</span>
              </div>
              <h3 className="font-headline text-label-lg font-bold text-light-primary">Discharge &amp; SMS</h3>
              <p className="text-xs text-light-on-surface-variant mt-1">Instant digital prescription &amp; feedback ticket.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM SOLUTIONS GRID */}
      <section id="solutions" className="py-20 bg-light-surface-variant/40 border-b border-light-outline px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Enterprise Hospital Operating System
            </span>
            <h2 className="font-headline text-display-md font-extrabold text-light-primary mt-2">
              Integrated Clinical Flow Modules
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant mt-3">
              One unified platform serving patients, clinicians, laboratory technicians, pharmacists, and medical
              superintendents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Patient Portal & Live Token */}
            <div className="bg-light-surface p-8 rounded-2xl border border-light-outline shadow-card hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-on-accent mb-6">
                  <span className="material-symbols-outlined text-2xl">pin</span>
                </div>
                <h3 className="font-headline text-title-lg font-bold text-light-primary mb-3">
                  Patient Portal &amp; Live Token Tracker
                </h3>
                <p className="text-xs text-light-on-surface-variant leading-relaxed mb-6">
                  Patients track real-time queue position (OPD-104), estimated wait minutes, doctor availability, and
                  digital prescriptions right on their smartphone.
                </p>
                <ul className="space-y-2 text-xs text-light-primary mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    ABHA QR auto-registration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    Voice symptom triage (Hindi/Punjabi/English)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    SMS token notifications
                  </li>
                </ul>
              </div>
              <Link
                to="/patient/dashboard"
                className="w-full py-2.5 rounded-lg bg-light-surface-variant hover:bg-light-primary hover:text-white text-light-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-light-outline"
              >
                <span>Launch Patient Portal</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 2: Doctor Consultation OPD */}
            <div className="bg-light-surface p-8 rounded-2xl border border-light-outline shadow-card hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary mb-6">
                  <span className="material-symbols-outlined text-2xl">clinical_notes</span>
                </div>
                <h3 className="font-headline text-title-lg font-bold text-light-primary mb-3">
                  Doctor Live Consultation Desk
                </h3>
                <p className="text-xs text-light-on-surface-variant leading-relaxed mb-6">
                  High-speed consultation workflow with Call Next, Skip, Complete, digital Rx templates, and one-click
                  lab investigations ordering.
                </p>
                <ul className="space-y-2 text-xs text-light-primary mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    Emergency triage queue jump
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    Standardized medication templates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    Digital sign-off with EHR sync
                  </li>
                </ul>
              </div>
              <Link
                to="/doctor/dashboard"
                className="w-full py-2.5 rounded-lg bg-light-surface-variant hover:bg-light-primary hover:text-white text-light-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-light-outline"
              >
                <span>Launch Doctor OPD</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 3: AI Command & Operations Center */}
            <div className="bg-light-surface p-8 rounded-2xl border-2 border-secondary/40 shadow-card hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <h3 className="font-headline text-title-lg font-bold text-light-primary mb-3">
                  AI Operations &amp; Digital Twin
                </h3>
                <p className="text-xs text-light-on-surface-variant leading-relaxed mb-6">
                  Predictive crowd surge forecasting, department bottleneck detection, and interactive simulation of
                  patient volume and doctor staffing.
                </p>
                <ul className="space-y-2 text-xs text-light-primary mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    Hourly crowd rush predictions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    Interactive Digital Twin simulation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                    Explainable AI recommendations
                  </li>
                </ul>
              </div>
              <Link
                to="/admin/dashboard"
                className="w-full py-2.5 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Launch Admin Command</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AYUSHMAN BHARAT & CITIZEN SUPPORT CALLOUT */}
      <section className="py-16 bg-light-surface border-b border-light-outline px-6 sm:px-12">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-light-primary via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/20 border border-accent/40 text-accent text-xs font-bold">
                <span className="material-symbols-outlined text-sm">verified_user</span> Ayushman ABHA Fast-Track
              </div>
              <h2 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold tracking-tight">
                Seamless Patient Onboarding &amp; Dedicated Grievance Desk
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Empowering patients with 10-second ABHA Scan &amp; Share QR check-ins, automated voice triage in native languages,
                and transparent queue tracking to minimize waiting times across all clinical OPDs.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/patient/registration"
                  className="px-6 py-3 bg-accent text-on-accent font-bold text-xs rounded-xl hover:brightness-95 flex items-center gap-2 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-sm">add_circle</span>
                  Book OPD Token Now
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMapOpen(true)}
                  className="px-6 py-3 bg-white text-light-primary font-bold text-xs rounded-xl hover:bg-slate-100 flex items-center gap-2 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-sm">map</span>
                  {t('map.open_btn', 'Open Hospital Interactive Map')}
                </button>
                <Link
                  to="/feedback"
                  className="px-5 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">feedback</span>
                  Report a Queue Grievance
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center max-w-xs">
                <span className="material-symbols-outlined text-5xl text-accent mb-2">qr_code_scanner</span>
                <div className="font-headline text-sm font-bold">Ayushman ABHA Scan &amp; Share</div>
                <div className="text-[11px] text-slate-300 mt-1">
                  10-second instant token generation without waiting in registration counter lines
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onComplete={(transcript, dept) => {
          navigate('/patient/registration', {
            state: { voiceTranscript: transcript, suggestedDepartment: dept },
          });
        }}
      />
    </div>
  );
};

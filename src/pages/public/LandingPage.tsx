import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { useLanguage } from '../../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-light-surface text-light-on-surface font-body selection:bg-accent selection:text-on-accent">
      {/* ------------------------------------------------------------- */}
      {/* B. HERO SECTION                                               */}
      {/* ------------------------------------------------------------- */}
      <section
        id="home"
        className="relative bg-gradient-to-b from-slate-50 via-white to-light-surface py-16 lg:py-24 px-6 sm:px-12 border-b border-light-outline overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-xs font-bold mb-6 w-fit shadow-xs">
              <span className="material-symbols-outlined text-sm">local_hospital</span>
              CAREFLOW • Intelligent Hospital Operations Platform
            </div>

            <h1 className="font-headline text-display-lg-mobile sm:text-display-lg lg:text-5xl text-light-primary font-black tracking-tight mb-6 leading-[1.15]">
              Smarter Hospital Operations.{' '}
              <span className="text-secondary block sm:inline">Better Patient Flow.</span>
            </h1>

            <p className="font-body text-body-lg text-slate-600 max-w-2xl mb-8 leading-relaxed">
              From patient registration and AI-assisted triage to live OPD queues, digital prescriptions and
              hospital intelligence, CAREFLOW connects the entire outpatient journey.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/patient/registration"
                className="inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary/90 text-white font-headline text-sm font-bold px-7 py-4 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>

              <button
                type="button"
                onClick={() => scrollToSection('features')}
                className="inline-flex items-center gap-2 bg-white border-2 border-slate-300 hover:border-light-primary hover:bg-light-surface-variant text-light-primary font-headline text-sm font-bold px-6 py-4 rounded-xl transition-all shadow-xs"
              >
                <span>Explore Features</span>
                <span className="material-symbols-outlined text-base text-secondary">expand_more</span>
              </button>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-slate-700 hover:text-secondary font-headline text-sm font-bold px-4 py-3 transition-colors"
              >
                <span className="material-symbols-outlined text-base">lock</span>
                <span>Hospital Staff Portal</span>
              </Link>
            </div>

            {/* Voice OPD Feature Card */}
            <div className="mt-8 p-4 bg-gradient-to-r from-secondary/5 via-blue-50/50 to-white rounded-2xl border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-secondary text-white flex items-center justify-center shadow-xs shrink-0">
                  <span className="material-symbols-outlined text-2xl">mic</span>
                </div>
                <div>
                  <div className="font-headline text-xs font-bold text-light-primary">
                    {t('landing.voice_banner_title', 'बोलकर पर्ची बनाएं (Voice-Assisted OPD Booking)')}
                  </div>
                  <div className="text-[11px] text-light-on-surface-variant mt-0.5">
                    Multilingual symptom intake supporting Hindi, English, Punjabi, and Tamil
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVoiceOpen(true)}
                className="px-4 py-2.5 bg-secondary text-white font-headline text-xs font-bold rounded-xl hover:bg-secondary/90 shadow-sm shrink-0 self-start sm:self-auto transition-all"
              >
                {t('landing.try_voice', 'Try Voice Intake')}
              </button>
            </div>

            {/* Platform Verification Badges */}
            <div className="mt-8 pt-6 border-t border-light-outline flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-success text-base">verified</span>
                <span>ABHA &amp; ABDM Interoperable</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">psychology</span>
                <span>Explainable AI (XAI) Directives</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-light-primary text-base">view_in_ar</span>
                <span>Digital Twin Scenario Simulator</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Telemetry Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full bg-white rounded-3xl border-2 border-secondary/25 p-6 shadow-xl space-y-5 relative">
              <div className="flex items-center justify-between pb-4 border-b border-light-outline">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-success animate-ping"></div>
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-light-primary">
                    Live OPD Operations Sync
                  </span>
                </div>
                <span className="font-code text-xs text-secondary font-bold bg-secondary/10 px-2.5 py-1 rounded-md">
                  Ambala District Hospital
                </span>
              </div>

              {/* Sample Token Live Card */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-secondary/20 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Currently Serving</span>
                  <span className="font-bold text-success flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success"></span> In Room 12
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-headline text-3xl font-black text-light-primary font-code">
                      OPD-098
                    </span>
                    <span className="block text-xs text-slate-600 mt-0.5">Dr. Rajesh Sharma, MD</span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-2xl font-bold text-secondary font-code">45m</span>
                    <span className="block text-[10px] text-slate-500 uppercase font-semibold">Baseline Wait</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Queue Indicators */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Queue Velocity</span>
                  <span className="font-headline text-lg font-bold text-light-primary font-code">24 pts/hr</span>
                  <span className="text-[10px] text-success block">Optimal Flow</span>
                </div>
                <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Active Chambers</span>
                  <span className="font-headline text-lg font-bold text-light-primary font-code">4 On-Duty</span>
                  <span className="text-[10px] text-secondary block">General OPD</span>
                </div>
              </div>

              {/* Digital Twin Operational Badge */}
              <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-400 text-lg">science</span>
                  <div>
                    <div className="text-xs font-bold">Hospital Digital Twin Active</div>
                    <div className="text-[10px] text-slate-400">Deterministic scenario testing engine</div>
                  </div>
                </div>
                <Link
                  to="/ai/dashboard"
                  className="px-3 py-1.5 bg-secondary text-white text-[11px] font-bold rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  View Twin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* C. PROBLEM SECTION                                            */}
      {/* ------------------------------------------------------------- */}
      <section id="problems" className="py-20 bg-slate-50/70 border-b border-light-outline px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-danger bg-danger/10 px-3 py-1 rounded-full border border-danger/20">
              The Outpatient Flow Bottleneck
            </span>
            <h2 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary mt-3">
              Operational Challenges in Modern Hospital OPDs
            </h2>
            <p className="font-body text-body-md text-slate-600 mt-3 leading-relaxed">
              District hospitals and public healthcare facilities face systemic patient-flow bottlenecks
              that strain clinicians, multiply wait times, and degrade clinical care quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Problem 1 */}
            <div className="p-6 bg-white rounded-2xl border border-light-outline shadow-card space-y-3 hover:border-danger/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">hourglass_disabled</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                1. Long and Unpredictable OPD Queues
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patients endure 2 to 4 hours of blind waiting in overcrowded corridors without visibility into
                physician consult duration, token velocity, or real-time call order.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="p-6 bg-white rounded-2xl border border-light-outline shadow-card space-y-3 hover:border-danger/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">receipt_long</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                2. Disconnected Registration &amp; Walk-Ins
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manual paper registers and isolated front-desk counters create massive morning entry bottlenecks,
                unverified patient records, and chaotic queue spillover.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="p-6 bg-white rounded-2xl border border-light-outline shadow-card space-y-3 hover:border-danger/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">visibility_off</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                3. Limited Visibility into Waiting Times
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Neither patients nor hospital administrators possess real-time telemetry on consultation delays,
                preventing proactive patient communication and crowd control.
              </p>
            </div>

            {/* Problem 4 */}
            <div className="p-6 bg-white rounded-2xl border border-light-outline shadow-card space-y-3 hover:border-danger/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">balance</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                4. Unbalanced Doctor Workloads
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certain senior physician chambers are inundated with 70+ patients while adjacent consultation
                rooms remain underutilized due to static department assignment.
              </p>
            </div>

            {/* Problem 5 */}
            <div className="p-6 bg-white rounded-2xl border border-light-outline shadow-card space-y-3 hover:border-danger/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">sync_problem</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                5. Disconnected Lab &amp; Pharmacy Workflows
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diagnostic sample collection and Jan Aushadhi medicine dispensing operate in silos, requiring patients
                to queue multiple times from scratch with manual paper slips.
              </p>
            </div>

            {/* Problem 6 */}
            <div className="p-6 bg-white rounded-2xl border border-light-outline shadow-card space-y-3 hover:border-danger/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                6. Lack of Resource-Planning Insights
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Medical superintendents lack mathematical simulation tools to forecast seasonal crowd surges,
                model doctor absenteeism, or evaluate emergency floater deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* D. CORE FEATURES SECTION                                      */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="py-20 bg-white border-b border-light-outline px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              End-to-End Capabilities
            </span>
            <h2 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary mt-3">
              Comprehensive Platform Capabilities
            </h2>
            <p className="font-body text-body-md text-slate-600 mt-3">
              CAREFLOW bridges every touchpoint of outpatient care into an orchestrated, transparent ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">how_to_reg</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                1. Unified Patient Registration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rapid demographic intake with 14-digit ABHA ID integration, Ayushman Bharat verification, and
                instant digital token slip generation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">translate</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                2. AI-Assisted Multilingual Triage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clinical symptom heuristics supporting Hindi, Punjabi, Tamil, and English to accurately identify
                acuteness and route patients to the correct clinical specialty.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">tune</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                3. Smart Queue Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dynamic priority tiers (Emergency trauma, Senior citizens, Pediatric care, Normal) with a fair
                3-position re-entry penalty algorithm for skipped tokens.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">phone_android</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                4. Real-Time Patient Tracking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Live mobile portal showing token called in real time, queue position, and estimated minutes to consultation,
                eliminating physical crowding at chamber doors.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">prescriptions</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                5. Digital Prescriptions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured EHR consultation notes with standardized generic medicine dosages, meal timing guidelines,
                and one-click transmission to Jan Aushadhi chemists.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">biotech</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                6. Integrated Laboratory Workflow
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct doctor-to-lab diagnostic ordering, phlebotomy queue balancing, specimen tracking, and
                electronic report generation delivered straight to patient records.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">medication</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                7. Pharmacy Dispensing Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Formulary stock synchronization, fast-track medication pre-bundling for common ailments, and automated
                pickup counter notifications.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">view_in_ar</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                8. Hospital Digital Twin
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic mathematical simulation engine enabling superintendents to benchmark live OPD baselines
                against hypothetical surge, staffing, and queue directives.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-3 hover:shadow-card transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                9. Resource &amp; Operational Analytics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Live monitoring of inpatient ward bed occupancy, ICU beds, oxygen cylinder reserves, stretchers,
                and departmental throughput indices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* E. HOW CAREFLOW WORKS                                         */}
      {/* ------------------------------------------------------------- */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-light-outline px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              Visual Patient Journey
            </span>
            <h2 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary mt-3">
              How CAREFLOW Works
            </h2>
            <p className="font-body text-body-md text-slate-600 mt-3">
              A synchronized 7-stage outpatient journey designed to eliminate queue congestion from entry to exit.
            </p>
          </div>

          {/* 7-Step Journey Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {/* Step 1 */}
            <div className="p-4 bg-white rounded-xl border border-light-outline shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs font-bold text-secondary">STAGE 01</span>
                <span className="material-symbols-outlined text-secondary text-base">how_to_reg</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-light-primary">Registration</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Patient checks in via ABHA QR code scan, reception counter, or voice triage kiosk.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-white rounded-xl border border-light-outline shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs font-bold text-secondary">STAGE 02</span>
                <span className="material-symbols-outlined text-secondary text-base">psychology</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-light-primary">Triage</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                AI clinical heuristics evaluate spoken or written symptoms to assign the exact OPD specialty.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-white rounded-xl border border-light-outline shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs font-bold text-secondary">STAGE 03</span>
                <span className="material-symbols-outlined text-secondary text-base">pin</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-light-primary">Token Issued</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Dynamic queue token (e.g. OPD-104) generated with room assignment and estimated wait time.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-white rounded-xl border-2 border-secondary/40 shadow-card space-y-2 bg-blue-50/20">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs font-bold text-secondary">STAGE 04</span>
                <span className="material-symbols-outlined text-secondary text-base">live_tv</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-light-primary">Live Queue</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Patient tracks live position on smartphone or waiting area digital signage screens.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 bg-white rounded-xl border border-light-outline shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs font-bold text-secondary">STAGE 05</span>
                <span className="material-symbols-outlined text-secondary text-base">stethoscope</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-light-primary">Consultation</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Doctor calls token, reviews EHR history, diagnoses condition, and issues digital Rx.
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-4 bg-white rounded-xl border border-light-outline shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs font-bold text-secondary">STAGE 06</span>
                <span className="material-symbols-outlined text-secondary text-base">local_pharmacy</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-light-primary">Lab / Pharmacy</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Prescriptions and diagnostic requests route automatically to counters for fast fulfillment.
              </p>
            </div>

            {/* Step 7 */}
            <div className="p-4 bg-white rounded-xl border border-light-outline shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs font-bold text-success">STAGE 07</span>
                <span className="material-symbols-outlined text-success text-base">rate_review</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-light-primary">Feedback</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Patient receives digital discharge copy and submits service rating or grievance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* F. HOSPITAL INTELLIGENCE & DIGITAL TWIN SECTION               */}
      {/* ------------------------------------------------------------- */}
      <section
        id="hospital-intelligence"
        className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-light-primary text-white px-6 sm:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold">
                <span className="material-symbols-outlined text-sm">view_in_ar</span>
                Operations Command Center &amp; Digital Twin
              </div>

              <h2 className="font-headline text-display-md-mobile sm:text-display-md lg:text-4xl font-extrabold tracking-tight leading-tight">
                Predictive Hospital Intelligence for Medical Superintendents
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                The CAREFLOW Digital Twin provides an interactive operational simulator. Test what happens to
                waiting lines and physician burnout before making changes in the real hospital.
              </p>

              {/* 6 Core Administrator Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-accent text-xs">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    Monitor Patient Surges
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Anticipate hourly footfall waves before waiting halls and corridors overflow.
                  </p>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-accent text-xs">
                    <span className="material-symbols-outlined text-sm">compare_arrows</span>
                    Live Baseline vs Scenarios
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Benchmark constant live OPD baselines (45m) against reactive hypothetical simulations.
                  </p>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-accent text-xs">
                    <span className="material-symbols-outlined text-sm">groups</span>
                    Simulate Staffing Changes
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Model the immediate impact of deploying floater doctors or adjusting chamber rosters.
                  </p>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-accent text-xs">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    Identify Bottlenecks
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Pinpoint delay hotspots across registration desks, consultations, phlebotomy, and chemist.
                  </p>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-accent text-xs">
                    <span className="material-symbols-outlined text-sm">bed</span>
                    Resource Utilisation
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Real-time telemetry on bed occupancy rates, oxygen cylinder stocks, and wheelchairs.
                  </p>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-accent text-xs">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    Explainable AI Directives
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Transparent operational recommendations with auditable telemetry and quantifiable impacts.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/ai/digital-twin"
                  className="inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary/90 text-white font-headline text-xs font-bold px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">view_in_ar</span>
                  <span>Explore Digital Twin Simulator</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Interactive Preview Teaser Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/15 text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                  Deterministic Simulation Model
                </span>
                <span className="font-code text-accent">Active Scenario</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Live OPD Baseline Wait:</span>
                  <span className="font-bold font-code text-white">45 minutes</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Projected With +25% Surge:</span>
                  <span className="font-bold font-code text-danger">62 minutes</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">After Staffing Directive Approval:</span>
                  <span className="font-bold font-code text-success">42 minutes (-32%)</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-[11px] text-slate-300 border border-white/10">
                Notice the blue projected line drop in real time upon directive approval while the live baseline
                remains constant.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* G. ROLE-BASED ACCESS SECTION                                  */}
      {/* ------------------------------------------------------------- */}
      <section id="roles" className="py-20 bg-white border-b border-light-outline px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              Multi-Persona Architecture
            </span>
            <h2 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary mt-3">
              Built for Every Hospital Stakeholder
            </h2>
            <p className="font-body text-body-md text-slate-600 mt-3">
              Dedicated interfaces tailored to the exact workflow of each healthcare role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Role 1: Patients */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">person</span>
                </div>
                <h3 className="font-headline text-title-md font-bold text-light-primary">Patients</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Track live token progress from home or waiting hall, view digital prescriptions, download lab test
                  reports, and submit service grievances.
                </p>
              </div>
              <Link
                to="/patient/dashboard"
                className="w-full py-2.5 rounded-xl bg-white border border-light-outline hover:bg-light-primary hover:text-white text-light-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Patient Portal</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Role 2: Doctors */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">stethoscope</span>
                </div>
                <h3 className="font-headline text-title-md font-bold text-light-primary">Doctors</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Call next patient, review AI symptom summaries, access patient EHR medical history, create digital
                  prescriptions, and order clinical diagnostic tests.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-white border border-light-outline hover:bg-light-primary hover:text-white text-light-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Doctor OPD Desk</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Role 3: Registration Staff */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">badge</span>
                </div>
                <h3 className="font-headline text-title-md font-bold text-light-primary">Registration Staff</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rapid front-desk patient intake, demographic lookups, emergency triage override, and token reprint
                  slip management.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-white border border-light-outline hover:bg-light-primary hover:text-white text-light-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Reception Desk</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Role 4: Laboratory Staff */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">biotech</span>
                </div>
                <h3 className="font-headline text-title-md font-bold text-light-primary">Laboratory Staff</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manage incoming investigation queues for hematology, biochemistry, and radiology, update sample
                  intake, and publish validated digital reports.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-white border border-light-outline hover:bg-light-primary hover:text-white text-light-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Diagnostics Lab</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Role 5: Pharmacy Staff */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">local_pharmacy</span>
                </div>
                <h3 className="font-headline text-title-md font-bold text-light-primary">Pharmacy Staff</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jan Aushadhi generic formulary inventory tracking, rapid barcode checkout for pre-assembled kits,
                  and automated SMS dispensing alerts.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-white border border-light-outline hover:bg-light-primary hover:text-white text-light-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Pharmacy Desk</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Role 6: Administrators */}
            <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                </div>
                <h3 className="font-headline text-title-md font-bold text-light-primary">Administrators</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Operations command center, Digital Twin what-if modeling, clinical department capacity limits, hospital
                  resource tracking, and auditable governance.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-secondary text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs hover:bg-secondary/90"
              >
                <span>Admin Command</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H. FOOTER                                                     */}
      {/* ------------------------------------------------------------- */}
      <footer id="contact" className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Branding & Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
                    <path
                      d="M4 18L10 6L18 28L24 14L30 22"
                      stroke="#2585E8"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <circle cx="30" cy="22" r="3.5" fill="#F2D500"></circle>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-xl font-black tracking-tight text-white leading-none">
                    CAREFLOW
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                    Code-named QFlip Health
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                CAREFLOW (code-named QFlip) is an AI-assisted hospital operations and outpatient patient-flow management
                platform engineered for zero-congestion OPDs, synchronized diagnostic handoffs, and deterministic digital twin simulation.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-accent">
                Platform Navigation
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button type="button" onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
                    Core Features
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('hospital-intelligence')} className="hover:text-white transition-colors">
                    Hospital Intelligence &amp; Digital Twin
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('roles')} className="hover:text-white transition-colors">
                    Role-Based Access
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Role Portals */}
            <div className="space-y-3">
              <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-accent">
                Healthcare Portals
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <Link to="/patient/dashboard" className="hover:text-white transition-colors">
                    Patient Live Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/patient/registration" className="hover:text-white transition-colors">
                    Online OPD Registration
                  </Link>
                </li>
                <li>
                  <Link to="/doctor/dashboard" className="hover:text-white transition-colors">
                    Doctor Consultation OPD
                  </Link>
                </li>
                <li>
                  <Link to="/staff/dashboard" className="hover:text-white transition-colors">
                    Front Desk Reception
                  </Link>
                </li>
                <li>
                  <Link to="/ai/dashboard" className="hover:text-white transition-colors">
                    Operations Command Admin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Emergency Helplines & Contact */}
            <div className="space-y-3">
              <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-accent">
                Emergency &amp; Contact
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <span className="block font-semibold text-white">Facility Telemetry Node:</span>
                  <span>Civil Hospital Ambala, Haryana</span>
                </div>
                <div>
                  <span className="block font-semibold text-white">National Emergency Helplines:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-danger text-white font-bold font-code text-[11px]">
                      112
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold font-code text-[11px]">
                      108
                    </span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-white font-bold font-code text-[11px]">
                      102
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    to="/feedback"
                    className="text-xs text-accent hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">feedback</span>
                    <span>Submit Patient Grievance</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & ABDM Note */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              &copy; 2026 CAREFLOW (QFlip Health Logistics). Built for Indian Civil &amp; District Hospitals.
            </div>
            <div className="flex items-center gap-4">
              <span>ABHA / ABDM Ready</span>
              <span>•</span>
              <span>Explainable AI Engine v3.1</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Voice Intake Modal */}
      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onComplete={(transcript, dept, symptoms) => {
          navigate('/patient/registration', {
            state: { voiceTranscript: transcript, suggestedDepartment: dept, symptoms },
          });
        }}
      />
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { HospitalMapModal } from '../../components/common/HospitalMapModal';
import { BentoCard } from '../../components/common/BentoCard';
import { GlassCard } from '../../components/common/GlassCard';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  React.useEffect(() => {
    document.title = 'CAREFLOW (QFlip) — AI Hospital Patient-Flow & Operations Platform';
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO BENTO SECTION */}
      <section className="relative pt-8 sm:pt-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#0F766E]/10 via-[#2563EB]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Bento Grid Hero Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            {/* Primary Bento Hero Card (7 Cols) */}
            <div className="lg:col-span-7 bg-white/75 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#0F766E]/20 text-[#0F766E] text-xs font-semibold mb-6">
                  <span className="material-symbols-outlined text-sm">local_hospital</span>
                  <span>Indian Civil &amp; District Hospitals • Zero Queue Architecture</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                  Smarter Clinical Operations. <br />
                  <span className="text-[#0F766E]">Zero OPD Congestion.</span>
                </h1>

                <p className="text-base text-slate-600 max-w-xl mb-8 leading-relaxed">
                  CAREFLOW synchronizes patient registration, real-time OPD queuing, diagnostic laboratories, and Jan Aushadhi pharmacies into an intelligent, zero-friction clinical flow.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/patient/registration"
                    className="inline-flex items-center gap-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-semibold px-6 py-3.5 rounded-xl shadow-sm transition-all"
                  >
                    <span>Get Started / Book Token</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <Link
                    to="/patient/dashboard"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold px-6 py-3.5 rounded-xl border border-slate-200 shadow-sm transition-all"
                  >
                    <span>Open Patient Portal</span>
                  </Link>
                </div>
              </div>

              {/* Multilingual Voice OPD Callout Pill */}
              <div className="mt-8 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">mic</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      बोलकर पर्ची बनाएं (Voice OPD Kiosk)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Hindi, Punjabi &amp; English instant AI symptom triage
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsVoiceOpen(true)}
                  className="px-3.5 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex-shrink-0"
                >
                  Try Voice OPD
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#16A34A] text-base">task_alt</span>
                  ABHA &amp; Ayushman Bharat Ready
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#0F766E] text-base">bolt</span>
                  Live Token Sync
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#2563EB] text-base">hub</span>
                  EHR Interoperable
                </div>
              </div>
            </div>

            {/* Live Operational Telemetry Bento Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Telemetry Glass Showcase */}
              <div className="bg-white/75 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#16A34A]"></span>
                      </span>
                      <span className="text-xs font-bold text-slate-900">Civil Hospital Operations</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#0F766E] bg-[#E6F4F1] px-2.5 py-1 rounded-full font-semibold">
                      Live Telemetry
                    </span>
                  </div>

                  {/* 4 Mini Bento Metric Chips */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Serving Now</span>
                      <span className="text-xl font-black font-mono text-[#0F766E]">OPD-104</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Dr. Sharma • Room 4</span>
                    </div>

                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Wait Time Today</span>
                      <span className="text-xl font-black font-mono text-[#16A34A]">14 min</span>
                      <span className="text-[10px] text-[#16A34A] block mt-0.5 font-medium">-78% vs manual</span>
                    </div>

                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Active in Queue</span>
                      <span className="text-xl font-black font-mono text-[#2563EB]">182</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Across 6 depts</span>
                    </div>

                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">AI Flow Health</span>
                      <span className="text-xl font-black font-mono text-[#7C3AED]">99.4%</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Zero lost tokens</span>
                    </div>
                  </div>

                  {/* Mini OPD Queue Ticker */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Active Consultation Stream
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                        <span className="font-semibold text-slate-800">General Medicine</span>
                      </div>
                      <span className="font-mono text-slate-500">Token #104 in consult</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                        <span className="font-semibold text-slate-800">Diagnostics &amp; Lab</span>
                      </div>
                      <span className="font-mono text-slate-500">Token #089 sample ready</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                        <span className="font-semibold text-slate-800">Jan Aushadhi Chemist</span>
                      </div>
                      <span className="font-mono text-slate-500">Token #076 dispensed</span>
                    </div>
                  </div>
                </div>

                {/* Quick Link to Queue Tracker */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to="/patient/queue"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#E6F4F1] hover:bg-[#0F766E] hover:text-white text-[#0F766E] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span>View Public Live Tracker</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BENTO RIBBON */}
      <section className="px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard blur="sm" className="p-6">
              <span className="text-3xl font-black font-mono text-slate-900 block mb-1">2.4M+</span>
              <span className="text-sm font-bold text-slate-800 block">Patients Registered</span>
              <p className="text-xs text-slate-500 mt-1">Across 18 participating government civil hospital clusters.</p>
            </GlassCard>

            <GlassCard blur="sm" className="p-6">
              <span className="text-3xl font-black font-mono text-[#0F766E] block mb-1">14 Mins</span>
              <span className="text-sm font-bold text-slate-800 block">Average Wait Time</span>
              <p className="text-xs text-slate-500 mt-1">Reduced from historical 145 min manual OPD physical queues.</p>
            </GlassCard>

            <GlassCard blur="sm" className="p-6">
              <span className="text-3xl font-black font-mono text-[#2563EB] block mb-1">85+</span>
              <span className="text-sm font-bold text-slate-800 block">Connected Departments</span>
              <p className="text-xs text-slate-500 mt-1">General Medicine, Paediatrics, Ortho, Pathology, &amp; Pharmacy.</p>
            </GlassCard>

            <GlassCard blur="sm" className="p-6">
              <span className="text-3xl font-black font-mono text-[#16A34A] block mb-1">99.4%</span>
              <span className="text-sm font-bold text-slate-800 block">Appointments Synchronized</span>
              <p className="text-xs text-slate-500 mt-1">Zero lost tokens with automated SMS and multi-lingual voice alerts.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 3. PATIENT JOURNEY BENTO */}
      <section className="px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                End-to-End Orchestration
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                The Intelligent Patient Journey
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md mt-2 md:mt-0">
              Every step is connected digitally to eliminate physical counter crowds, confusion, and lost paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 & 2 */}
            <BentoCard variant="glass" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-[#E6F4F1] px-2 py-0.5 rounded-full">
                    STEP 01 &amp; 02
                  </span>
                  <span className="material-symbols-outlined text-[#0F766E] text-lg">how_to_reg</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Scan &amp; AI Department Triage</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fast ABHA QR check-in or voice symptom triage in Hindi, Punjabi, or English to assign the correct OPD.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Instant registration • Zero counter line
              </div>
            </BentoCard>

            {/* Step 3 & 4 */}
            <BentoCard variant="glass" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full">
                    STEP 03 &amp; 04
                  </span>
                  <span className="material-symbols-outlined text-[#2563EB] text-lg">stethoscope</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Live Queue &amp; Doctor Consultation</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dynamic token (e.g. OPD-104) tracking on patient phone. Clinicians access digital records with one-click call next.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Real-time wait times • Full EHR context
              </div>
            </BentoCard>

            {/* Step 5 & 6 */}
            <BentoCard variant="glass" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded-full">
                    STEP 05 &amp; 06
                  </span>
                  <span className="material-symbols-outlined text-[#7C3AED] text-lg">biotech</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Diagnostics &amp; Jan Aushadhi</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Lab investigations and medication orders automatically sync to pharmacy counters before the patient arrives.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Pre-packaged dispensing • Zero wait
              </div>
            </BentoCard>

            {/* Step 7 */}
            <BentoCard variant="glass" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full">
                    STEP 07
                  </span>
                  <span className="material-symbols-outlined text-[#16A34A] text-lg">task_alt</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Digital Prescription &amp; Feedback</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Immediate SMS delivery of the digital prescription and automated satisfaction rating to the command desk.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                ABHA Locker saved • Citizen feedback
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM SOLUTIONS BENTO GRID */}
      <section id="solutions" className="px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              Enterprise Healthcare OS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Modular Clinical Flow Architecture
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              A cohesive Bento-organized system connecting patients, clinicians, laboratories, pharmacists, and medical superintendents.
            </p>
          </div>

          {/* Asymmetric 12-Column Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Bento Card 1: Patient Portal & Live Token (Span 8) */}
            <div className="lg:col-span-8 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">pin</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#0F766E] bg-[#E6F4F1] px-3 py-1 rounded-full">
                    Core Patient Service
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Patient Portal &amp; Live Queue Tracker
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-2xl">
                  Patients monitor real-time queue position (e.g. OPD-104), accurate remaining wait time, doctor consultation state, and digitized prescriptions directly on their mobile browser without downloading an app.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg">check_circle</span>
                    <span className="text-xs font-semibold text-slate-700">ABHA Auto-Checkin</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg">check_circle</span>
                    <span className="text-xs font-semibold text-slate-700">Multilingual SMS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg">check_circle</span>
                    <span className="text-xs font-semibold text-slate-700">Digital Rx Archive</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  to="/patient/dashboard"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0F766E] hover:underline"
                >
                  <span>Launch Patient Portal</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  to="/patient/queue"
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#0F766E] hover:text-white text-slate-700 text-xs font-semibold transition-all"
                >
                  Track Queue Now
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Multilingual Voice Triage (Span 4) */}
            <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">mic</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#0F766E] bg-[#E6F4F1] px-2.5 py-1 rounded-full">
                    Kiosk AI
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Voice OPD Kiosk
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  Patients speak their symptoms in Hindi, Punjabi, or English. The NLP engine translates chief complaints into ICD-11 categories and directs them to the exact clinic.
                </p>

                <div className="p-3 rounded-2xl bg-[#E6F4F1]/60 border border-[#0F766E]/20 text-xs text-[#0F766E] mb-6">
                  &ldquo;पेट में दो दिन से दर्द है और चक्कर आ रहे हैं...&rdquo; &rarr; <strong>General Medicine (OPD)</strong>
                </div>
              </div>

              <button
                onClick={() => setIsVoiceOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-sm">mic</span>
                <span>Try Voice Triage Demo</span>
              </button>
            </div>

            {/* Bento Card 3: Doctor Consultation Desk (Span 4) */}
            <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">clinical_notes</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Doctor Live Consultation Desk
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  High-speed clinician interface with Call Next, Skip, Complete, emergency triage jumps, and integrated lab order dispatch.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-sm">check_circle</span>
                    One-click Call Next &amp; Skip
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-sm">check_circle</span>
                    Standardized medication templates
                  </li>
                </ul>
              </div>
              <Link
                to="/doctor/dashboard"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Launch Doctor OPD</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Bento Card 4: Jan Aushadhi & Lab Sync (Span 4) */}
            <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">medication</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Jan Aushadhi &amp; Lab Sync
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  Real-time pharmacy inventory tracking and sample barcoding. Pharmacists pre-package prescriptions before patients exit the doctor&apos;s office.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-sm">check_circle</span>
                    Zero pharmacy queue bottlenecks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-sm">check_circle</span>
                    Automated low-stock stockouts alert
                  </li>
                </ul>
              </div>
              <Link
                to="/pharmacy/dashboard"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#16A34A] hover:text-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Launch Pharmacy Desk</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Bento Card 5: AI Operations & Surge Twin (Span 4) */}
            <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  AI Digital Twin &amp; Surge Forecast
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  Predictive crowd surge forecasting and doctor workload simulations. Detects queue anomalies before congestion forms.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-sm">check_circle</span>
                    Hourly crowd surge probability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#16A34A] text-sm">check_circle</span>
                    Simulated doctor reallocations
                  </li>
                </ul>
              </div>
              <Link
                to="/ai/dashboard"
                className="w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>Launch Digital Twin</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOSPITAL INDOOR WAYFINDING BANNER */}
      <section className="px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#14B8A6] text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">explore</span> Indoor Smart Compass
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Never Get Lost in a Multi-Wing Government Hospital
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Color-coded navigation pins connect registration counters directly to OPD rooms, diagnostic laboratories, and Jan Aushadhi pharmacies. Scan QR markers outside any corridor to open real-time directions on your phone.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => setIsMapOpen(true)}
                  className="px-6 py-3 bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-sm">map</span>
                  Open Hospital Interactive Map
                </button>
                <Link
                  to="/feedback"
                  className="px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 text-xs font-semibold transition-colors"
                >
                  Report a Queue Grievance
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center max-w-xs">
                <span className="material-symbols-outlined text-5xl text-[#14B8A6] mb-2">qr_code_scanner</span>
                <div className="text-sm font-bold">Ayushman ABHA Scan &amp; Share</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  10-second instant token generation without waiting in registration counter lines
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice & Map Modals */}
      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onComplete={(transcript, dept) => {
          navigate('/patient/registration', {
            state: { voiceTranscript: transcript, suggestedDepartment: dept },
          });
        }}
      />
      <HospitalMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </div>
  );
};

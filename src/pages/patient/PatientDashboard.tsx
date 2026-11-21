import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import { TokenCard } from '../../components/common/TokenCard';
import { StatCard } from '../../components/common/StatCard';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { myToken, currentServingToken, tokens } = useQueue();

  const patientsAhead = myToken && currentServingToken
    ? Math.max(
        0,
        tokens.findIndex((t) => t.id === myToken.id) -
          tokens.findIndex((t) => t.id === currentServingToken.id)
      )
    : 6;

  return (
    <div className="space-y-8">
      {/* Welcome & Live Queue Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Token Card (Stitch Live Token Tracker layout) */}
        <div className="lg:col-span-7 space-y-6">
          {myToken ? (
            <TokenCard
              token={myToken}
              currentServingTokenNumber={currentServingToken?.tokenNumber || 'OPD-098'}
              patientsAhead={patientsAhead}
              onPrint={() => window.print()}
              onViewDetails={() => (window.location.href = '/patient/queue')}
            />
          ) : (
            <div className="p-8 bg-light-surface rounded-2xl border border-light-outline text-center space-y-4">
              <span className="material-symbols-outlined text-4xl text-secondary">local_activity</span>
              <h3 className="font-headline text-title-lg font-bold text-light-primary">
                No Active OPD Token Found
              </h3>
              <p className="text-xs text-light-on-surface-variant max-w-sm mx-auto">
                Generate an OPD slip online in 10 seconds or speak your symptoms using our Multi-lingual Voice intake.
              </p>
              <Link
                to="/patient/registration"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-on-accent font-bold text-xs rounded-xl hover:brightness-95 shadow-sm"
              >
                <span>Book OPD Slip Now</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          )}

          {/* Quick Shortcuts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/patient/registration"
              className="p-4 bg-light-surface rounded-xl border border-light-outline hover:border-secondary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">add_circle</span>
              </div>
              <span className="font-headline text-xs font-bold text-light-primary">New OPD Slip</span>
              <span className="text-[10px] text-light-on-surface-variant">Instant booking</span>
            </Link>

            <Link
              to="/patient/prescriptions"
              className="p-4 bg-light-surface rounded-xl border border-light-outline hover:border-secondary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 text-on-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">prescriptions</span>
              </div>
              <span className="font-headline text-xs font-bold text-light-primary">Prescriptions</span>
              <span className="text-[10px] text-light-on-surface-variant">Digital QR Rx</span>
            </Link>

            <Link
              to="/patient/lab-tests"
              className="p-4 bg-light-surface rounded-xl border border-light-outline hover:border-secondary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <span className="font-headline text-xs font-bold text-light-primary">Lab Reports</span>
              <span className="text-[10px] text-light-on-surface-variant">2 reports ready</span>
            </Link>

            <Link
              to="/patient/pharmacy"
              className="p-4 bg-light-surface rounded-xl border border-light-outline hover:border-secondary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">medication</span>
              </div>
              <span className="font-headline text-xs font-bold text-light-primary">Jan Aushadhi</span>
              <span className="text-[10px] text-light-on-surface-variant">Counter #03</span>
            </Link>
          </div>
        </div>

        {/* Right: Hospital Status & Clinical Alerts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Doctor On Duty Card */}
          <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <span className="text-xs font-bold text-light-on-surface-variant uppercase tracking-wider">
                Assigned Clinical OPD
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/15 text-success text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-success"></span> In Session
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                alt="Doctor"
                className="w-14 h-14 rounded-xl object-cover border border-light-outline"
              />
              <div>
                <h4 className="font-headline text-title-md font-bold text-light-primary">
                  Dr. Rajesh Sharma, MD
                </h4>
                <div className="text-xs text-secondary font-semibold">General Medicine • OPD Room 12</div>
                <div className="text-[11px] text-light-on-surface-variant mt-0.5">
                  Shift: 08:30 AM – 02:00 PM (Civil Hospital Ambala)
                </div>
              </div>
            </div>

            <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline text-xs space-y-2">
              <div className="flex justify-between text-light-on-surface-variant">
                <span>Patients in Queue:</span>
                <strong className="text-light-primary font-code">24 Patients</strong>
              </div>
              <div className="flex justify-between text-light-on-surface-variant">
                <span>Avg. Consultation Time:</span>
                <strong className="text-light-primary font-code">6.5 mins / patient</strong>
              </div>
              <div className="flex justify-between text-light-on-surface-variant">
                <span>OPD Hall Location:</span>
                <strong className="text-light-primary">Block B, 1st Floor (Near Lift 2)</strong>
              </div>
            </div>
          </div>

          {/* Real-time SMS and Voice Alert History */}
          <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <h4 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">sms</span>
                Live Token SMS Updates
              </h4>
              <span className="text-[10px] text-light-on-surface-variant">Simulated Telco Stream</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-secondary/5 rounded-xl border border-secondary/20">
                <div className="flex justify-between text-[10px] text-secondary font-bold mb-1">
                  <span>GOV-AMBALA-OPD</span>
                  <span>10:02 AM</span>
                </div>
                <p className="text-light-primary text-[11px]">
                  "Dear Manpreet Singh, Token OPD-098 is in consultation. 6 patients ahead of OPD-104. Please take seat
                  in 1st Floor Waiting Hall 2."
                </p>
              </div>

              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline">
                <div className="flex justify-between text-[10px] text-light-on-surface-variant font-bold mb-1">
                  <span>GOV-AMBALA-OPD</span>
                  <span>09:48 AM</span>
                </div>
                <p className="text-light-on-surface-variant text-[11px]">
                  "Token OPD-104 booked successfully for General Medicine (Room 12). Est wait 25 mins. Show QR code to
                  OPD door attendant."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Health Records Summary */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-light-outline">
          <div>
            <h3 className="font-headline text-title-lg font-bold text-light-primary">
              Ayushman Bharat Health Locker Summary
            </h3>
            <p className="text-xs text-light-on-surface-variant">
              Linked to ABHA: <strong>{user?.abhaId || '91-8274-1049-9812'}</strong>
            </p>
          </div>
          <Link
            to="/patient/medical-history"
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
          >
            <span>View Complete Health History</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline">
            <span className="text-[10px] uppercase font-bold text-secondary block mb-1">Last Consultation</span>
            <div className="font-headline text-sm font-bold text-light-primary">15 Oct 2026</div>
            <div className="text-light-on-surface-variant mt-0.5">Acute Viral Pharyngitis • Dr. Rajesh Sharma</div>
          </div>

          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline">
            <span className="text-[10px] uppercase font-bold text-purple-600 block mb-1">Diagnostic Report</span>
            <div className="font-headline text-sm font-bold text-light-primary">CBC &amp; Platelet Count</div>
            <div className="text-light-on-surface-variant mt-0.5">Verified on 16 Oct • Normal Range</div>
          </div>

          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline">
            <span className="text-[10px] uppercase font-bold text-success block mb-1">Active Prescription</span>
            <div className="font-headline text-sm font-bold text-light-primary">Azithromycin + Levocetirizine</div>
            <div className="text-light-on-surface-variant mt-0.5">Course Completed • Follow-up Optional</div>
          </div>
        </div>
      </div>
    </div>
  );
};

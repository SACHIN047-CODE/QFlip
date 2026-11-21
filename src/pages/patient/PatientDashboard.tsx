import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import { TokenCard } from '../../components/common/TokenCard';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { BentoCard } from '../../components/common/BentoCard';
import { 
  FileText, 
  FlaskConical, 
  Pill, 
  PlusCircle, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Stethoscope 
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { myToken, currentServingToken, tokens } = useQueue();
  const navigate = useNavigate();

  const patientsAhead = myToken && currentServingToken
    ? Math.max(
        0,
        tokens.findIndex((t) => t.id === myToken.id) -
          tokens.findIndex((t) => t.id === currentServingToken.id)
      )
    : 6;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.name || 'Patient'}`}
        subtitle={`ABHA ID: ${user?.abhaId || '91-8274-1049-9812'} • Patient Portal`}
        actions={
          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => navigate('/patient/registration')}
          >
            New OPD Slip
          </Button>
        }
      />

      {/* Welcome & Live Queue Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Token Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {myToken ? (
            <TokenCard
              token={myToken}
              currentServingTokenNumber={currentServingToken?.tokenNumber || 'OPD-098'}
              patientsAhead={patientsAhead}
              onPrint={() => window.print()}
              onViewDetails={() => navigate('/patient/queue')}
            />
          ) : (
            <div className="p-8 bg-white rounded-xl border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No Active OPD Token Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Generate an OPD slip online in 10 seconds or speak your symptoms using our Multi-lingual Voice intake.
              </p>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/patient/registration')}
              >
                Book OPD Slip Now
              </Button>
            </div>
          )}

          {/* Quick Shortcuts Grid (Glass Bento Tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/patient/registration"
              className="glass-card p-4 hover:border-[#0F766E]/40 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900">New OPD Slip</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Instant booking</span>
            </Link>

            <Link
              to="/patient/prescriptions"
              className="glass-card p-4 hover:border-blue-400 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900">Prescriptions</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Digital QR Rx</span>
            </Link>

            <Link
              to="/patient/lab-tests"
              className="glass-card p-4 hover:border-purple-400 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900">Lab Reports</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Verified reports</span>
            </Link>

            <Link
              to="/patient/pharmacy"
              className="glass-card p-4 hover:border-emerald-400 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Pill className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900">Jan Aushadhi</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Counter #03</span>
            </Link>
          </div>
        </div>

        {/* Right: Hospital Status & Clinical Alerts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Doctor On Duty Card (Glass Surface) */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Assigned OPD Clinic
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                In Session
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-100">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Dr. Rajesh Sharma, MD
                </h4>
                <div className="text-xs text-[#0F766E] font-medium">General Medicine • Room 12</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Shift: 08:30 AM – 02:00 PM • Civil Hospital Ambala
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Patients in Queue:</span>
                <strong className="text-slate-900 font-mono">24 Patients</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Avg. Consultation Time:</span>
                <strong className="text-slate-900 font-mono">6.5 mins / patient</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>OPD Location:</span>
                <strong className="text-slate-900">Block B, 1st Floor (Near Lift 2)</strong>
              </div>
            </div>
          </div>

          {/* Real-time SMS and Voice Alert History (Glass Surface) */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0F766E]" />
                Live Token SMS Updates
              </h4>
              <span className="text-[10px] text-slate-400">ABDM Synced</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-teal-50/70 rounded-xl border border-[#0F766E]/20">
                <div className="flex justify-between text-[10px] text-[#0F766E] font-bold mb-1">
                  <span>GOV-AMBALA-OPD</span>
                  <span>10:02 AM</span>
                </div>
                <p className="text-slate-800 text-xs leading-relaxed">
                  "Dear Patient, Token OPD-098 is in consultation. 6 patients ahead of OPD-104. Please take seat in 1st Floor Waiting Hall 2."
                </p>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-slate-200">
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold mb-1">
                  <span>GOV-AMBALA-OPD</span>
                  <span>09:48 AM</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  "Token OPD-104 booked successfully for General Medicine (Room 12). Est wait 25 mins. Show QR code to OPD door attendant."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Health Records Summary (Solid Bento Card) */}
      <BentoCard variant="solid" padding="lg" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Ayushman Bharat Health Locker Summary
            </h3>
            <p className="text-xs text-slate-500">
              Linked to ABHA: <strong className="font-mono text-slate-700">{user?.abhaId || '91-8274-1049-9812'}</strong>
            </p>
          </div>
          <Link
            to="/patient/medical-history"
            className="text-xs font-semibold text-[#0F766E] hover:text-[#115E59] flex items-center gap-1"
          >
            <span>View Full Health Record</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-[#0F766E] block mb-1">Last Consultation</span>
            <div className="text-sm font-bold text-slate-900">15 Oct 2026</div>
            <div className="text-slate-500 mt-0.5">Acute Viral Pharyngitis • Dr. Rajesh Sharma</div>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-purple-700 block mb-1">Diagnostic Report</span>
            <div className="text-sm font-bold text-slate-900">CBC & Platelet Count</div>
            <div className="text-slate-500 mt-0.5">Verified on 16 Oct • Normal Range</div>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">Active Prescription</span>
            <div className="text-sm font-bold text-slate-900">Azithromycin + Levocetirizine</div>
            <div className="text-slate-500 mt-0.5">Course Completed • Follow-up Optional</div>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};

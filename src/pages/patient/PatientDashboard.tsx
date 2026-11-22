import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import { useLanguage } from '../../context/LanguageContext';
import { patientService } from '../../services/patientService';
import { TokenCard } from '../../components/common/TokenCard';
import { ConsultationNote } from '../../types';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { myToken, currentServingToken, tokens } = useQueue();
  const { t } = useLanguage();
  const [medicalHistory, setMedicalHistory] = useState<ConsultationNote[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingHistory(true);
    patientService
      .getMedicalHistory(user.id)
      .then((records) => {
        // Filter strictly for this logged-in user
        const userRecords = records.filter(
          (r) =>
            r.patientId === user.id ||
            (user.name && r.patientName && r.patientName.toLowerCase().includes(user.name.toLowerCase()))
        );
        setMedicalHistory(userRecords);
      })
      .catch((err) => console.error('Failed to load medical history', err))
      .finally(() => setLoadingHistory(false));
  }, [user]);

  // Calculate actual waiting order
  const waitingTokens = tokens.filter((t) => t.status === 'WAITING');
  const myIndex = myToken ? waitingTokens.findIndex((t) => t.id === myToken.id) : -1;
  const patientsAhead = myIndex >= 0 ? myIndex : 0;

  const isSkipped = myToken?.status === 'SKIPPED' || myToken?.status === 'SKIPPED_AWAITING_RECEPTION';
  const isRejoined = myToken?.reentryPenaltyApplied && myToken?.status === 'WAITING';

  return (
    <div className="space-y-8">
      {/* Welcome & Live Queue Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Token Card */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prominent Skipped Banner */}
          {isSkipped && (
            <div className="bg-amber-500 text-white rounded-2xl p-5 shadow-lg flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl animate-pulse">warning</span>
              <div>
                <div className="font-headline font-bold text-sm">
                  Skipped – Awaiting Reception Check-in
                </div>
                <div className="text-xs text-amber-100 mt-0.5">
                  Waiting for physical verification. Your token was skipped. Please visit reception and scan your token to rejoin the queue.
                </div>
              </div>
            </div>
          )}

          {/* Prominent Rejoined Banner */}
          {isRejoined && (
            <div className="bg-blue-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span className="font-bold">Rejoined Main Queue</span>
                <span className="text-blue-100">
                  (Physical arrival verified at reception. Three-place penalty applied)
                </span>
              </div>
              <span className="font-code font-bold bg-white/20 px-2 py-0.5 rounded">
                Position #{patientsAhead + 1}
              </span>
            </div>
          )}

          {myToken ? (
            <TokenCard
              token={myToken}
              currentServingTokenNumber={currentServingToken?.tokenNumber || 'None'}
              patientsAhead={patientsAhead}
              onPrint={() => window.print()}
              onViewDetails={() => (window.location.href = '/patient/queue')}
            />
          ) : (
            <div className="p-8 glass-card text-center space-y-4 shadow-sm border border-slate-200">
              <span className="material-symbols-outlined text-4xl text-[#0F766E]">local_activity</span>
              <h3 className="text-lg font-bold text-slate-900">
                No active patient records available.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You do not have an active OPD consultation token. Generate an OPD slip online in 10 seconds or speak your symptoms using our Multi-lingual Voice intake.
              </p>
              <Link
                to="/patient/registration"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0F766E] text-white font-bold text-xs rounded-xl hover:bg-[#115E59] shadow-sm transition-all"
              >
                <span>Book OPD Slip Now</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          )}

          {/* Quick Shortcuts Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <Link
              to="/patient/registration"
              className="p-4 glass-card hover:bg-white hover:border-[#0F766E]/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">add_circle</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{t('nav.book_opd', 'New OPD Slip')}</span>
              <span className="text-[10px] text-slate-500">Instant booking</span>
            </Link>

            <Link
              to="/patient/prescriptions"
              className="p-4 glass-card hover:bg-white hover:border-[#0F766E]/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">prescriptions</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{t('nav.prescriptions', 'Prescriptions')}</span>
              <span className="text-[10px] text-slate-500">Generic Digital Rx</span>
            </Link>

            <Link
              to="/patient/lab-tests"
              className="p-4 glass-card hover:bg-white hover:border-purple-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{t('nav.lab_tests', 'Lab Reports')}</span>
              <span className="text-[10px] text-slate-500">Diagnostics</span>
            </Link>

            <Link
              to="/patient/pharmacy"
              className="p-4 glass-card hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">medication</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{t('nav.pharmacy', 'Jan Aushadhi')}</span>
              <span className="text-[10px] text-slate-500">Counter #03</span>
            </Link>
          </div>
        </div>

        {/* Right: Hospital Status & Clinical Alerts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Doctor On Duty Card (Glass Surface) */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Assigned Clinical OPD
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> In Session
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                alt="Doctor"
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {myToken?.assignedDoctorName || 'Dr. Rajesh Sharma, MD'}
                </h4>
                <div className="text-xs text-[#0F766E] font-semibold mt-0.5">
                  {myToken?.department || 'General Medicine'} • {myToken?.roomNumber || 'OPD Room 12'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Shift: 08:30 AM – 02:00 PM (Civil Hospital Ambala)
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Patients in Queue:</span>
                <strong className="text-slate-900 font-mono">{waitingTokens.length} Patients</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Avg. Consultation Time:</span>
                <strong className="text-slate-900 font-mono">6.5 mins / patient</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>OPD Hall Location:</span>
                <strong className="text-slate-900">Block B, 1st Floor (Near Lift 2)</strong>
              </div>
            </div>
          </div>

          {/* Real-time SMS and Voice Alert History (Glass Surface) */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F766E] text-base">sms</span>
                Live Token SMS Updates
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">NHM Gateway</span>
            </div>

            {myToken && myToken.statusHistory && myToken.statusHistory.length > 0 ? (
              <div className="space-y-3 text-xs">
                {myToken.statusHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      item.status === 'SKIPPED'
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-teal-50/60 border-teal-200/70 text-slate-900'
                    }`}
                  >
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className={item.status === 'SKIPPED' ? 'text-amber-800' : 'text-[#0F766E]'}>
                        GOV-AMBALA-OPD • {item.status.toUpperCase()}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700">{item.note}</p>
                  </div>
                ))}
              </div>
            ) : myToken ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200/70">
                  <div className="flex justify-between text-[10px] text-[#0F766E] font-bold mb-1">
                    <span>GOV-AMBALA-OPD</span>
                    <span className="font-mono text-slate-500">{myToken.registeredAt}</span>
                  </div>
                  <p className="text-slate-700 text-[11px]">
                    Token {myToken.tokenNumber} issued for {myToken.department} ({myToken.roomNumber || 'Room 12'}). Est wait: {myToken.estimatedWaitMinutes} mins.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No active patient records available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Health Records Summary (Solid Bento Section) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Ayushman Bharat Health Locker Summary
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Linked to ABHA: <strong className="font-mono text-slate-700">{user?.abhaId || 'Not Linked'}</strong>
            </p>
          </div>
          <Link
            to="/patient/medical-history"
            className="text-xs font-bold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>View Complete Health History</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {medicalHistory.length === 0 ? (
          <div className="p-8 text-center bg-slate-50/60 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">No active patient records available.</p>
            <p className="text-[11px]">
              Past consultations, lab reports, and active prescriptions will appear here once issued by your doctor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {medicalHistory.slice(0, 3).map((record) => (
              <div key={record.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2 hover:bg-slate-50 transition-colors">
                <span className="text-[10px] uppercase font-bold text-[#0F766E] block">
                  {record.department} • {record.date}
                </span>
                <div className="text-sm font-bold text-slate-900">
                  {record.diagnosis}
                </div>
                <div className="text-slate-500 text-[11px]">
                  Dr: {record.doctorName}
                </div>
                {record.prescriptions && record.prescriptions.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 text-[11px]">
                    <span className="font-bold text-slate-900 block mb-0.5">Prescribed Medicines:</span>
                    {record.prescriptions.slice(0, 2).map((rx) => (
                      <div key={rx.id} className="text-slate-600">
                        • {rx.name} ({rx.dosage}) - <span className="text-[#0F766E] font-semibold">{rx.consumptionTiming}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;

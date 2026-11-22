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
            <div className="p-8 bg-light-surface rounded-2xl border border-light-outline text-center space-y-4 shadow-card">
              <span className="material-symbols-outlined text-4xl text-secondary">local_activity</span>
              <h3 className="font-headline text-title-lg font-bold text-light-primary">
                No active patient records available.
              </h3>
              <p className="text-xs text-light-on-surface-variant max-w-sm mx-auto">
                You do not have an active OPD consultation token. Generate an OPD slip online in 10 seconds or speak your symptoms using our Multi-lingual Voice intake.
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
              <span className="font-headline text-xs font-bold text-light-primary">{t('nav.book_opd', 'New OPD Slip')}</span>
              <span className="text-[10px] text-light-on-surface-variant">Instant booking</span>
            </Link>

            <Link
              to="/patient/prescriptions"
              className="p-4 bg-light-surface rounded-xl border border-light-outline hover:border-secondary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 text-on-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">prescriptions</span>
              </div>
              <span className="font-headline text-xs font-bold text-light-primary">{t('nav.prescriptions', 'Prescriptions')}</span>
              <span className="text-[10px] text-light-on-surface-variant">Generic Digital Rx</span>
            </Link>

            <Link
              to="/patient/lab-tests"
              className="p-4 bg-light-surface rounded-xl border border-light-outline hover:border-secondary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <span className="font-headline text-xs font-bold text-light-primary">{t('nav.lab_tests', 'Lab Reports')}</span>
              <span className="text-[10px] text-light-on-surface-variant">Diagnostics</span>
            </Link>

            <Link
              to="/patient/pharmacy"
              className="p-4 bg-light-surface rounded-xl border border-light-outline hover:border-secondary/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">medication</span>
              </div>
              <span className="font-headline text-xs font-bold text-light-primary">{t('nav.pharmacy', 'Jan Aushadhi')}</span>
              <span className="text-[10px] text-light-on-surface-variant">Counter #03</span>
            </Link>
          </div>
        </div>

        {/* Right: Hospital Status & Clinical Alerts */}
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
                  {myToken?.assignedDoctorName || 'Dr. Rajesh Sharma, MD'}
                </h4>
                <div className="text-xs text-secondary font-semibold">
                  {myToken?.department || 'General Medicine'} • {myToken?.roomNumber || 'OPD Room 12'}
                </div>
                <div className="text-[11px] text-light-on-surface-variant mt-0.5">
                  Shift: 08:30 AM – 02:00 PM (Civil Hospital Ambala)
                </div>
              </div>
            </div>

            <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline text-xs space-y-2">
              <div className="flex justify-between text-light-on-surface-variant">
                <span>Patients in Queue:</span>
                <strong className="text-light-primary font-code">{waitingTokens.length} Patients</strong>
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
              <span className="text-[10px] text-light-on-surface-variant font-medium">NHM Gateway</span>
            </div>

            {myToken && myToken.statusHistory && myToken.statusHistory.length > 0 ? (
              <div className="space-y-3 text-xs">
                {myToken.statusHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      item.status === 'SKIPPED'
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-secondary/5 border-secondary/20 text-light-primary'
                    }`}
                  >
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className={item.status === 'SKIPPED' ? 'text-amber-800' : 'text-secondary'}>
                        GOV-AMBALA-OPD • {item.status.toUpperCase()}
                      </span>
                      <span className="text-light-on-surface-variant">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px]">{item.note}</p>
                  </div>
                ))}
              </div>
            ) : myToken ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-secondary/5 rounded-xl border border-secondary/20">
                  <div className="flex justify-between text-[10px] text-secondary font-bold mb-1">
                    <span>GOV-AMBALA-OPD</span>
                    <span>{myToken.registeredAt}</span>
                  </div>
                  <p className="text-light-primary text-[11px]">
                    Token {myToken.tokenNumber} issued for {myToken.department} ({myToken.roomNumber || 'Room 12'}). Est wait: {myToken.estimatedWaitMinutes} mins.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-light-on-surface-variant">
                No active patient records available.
              </div>
            )}
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
              Linked to ABHA: <strong>{user?.abhaId || 'Not Linked'}</strong>
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

        {medicalHistory.length === 0 ? (
          <div className="p-8 text-center bg-light-surface-variant/40 rounded-xl border border-light-outline text-xs text-light-on-surface-variant space-y-1">
            <p className="font-semibold text-light-primary">No active patient records available.</p>
            <p className="text-[11px]">
              Past consultations, lab reports, and active prescriptions will appear here once issued by your doctor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {medicalHistory.slice(0, 3).map((record) => (
              <div key={record.id} className="p-4 bg-light-surface-variant rounded-xl border border-light-outline space-y-2">
                <span className="text-[10px] uppercase font-bold text-secondary block">
                  {record.department} • {record.date}
                </span>
                <div className="font-headline text-sm font-bold text-light-primary">
                  {record.diagnosis}
                </div>
                <div className="text-light-on-surface-variant text-[11px]">
                  Dr: {record.doctorName}
                </div>
                {record.prescriptions && record.prescriptions.length > 0 && (
                  <div className="pt-2 border-t border-light-outline text-[11px]">
                    <span className="font-bold text-light-primary block mb-0.5">Prescribed Medicines:</span>
                    {record.prescriptions.slice(0, 2).map((rx) => (
                      <div key={rx.id} className="text-light-on-surface-variant">
                        • {rx.name} ({rx.dosage}) - <span className="text-secondary font-semibold">{rx.consumptionTiming}</span>
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

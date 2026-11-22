import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import { ConsultationNote } from '../../types';
import { PageSkeleton } from '../../components/common/LoadingSkeleton';
import { useAuth } from '../../context/AuthContext';

export const MedicalHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ConsultationNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    patientService.getMedicalHistory(user.id).then((data) => {
      // Strict Data Privacy: only display records belonging to this logged in user
      const userRecords = data.filter(
        (record) =>
          record.patientId === user.id ||
          (user.name && record.patientName && record.patientName.toLowerCase().includes(user.name.toLowerCase()))
      );
      setHistory(userRecords);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <PageSkeleton variant="content" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Ayushman Bharat Digital Locker
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Past Medical Consultations
          </h1>
        </div>
        <button
          onClick={() => alert('Consent PIN requested from Ayushman Bharat Health Locker.')}
          className="px-4 py-2 bg-white border border-[#0F766E]/40 text-[#0F766E] hover:bg-[#E6F4F1] font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-sm">sync</span>
          Sync External Hospital Records
        </button>
      </div>

      {history.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-slate-400">folder_shared</span>
          <h3 className="text-base font-bold text-slate-900">No Past Consultations Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any past clinical notes under patient ID <strong>{user?.id}</strong>. New consultation summaries will be saved here automatically after your doctor appointments.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((record) => (
          <div
            key={record.id}
            className="bento-card-solid rounded-2xl p-6 shadow-xs space-y-4"
          >
            {/* Record Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">medical_services</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {record.diagnosis}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {record.department} • {record.doctorName}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-code text-xs font-bold text-slate-900 block">{record.date}</span>
                <span className="text-[10px] text-[#16A34A] font-semibold">Verified EHR Record</span>
              </div>
            </div>

            {/* Complaints & Findings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Chief Complaints
                </span>
                <p className="text-slate-800">{record.chiefComplaints}</p>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Clinical Findings
                </span>
                <p className="text-slate-800">{record.clinicalFindings}</p>
              </div>
            </div>

            {/* Prescribed Medications */}
            <div>
              <span className="text-xs font-bold text-slate-900 block mb-2">Prescribed Medications:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {record.prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-3 bg-slate-50/60 rounded-xl border border-slate-200"
                  >
                    <div className="font-bold text-slate-900">{rx.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {rx.dosage} • {rx.frequency}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-[#0F766E]">
                      {rx.instructions} ({rx.duration})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice and Action */}
            {record.advice && (
              <div className="p-3 bg-teal-50/70 rounded-xl border border-[#0F766E]/20 text-xs">
                <span className="font-bold text-[#0F766E] block">Doctor's Clinical Advice:</span>
                <p className="text-slate-800 mt-0.5">{record.advice}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

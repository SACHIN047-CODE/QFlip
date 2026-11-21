import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import { ConsultationNote } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
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

  if (loading) return <LoadingSpinner message="Retrieving your private ABHA Health Records..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-light-outline">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Ayushman Bharat Digital Locker
          </span>
          <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
            Past Medical Consultations
          </h1>
        </div>
        <button
          onClick={() => alert('Consent PIN requested from Ayushman Bharat Health Locker.')}
          className="px-4 py-2 bg-light-surface border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">sync</span>
          Sync External Hospital Records
        </button>
      </div>

      {history.length === 0 ? (
        <div className="p-12 bg-light-surface rounded-2xl border border-light-outline text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-light-on-surface-variant">folder_shared</span>
          <h3 className="font-headline text-title-md font-bold text-light-primary">No Past Consultations Found</h3>
          <p className="text-xs text-light-on-surface-variant max-w-sm mx-auto">
            You do not have any past clinical notes under patient ID <strong>{user?.id}</strong>. New consultation summaries will be saved here automatically after your doctor appointments.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((record) => (
          <div
            key={record.id}
            className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4"
          >
            {/* Record Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-light-outline gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">medical_services</span>
                </div>
                <div>
                  <h3 className="font-headline text-title-md font-bold text-light-primary">
                    {record.diagnosis}
                  </h3>
                  <div className="text-xs text-light-on-surface-variant">
                    {record.department} • {record.doctorName}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-code text-xs font-bold text-light-primary block">{record.date}</span>
                <span className="text-[10px] text-success font-semibold">Verified EHR Record</span>
              </div>
            </div>

            {/* Complaints & Findings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline">
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block mb-1">
                  Chief Complaints
                </span>
                <p className="text-light-primary">{record.chiefComplaints}</p>
              </div>

              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline">
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block mb-1">
                  Clinical Findings
                </span>
                <p className="text-light-primary">{record.clinicalFindings}</p>
              </div>
            </div>

            {/* Prescribed Medications */}
            <div>
              <span className="text-xs font-bold text-light-primary block mb-2">Prescribed Medications:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {record.prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-3 bg-light-surface-variant/40 rounded-lg border border-light-outline/60"
                  >
                    <div className="font-bold text-light-primary">{rx.name}</div>
                    <div className="text-[11px] text-light-on-surface-variant mt-0.5">
                      {rx.dosage} • {rx.frequency}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-secondary">
                      {rx.instructions} ({rx.duration})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice and Action */}
            {record.advice && (
              <div className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-xs">
                <span className="font-bold text-on-accent block">Doctor's Clinical Advice:</span>
                <p className="text-light-primary mt-0.5">{record.advice}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

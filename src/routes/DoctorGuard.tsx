import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DoctorAccessModal } from '../components/common/DoctorAccessModal';

export const DoctorGuard: React.FC = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  // Strict check: Must have entered Doctor password/PIN or Biometric in this session
  const isVerified = sessionStorage.getItem('careflow_doctor_verified') === 'true';

  const [modalOpen, setModalOpen] = useState(!isVerified);

  if (isVerified) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border-2 border-slate-700 rounded-3xl p-8 text-center text-white shadow-2xl space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-secondary/10 border-2 border-secondary/40 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-4xl">lock</span>
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-danger/20 border border-danger/40 text-danger text-[10px] font-bold uppercase tracking-wider">
            Restricted Clinical Zone
          </span>
          <h2 className="font-headline text-xl font-bold mt-2">Hospital Command Restricted</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Operations &amp; Digital Twin controls are strictly accessible to authorized Medical Officers, Doctors, and the Medical Superintendent.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="w-full py-3 bg-accent text-on-accent font-headline font-bold text-xs rounded-xl hover:brightness-95 shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">lock_open</span>
          <span>Enter Doctor Authorization PIN</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-semibold"
        >
          Return to Public Portal
        </button>
      </div>

      <DoctorAccessModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (sessionStorage.getItem('careflow_doctor_verified') !== 'true') {
            navigate('/');
          }
        }}
        onSuccess={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
};

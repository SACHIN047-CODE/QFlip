import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Modal } from './Modal';
import { apiClient } from '../../services/api';

interface DoctorAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  targetRoute?: string;
}

export const DoctorAccessModal: React.FC<DoctorAccessModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  targetRoute = '/admin/dashboard',
}) => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const handleVerifyPin = async (inputPin?: string) => {
    const code = (inputPin || pin).trim();
    setError('');

    if (!code) {
      setError('Please enter your 4-digit Doctor Passkey.');
      return;
    }

    setIsVerifying(true);

    try {
      // 1. Try secure server-side verification first (no secret exposed in frontend)
      await apiClient.post('/auth/verify-doctor-passkey', { pin: code });
      
      sessionStorage.setItem('qflip_doctor_verified', 'true');
      switchRole('doctor');
      setVerifiedSuccess(true);
      setIsVerifying(false);

      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          navigate(targetRoute);
        }
      }, 600);
    } catch (err: any) {
      // 2. Offline / local dev environment check using non-committed .env variable
      const envPasskey = import.meta.env.VITE_DOCTOR_PASSKEY;
      if (envPasskey && code === String(envPasskey).trim()) {
        sessionStorage.setItem('qflip_doctor_verified', 'true');
        switchRole('doctor');
        setVerifiedSuccess(true);
        setIsVerifying(false);

        setTimeout(() => {
          onClose();
          if (onSuccess) {
            onSuccess();
          } else {
            navigate(targetRoute);
          }
        }, 600);
        return;
      }

      setIsVerifying(false);
      setError(
        'Access Denied: Invalid Clinical Passkey. Only authorized Doctors & Medical Superintendents can access Command Operations.'
      );
    }
  };

  const handleKeypadPress = (val: string) => {
    if (val === 'CLEAR') {
      setPin('');
      setError('');
    } else if (val === 'DEL') {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 8) {
      const next = pin + val;
      setPin(next);
      if (next.length === 4) {
        handleVerifyPin(next);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Restricted Access: Doctor & Medical Officer Verification"
      subtitle="National Health Mission • Clinical Operations Security Protocol"
      maxWidth="md"
    >
      <div className="space-y-5 text-center">
        {/* Security Shield Icon */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-50/80 border border-[#0F766E]/30 flex items-center justify-center text-[#0F766E] shadow-sm backdrop-blur-md">
            <span className="material-symbols-outlined text-3xl">local_police</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50/80 border border-red-200 text-[#DC2626] font-bold text-[10px] uppercase tracking-wider mt-3 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
            Hospital Command Restricted to Doctors
          </span>
          <p className="text-xs text-slate-500 max-w-sm mt-1.5">
            Hospital Command &amp; Capacity Overrides are restricted to on-duty Doctors and the Chief Medical Superintendent.
          </p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="p-3 bg-red-50/80 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 text-left backdrop-blur-xs">
            <span className="material-symbols-outlined text-base flex-shrink-0 text-red-600">gpp_bad</span>
            <span>{error}</span>
          </div>
        )}

        {verifiedSuccess && (
          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 text-left animate-in fade-in backdrop-blur-xs">
            <span className="material-symbols-outlined text-base flex-shrink-0 text-emerald-600">verified_user</span>
            <div>
              <strong>Doctor Clearance Authenticated:</strong> Dr. Rajesh Sharma, MD (NMC-98124). Entering Hospital Command...
            </div>
          </div>
        )}

        {/* PIN Input with Dots */}
        <div>
          <label className="text-xs font-bold text-slate-900 block mb-2">
            Enter Doctor 4-Digit Security PIN:
          </label>
          <div className="flex items-center justify-center gap-3 mb-2">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-11 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-bold font-mono transition-all backdrop-blur-sm ${
                  pin.length > idx
                    ? 'border-[#0F766E] bg-teal-50 text-[#0F766E] shadow-xs'
                    : 'border-slate-200 bg-white/70 text-transparent'
                }`}
              >
                {pin[idx] ? '●' : ''}
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-500">
            Authorized Medical Council of India / NMC credentials required.
          </div>
        </div>

        {/* Interactive Clinical Numeric Keypad */}
        <div className="max-w-xs mx-auto grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'DEL'].map((btn) => (
            <button
              key={btn}
              type="button"
              onClick={() => handleKeypadPress(btn)}
              className={`py-3 rounded-xl border text-sm font-bold font-mono transition-all backdrop-blur-sm ${
                btn === 'CLEAR' || btn === 'DEL'
                  ? 'bg-slate-100/80 text-slate-600 border-slate-200 hover:bg-slate-200 text-xs'
                  : 'bg-white/80 text-slate-900 border-slate-200/90 hover:bg-teal-50 hover:border-[#0F766E]/40 hover:text-[#0F766E] shadow-xs'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 border border-slate-200 bg-white/80 backdrop-blur-sm rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-xs"
          >
            Cancel / Back to Public Portal
          </button>
        </div>
      </div>
    </Modal>
  );
};

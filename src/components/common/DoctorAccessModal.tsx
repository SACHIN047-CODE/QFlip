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
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary shadow-inner">
            <span className="material-symbols-outlined text-3xl">local_police</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger/10 border border-danger/25 text-danger font-bold text-[10px] uppercase tracking-wider mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse"></span>
            Hospital Command Restricted to Doctors
          </span>
          <p className="text-xs text-light-on-surface-variant max-w-sm mt-1.5">
            Hospital Command &amp; Capacity Overrides are restricted to on-duty Doctors and the Chief Medical Superintendent.
          </p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="p-3 bg-danger/10 border border-danger/30 rounded-xl text-xs text-danger flex items-center gap-2 text-left">
            <span className="material-symbols-outlined text-base flex-shrink-0">gpp_bad</span>
            <span>{error}</span>
          </div>
        )}

        {verifiedSuccess && (
          <div className="p-3 bg-success/10 border border-success/30 rounded-xl text-xs text-success flex items-center gap-2 text-left animate-in fade-in">
            <span className="material-symbols-outlined text-base flex-shrink-0">verified_user</span>
            <div>
              <strong>Doctor Clearance Authenticated:</strong> Dr. Rajesh Sharma, MD (NMC-98124). Entering Hospital Command...
            </div>
          </div>
        )}

        {/* PIN Input with Dots */}
        <div>
          <label className="text-xs font-bold text-light-primary block mb-2">
            Enter Doctor 4-Digit Security PIN:
          </label>
          <div className="flex items-center justify-center gap-3 mb-2">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-11 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-bold font-code transition-all ${
                  pin.length > idx
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-light-outline bg-light-surface text-transparent'
                }`}
              >
                {pin[idx] ? '●' : ''}
              </div>
            ))}
          </div>
          <div className="text-[11px] text-light-on-surface-variant">
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
              className={`py-3 rounded-xl border text-sm font-bold font-code transition-all ${
                btn === 'CLEAR' || btn === 'DEL'
                  ? 'bg-light-surface-variant text-light-on-surface-variant border-light-outline hover:bg-light-outline text-xs'
                  : 'bg-white text-light-primary border-light-outline hover:bg-secondary/10 hover:border-secondary hover:text-secondary'
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
            className="w-full py-2 border border-light-outline rounded-lg text-xs font-semibold text-light-on-surface-variant hover:bg-light-surface-variant"
          >
            Cancel / Back to Public Portal
          </button>
        </div>
      </div>
    </Modal>
  );
};

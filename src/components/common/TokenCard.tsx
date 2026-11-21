import React from 'react';
import { PatientToken } from '../../types';
import { StatusBadge } from './StatusBadge';

interface TokenCardProps {
  token: PatientToken;
  currentServingTokenNumber?: string;
  patientsAhead?: number;
  onPrint?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  token,
  currentServingTokenNumber = 'OPD-098',
  patientsAhead = 6,
  onPrint,
  onViewDetails,
  className = '',
}) => {
  return (
    <div className={`bg-light-surface rounded-2xl border-2 border-accent/60 shadow-lg overflow-hidden ${className}`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-light-primary to-slate-800 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-accent text-lg">local_activity</span>
          <span className="font-headline text-xs font-bold uppercase tracking-wider text-accent">
            Live OPD Digital Token
          </span>
        </div>
        <StatusBadge status={token.status} priority={token.priority} />
      </div>

      {/* Skipped Alert Banner */}
      {(token.status === 'SKIPPED' || token.status === 'SKIPPED_AWAITING_RECEPTION') && (
        <div className="bg-amber-500 text-white p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl animate-pulse">warning</span>
          <div className="text-xs">
            <div className="font-bold text-sm">Skipped – Awaiting Reception Check-in</div>
            <div className="font-medium text-amber-100">
              Waiting for physical verification. Your token was skipped. Please visit reception and scan your token to rejoin the queue.
            </div>
          </div>
        </div>
      )}

      {/* Rejoined Banner */}
      {token.reentryPenaltyApplied && token.status === 'WAITING' && (
        <div className="bg-blue-600 text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>Rejoined Main Queue (+3 place penalty applied)</span>
          </div>
          {token.queuePosition && (
            <span className="font-code font-bold bg-white/20 px-2 py-0.5 rounded">
              Position #{token.queuePosition}
            </span>
          )}
        </div>
      )}

      {/* Main Token Display */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-light-outline">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-wider text-light-on-surface-variant font-semibold block mb-1">
              Your Allocated Token
            </span>
            <div className="font-headline text-5xl font-black text-light-primary tracking-tight font-code text-secondary">
              {token.tokenNumber}
            </div>
            <div className="mt-2 text-sm font-semibold text-light-primary flex items-center justify-center sm:justify-start gap-1.5">
              <span className="material-symbols-outlined text-secondary text-sm">apartment</span>
              <span>{token.department}</span>
              <span className="text-light-on-surface-variant">• {token.roomNumber || 'Room 12'}</span>
            </div>
          </div>

          {/* QR Code / Barcode Preview Box */}
          <div className="flex flex-col items-center p-3 bg-light-surface-variant rounded-xl border border-light-outline text-center">
            <div className="w-24 h-24 bg-white p-1 rounded-lg border border-light-outline flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full text-light-primary fill-current">
                <rect x="10" y="10" width="25" height="25" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="65" y="10" width="25" height="25" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="10" y="65" width="25" height="25" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="45" y="15" width="10" height="10" />
                <rect x="45" y="45" width="15" height="15" />
                <rect x="65" y="65" width="10" height="20" />
                <rect x="75" y="50" width="15" height="10" />
                <rect x="25" y="45" width="10" height="10" />
                <rect x="45" y="75" width="15" height="10" />
              </svg>
            </div>
            <span className="font-code text-[10px] text-light-on-surface-variant mt-1.5 font-bold tracking-wider">
              {token.patientId}
            </span>
          </div>
        </div>

        {/* Live Wait Diagnostics Grid */}
        <div className="grid grid-cols-3 gap-3 my-5 text-center">
          <div className="p-3 bg-light-surface-variant/60 rounded-xl border border-light-outline">
            <span className="text-[11px] text-light-on-surface-variant block font-medium">Currently Serving</span>
            <span className="font-headline text-lg sm:text-xl font-black text-secondary font-code block mt-0.5">
              {currentServingTokenNumber}
            </span>
          </div>
          <div className="p-3 bg-light-surface-variant/60 rounded-xl border border-light-outline">
            <span className="text-[11px] text-light-on-surface-variant block font-medium">Patients Ahead</span>
            <span className="font-headline text-lg sm:text-xl font-black text-light-primary font-code block mt-0.5">
              {String(patientsAhead).padStart(2, '0')}
            </span>
          </div>
          <div className="p-3 bg-accent/20 rounded-xl border border-accent/40">
            <span className="text-[11px] text-on-accent block font-medium">Est. Waiting</span>
            <span className="font-headline text-lg sm:text-xl font-black text-on-accent font-code block mt-0.5">
              {token.estimatedWaitMinutes} mins
            </span>
          </div>
        </div>

        {/* Doctor and Patient metadata */}
        <div className="space-y-1.5 text-xs text-light-on-surface-variant mb-6 bg-light-surface-variant/40 p-3 rounded-lg border border-light-outline/60">
          <div className="flex justify-between">
            <span>Patient:</span>
            <span className="font-semibold text-light-primary">{token.patientName} ({token.gender}, {token.age} yrs)</span>
          </div>
          <div className="flex justify-between">
            <span>Doctor Assigned:</span>
            <span className="font-semibold text-light-primary">{token.assignedDoctorName || 'Dr. Rajesh Sharma'}</span>
          </div>
          <div className="flex justify-between">
            <span>Registration Time:</span>
            <span className="font-code font-medium text-light-primary">{token.registeredAt}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {onPrint && (
            <button
              onClick={onPrint}
              className="flex-1 py-2.5 px-4 rounded-lg bg-light-surface border-2 border-light-primary hover:bg-light-primary hover:text-white text-light-primary font-headline text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print OPD Slip
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="flex-1 py-2.5 px-4 rounded-lg bg-accent hover:brightness-95 text-on-accent font-headline text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">timeline</span>
              Live Queue Tracker
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { PatientToken } from '../../types';
import { StatusBadge } from './StatusBadge';
import { PriorityIndicator } from './PriorityIndicator';
import { Button } from './Button';
import { Activity, Printer, ArrowRight, Building2, QrCode } from 'lucide-react';

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
    <div className={`glass-card overflow-hidden shadow-lg border border-slate-200/80 rounded-2xl ${className}`}>
      {/* Top Banner */}
      <div className="bg-[#0F766E] text-white px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-200 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-teal-100">
            Live OPD Digital Token
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PriorityIndicator priority={token.priority} />
          <StatusBadge status={token.status} />
        </div>
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
      <div className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-5 border-b border-slate-100">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              Your Allocated Token
            </span>
            <div className="text-5xl font-black text-teal-700 tracking-tight font-mono">
              {token.tokenNumber}
            </div>
            <div className="mt-2 text-xs font-semibold text-slate-800 flex items-center justify-center sm:justify-start gap-1.5">
              <Building2 className="w-4 h-4 text-teal-700" />
              <span>{token.department}</span>
              <span className="text-slate-500">• {token.roomNumber || 'Room 12'}</span>
            </div>
          </div>

          {/* QR Code Preview Box */}
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div className="w-20 h-20 bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-center text-slate-900 shadow-inner">
              <QrCode className="w-16 h-16 text-slate-800" />
            </div>
            <span className="font-mono text-[10px] text-slate-500 mt-1.5 font-bold tracking-wider">
              {token.patientId}
            </span>
          </div>
        </div>

        {/* Live Wait Diagnostics Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white/80 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 block font-medium">Now Serving</span>
            <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono block mt-0.5 tabular-nums">
              {currentServingTokenNumber}
            </span>
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 block font-medium">Ahead of You</span>
            <span className="text-lg sm:text-xl font-bold text-[#D97706] font-mono block mt-0.5 tabular-nums">
              {String(patientsAhead).padStart(2, '0')}
            </span>
          </div>
          <div className="p-3 bg-[#E6F4F1]/80 rounded-xl border border-[#0F766E]/20 shadow-xs">
            <span className="text-[11px] text-[#0F766E] block font-medium">Est. Wait</span>
            <span className="text-lg sm:text-xl font-bold text-[#0F766E] font-mono block mt-0.5 tabular-nums">
              {token.estimatedWaitMinutes}m
            </span>
          </div>
        </div>

        {/* Doctor and Patient metadata */}
        <div className="space-y-1.5 text-xs text-slate-600 bg-white/70 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200">
          <div className="flex justify-between">
            <span>Patient Name:</span>
            <strong className="text-slate-900">{token.patientName}</strong>
          </div>
          <div className="flex justify-between">
            <span>Assigned Doctor:</span>
            <strong className="text-slate-900">{token.assignedDoctorName || 'Dr. Rajesh Sharma, MD'}</strong>
          </div>
          <div className="flex justify-between">
            <span>Registration Time:</span>
            <strong className="text-slate-900 font-mono">{token.registeredAt}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {onViewDetails && (
            <Button
              variant="primary"
              size="md"
              className="flex-1 justify-center"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onViewDetails}
            >
              Track Live Queue
            </Button>
          )}
          {onPrint && (
            <Button
              variant="outline"
              size="md"
              icon={<Printer className="w-4 h-4" />}
              onClick={onPrint}
            >
              Print Slip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

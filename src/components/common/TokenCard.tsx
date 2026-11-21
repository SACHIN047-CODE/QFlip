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
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {/* Top Banner */}
      <div className="bg-teal-800 text-white px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-200" />
          <span className="text-xs font-bold uppercase tracking-wider text-teal-100">
            Live OPD Digital Token
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PriorityIndicator priority={token.priority} />
          <StatusBadge status={token.status} />
        </div>
      </div>

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
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block font-medium">Now Serving</span>
            <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono block mt-0.5">
              {currentServingTokenNumber}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block font-medium">Ahead of You</span>
            <span className="text-lg sm:text-xl font-bold text-amber-600 font-mono block mt-0.5">
              {String(patientsAhead).padStart(2, '0')}
            </span>
          </div>
          <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
            <span className="text-[11px] text-teal-800 block font-medium">Est. Wait</span>
            <span className="text-lg sm:text-xl font-bold text-teal-700 font-mono block mt-0.5">
              {token.estimatedWaitMinutes}m
            </span>
          </div>
        </div>

        {/* Doctor and Patient metadata */}
        <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
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

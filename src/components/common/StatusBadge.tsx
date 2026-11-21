import React from 'react';
import { TokenStatus, PriorityLevel } from '../../types';

interface StatusBadgeProps {
  status?: TokenStatus | string;
  priority?: PriorityLevel;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, priority, className = '' }) => {
  if (priority) {
    switch (priority) {
      case 'Emergency':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-[#DC2626] border border-red-200 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
            EMERGENCY
          </span>
        );
      case 'Senior':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
            Senior Citizen
          </span>
        );
      case 'Pediatric':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            Pediatric
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
            Standard OPD
          </span>
        );
    }
  }

  switch (status) {
    case 'IN_CONSULTATION':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
          In Consultation
        </span>
      );
    case 'WAITING':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
          Waiting in Queue
        </span>
      );
    case 'COMPLETED':
    case 'DISPENSED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-[#16A34A] border border-green-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
          {status === 'DISPENSED' ? 'Dispensed' : 'Completed'}
        </span>
      );
    case 'SKIPPED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 line-through ${className}`}>
          Skipped
        </span>
      );
    case 'PROCESSING':
    case 'DISPENSING':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-[#D97706] border border-amber-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
          Processing
        </span>
      );
    case 'READY_FOR_PICKUP':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-[#16A34A] border border-green-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
          Ready for Pickup
        </span>
      );
    case 'CRITICAL':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-[#DC2626] border border-red-300 ${className}`}>
          CRITICAL ALERT
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 ${className}`}>
          {status || 'Unknown'}
        </span>
      );
  }
};

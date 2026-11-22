import React from 'react';
import { PriorityLevel } from '../../types';

interface PriorityIndicatorProps {
  priority: PriorityLevel | string;
  className?: string;
  showText?: boolean;
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  className = '',
  showText = true,
}) => {
  const norm = String(priority).toLowerCase();

  if (norm === 'emergency' || norm === 'critical') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-[#DC2626] border border-red-200 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
        {showText && <span>Emergency</span>}
      </span>
    );
  }

  if (norm === 'urgent') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-[#D97706] border border-amber-200 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
        {showText && <span>Urgent</span>}
      </span>
    );
  }

  if (norm === 'senior') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
        {showText && <span>Senior Citizen</span>}
      </span>
    );
  }

  if (norm === 'pediatric') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
        {showText && <span>Pediatric</span>}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      {showText && <span>Standard</span>}
    </span>
  );
};


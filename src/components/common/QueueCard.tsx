import React from 'react';
import { PriorityIndicator } from './PriorityIndicator';
import { PatientToken } from '../../types';

interface QueueCardProps {
  token: PatientToken;
  isSelected?: boolean;
  onClick?: () => void;
  onCall?: () => void;
}

export const QueueCard: React.FC<QueueCardProps> = ({
  token,
  isSelected = false,
  onClick,
  onCall,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? 'bg-[#E6F4F1]/75 border-[#0F766E] shadow-sm ring-1 ring-[#0F766E]'
            : 'glass-surface border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-bold text-slate-900 tracking-tight">
            {token.tokenNumber}
          </span>
          <PriorityIndicator priority={token.priority} />
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          #{token.tokenNumber}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-800 truncate max-w-[160px]">
            {token.patientName}
          </div>
          <div className="text-[11px] text-slate-500">
            {token.age}y • {token.gender}
          </div>
        </div>

        {onCall && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCall();
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#0F766E] hover:bg-[#115E59] text-white transition-colors shadow-sm"
          >
            Call
          </button>
        )}
      </div>

      {token.symptoms && token.symptoms.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-slate-500 truncate">
          <span className="font-medium text-slate-600">Symptoms:</span>
          <span>{token.symptoms.slice(0, 2).join(', ')}</span>
        </div>
      )}
    </div>
  );
};


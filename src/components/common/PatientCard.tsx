import React from 'react';
import { PriorityIndicator } from './PriorityIndicator';
import { PriorityLevel } from '../../types';

interface PatientCardProps {
  patientName: string;
  patientId?: string;
  age?: number | string;
  gender?: string;
  phone?: string;
  abhaId?: string;
  priority?: PriorityLevel | string;
  department?: string;
  symptoms?: string[];
  vitalSigns?: {
    bp?: string;
    pulse?: string;
    temperature?: string;
    spo2?: string;
  };
  className?: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patientName,
  patientId,
  age,
  gender,
  phone,
  abhaId,
  priority,
  department,
  symptoms,
  vitalSigns,
  className = '',
}) => {
  return (
    <div className={`p-4 sm:p-5 glass-card rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center font-bold text-xs flex-shrink-0 border border-[#0F766E]/20">
            {patientName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">{patientName}</h4>
              {priority && <PriorityIndicator priority={priority} />}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {age && `${age} yrs`} {gender && `• ${gender}`} {phone && `• ${phone}`}
            </div>
          </div>
        </div>

        {patientId && (
          <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            {patientId}
          </span>
        )}
      </div>

      {abhaId && (
        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-100">
          <span>ABHA ID:</span>
          <span className="font-mono font-medium text-slate-700">{abhaId}</span>
          {department && <span className="ml-auto text-[#0F766E] font-semibold">{department}</span>}
        </div>
      )}

      {vitalSigns && (
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
          <div className="p-2 bg-white/70 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">BP</span>
            <span className="text-xs font-bold text-slate-900 font-mono">{vitalSigns.bp || '120/80'}</span>
          </div>
          <div className="p-2 bg-white/70 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Pulse</span>
            <span className="text-xs font-bold text-slate-900 font-mono">{vitalSigns.pulse || '74'} bpm</span>
          </div>
          <div className="p-2 bg-white/70 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Temp</span>
            <span className="text-xs font-bold text-slate-900 font-mono">{vitalSigns.temperature || '98.6'}°F</span>
          </div>
          <div className="p-2 bg-white/70 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">SpO2</span>
            <span className="text-xs font-bold text-[#16A34A] font-mono">{vitalSigns.spo2 || '99'}%</span>
          </div>
        </div>
      )}

      {symptoms && symptoms.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {symptoms.map((s, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-lg bg-[#E6F4F1] text-[#0F766E] font-semibold border border-[#0F766E]/20"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};


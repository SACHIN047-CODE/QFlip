import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { HospitalDepartment, HospitalResource } from '../../types';
import { BentoCard } from '../../components/common/BentoCard';

export const DepartmentsManagement: React.FC = () => {
  const [departments, setDepartments] = useState<HospitalDepartment[]>([]);

  useEffect(() => {
    adminService.getDepartments().then(setDepartments);
  }, []);

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Clinical Specialty Logistics
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Hospital Departments &amp; Flow Capacity
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((d) => (
          <BentoCard key={d.id} variant="solid" padding="md" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-code text-xs font-bold text-[#0F766E]">{d.code}</span>
                <h3 className="text-base font-bold text-slate-900">{d.name}</h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  d.capacityStatus === 'OVERLOAD'
                    ? 'bg-red-50 text-[#DC2626] border border-red-200'
                    : d.capacityStatus === 'ELEVATED'
                    ? 'bg-amber-50 text-[#D97706] border border-amber-200'
                    : 'bg-green-50 text-[#16A34A] border border-green-200'
                }`}
              >
                {d.capacityStatus}
              </span>
            </div>

            <div className="text-xs text-slate-500">
              Head: <strong className="text-slate-800">{d.headDoctor}</strong>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200 text-center text-xs">
              <div>
                <span className="text-[10px] uppercase block text-slate-400 font-semibold">Waiting</span>
                <span className="font-mono font-bold text-[#0F766E] text-sm tabular-nums">{d.waitingCount}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase block text-slate-400 font-semibold">Completed</span>
                <span className="font-mono font-bold text-[#16A34A] text-sm tabular-nums">{d.completedTodayCount}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase block text-slate-400 font-semibold">Avg Wait</span>
                <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">{d.avgWaitTimeMinutes}m</span>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              <span>Assigned Rooms: </span>
              <strong className="text-slate-800">{d.rooms.join(', ')}</strong>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  );
};

export const ResourceManagement: React.FC = () => {
  const [resources, setResources] = useState<HospitalResource[]>([]);

  useEffect(() => {
    adminService.getResources().then(setResources);
  }, []);

  const handleUpdate = (id: string, change: number) => {
    const res = resources.find((r) => r.id === id);
    if (!res) return;
    const newOccupied = Math.min(res.total, Math.max(0, res.occupied + change));
    const newAvailable = res.total - newOccupied;
    const status = newAvailable <= 3 ? 'CRITICAL' : newAvailable <= 6 ? 'LOW' : 'OPTIMAL';

    adminService.updateResource(id, { occupied: newOccupied, available: newAvailable, status }).then((updated) => {
      setResources(resources.map((r) => (r.id === id ? updated : r)));
    });
  };

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Asset &amp; Bed Allocation
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Hospital Beds, Stretchers &amp; Equipment
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((r) => (
          <BentoCard key={r.id} variant="glass" padding="md" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
              <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">{r.category}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  r.status === 'CRITICAL'
                    ? 'bg-red-50 text-[#DC2626] border border-red-200'
                    : r.status === 'LOW'
                    ? 'bg-amber-50 text-[#D97706] border border-amber-200'
                    : 'bg-green-50 text-[#16A34A] border border-green-200'
                }`}
              >
                {r.status}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{r.name}</h3>
              <div className="text-xs text-slate-500">{r.department}</div>
            </div>

            <div className="p-4 bg-white/80 rounded-xl border border-slate-200 flex items-center justify-between text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Total Capacity</span>
                <span className="font-code font-bold text-slate-900 text-base">{r.total}</span>
              </div>
              <div className="border-x border-slate-200 px-4">
                <span className="text-[10px] text-slate-500 uppercase block">Occupied</span>
                <span className="font-code font-bold text-[#DC2626] text-base">{r.occupied}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Available</span>
                <span className="font-code font-bold text-[#16A34A] text-base">{r.available}</span>
              </div>
            </div>

            {/* Quick adjust controls */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-500">Update Live Allocation:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleUpdate(r.id, 1)}
                  disabled={r.available === 0}
                  className="px-2.5 py-1 bg-[#0F766E] text-white text-xs font-bold rounded-lg hover:bg-[#115E59] disabled:opacity-40 transition-colors"
                >
                  + Admit
                </button>
                <button
                  onClick={() => handleUpdate(r.id, -1)}
                  disabled={r.occupied === 0}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  - Discharge
                </button>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  );
};

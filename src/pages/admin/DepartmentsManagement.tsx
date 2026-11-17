import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { HospitalDepartment, HospitalResource } from '../../types';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((d) => (
          <div key={d.id} className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <div>
                <span className="font-headline font-code text-xs font-bold text-secondary">{d.code}</span>
                <h3 className="font-headline text-title-md font-bold text-light-primary">{d.name}</h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  d.capacityStatus === 'OVERLOAD'
                    ? 'bg-danger/15 text-danger border border-danger/30'
                    : d.capacityStatus === 'ELEVATED'
                    ? 'bg-warning/20 text-on-warning border border-warning/40'
                    : 'bg-success/15 text-success border border-success/30'
                }`}
              >
                {d.capacityStatus}
              </span>
            </div>

            <div className="text-xs text-light-on-surface-variant">
              Head: <strong className="text-light-primary">{d.headDoctor}</strong>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-light-surface-variant p-3 rounded-xl border border-light-outline text-center text-xs">
              <div>
                <span className="text-[10px] uppercase block text-light-on-surface-variant">Waiting</span>
                <span className="font-code font-bold text-secondary text-sm">{d.waitingCount}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase block text-light-on-surface-variant">Completed</span>
                <span className="font-code font-bold text-success text-sm">{d.completedTodayCount}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase block text-light-on-surface-variant">Avg Wait</span>
                <span className="font-code font-bold text-light-primary text-sm">{d.avgWaitTimeMinutes}m</span>
              </div>
            </div>

            <div className="text-xs text-light-on-surface-variant">
              <span>Assigned Rooms: </span>
              <strong className="text-light-primary">{d.rooms.join(', ')}</strong>
            </div>
          </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((r) => (
          <div key={r.id} className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">{r.category}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  r.status === 'CRITICAL'
                    ? 'bg-danger/15 text-danger border border-danger/30'
                    : r.status === 'LOW'
                    ? 'bg-warning/20 text-on-warning border border-warning/40'
                    : 'bg-success/15 text-success border border-success/30'
                }`}
              >
                {r.status}
              </span>
            </div>

            <div>
              <h3 className="font-headline text-title-md font-bold text-light-primary">{r.name}</h3>
              <div className="text-xs text-light-on-surface-variant">{r.department}</div>
            </div>

            <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline flex items-center justify-between text-center">
              <div>
                <span className="text-[10px] text-light-on-surface-variant uppercase block">Total Capacity</span>
                <span className="font-code font-bold text-light-primary text-base">{r.total}</span>
              </div>
              <div className="border-x border-light-outline px-4">
                <span className="text-[10px] text-light-on-surface-variant uppercase block">Occupied</span>
                <span className="font-code font-bold text-danger text-base">{r.occupied}</span>
              </div>
              <div>
                <span className="text-[10px] text-light-on-surface-variant uppercase block">Available</span>
                <span className="font-code font-bold text-success text-base">{r.available}</span>
              </div>
            </div>

            {/* Quick adjust controls */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <span className="text-[11px] font-semibold text-light-on-surface-variant">Update Live Allocation:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleUpdate(r.id, 1)}
                  disabled={r.available === 0}
                  className="px-2.5 py-1 bg-light-primary text-white text-xs font-bold rounded hover:bg-slate-800 disabled:opacity-40"
                >
                  + Admit
                </button>
                <button
                  onClick={() => handleUpdate(r.id, -1)}
                  disabled={r.occupied === 0}
                  className="px-2.5 py-1 bg-light-surface border border-light-outline text-light-primary text-xs font-bold rounded hover:bg-light-surface-variant disabled:opacity-40"
                >
                  - Discharge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

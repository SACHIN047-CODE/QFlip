import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchBar } from '../../components/common/SearchBar';
import { PatientToken } from '../../types';

export const PatientQueueList: React.FC = () => {
  const { tokens, updateStatus } = useQueue();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filtered = tokens.filter((t) => {
    const matchesSearch =
      t.patientName.toLowerCase().includes(search.toLowerCase()) ||
      t.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search);
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const columns: Column<PatientToken>[] = [
    {
      key: 'tokenNumber',
      header: 'Token #',
      render: (row) => (
        <span className="font-headline font-code font-bold text-secondary text-sm">
          {row.tokenNumber}
        </span>
      ),
    },
    {
      key: 'patientName',
      header: 'Patient Details',
      render: (row) => (
        <div>
          <div className="font-bold text-light-primary">{row.patientName}</div>
          <div className="text-[10px] text-light-on-surface-variant font-code">
            {row.patientId} • {row.gender}, {row.age}y
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (row) => (
        <div>
          <span className="font-semibold text-light-primary">{row.department}</span>
          <span className="block text-[10px] text-light-on-surface-variant">{row.roomNumber}</span>
        </div>
      ),
    },
    {
      key: 'symptoms',
      header: 'Symptoms',
      render: (row) => (
        <div className="max-w-xs truncate text-[11px] text-light-on-surface-variant">
          {row.symptoms.join(', ')}
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => <StatusBadge priority={row.priority} />,
    },
    {
      key: 'status',
      header: 'Queue Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'registeredAt',
      header: 'Time',
      render: (row) => <span className="font-code text-xs">{row.registeredAt}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status === 'WAITING' && (
            <button
              onClick={() => updateStatus(row.id, 'IN_CONSULTATION')}
              className="px-2.5 py-1 bg-secondary text-white rounded text-xs font-bold hover:bg-secondary/90 transition-colors"
            >
              Call In
            </button>
          )}
          {row.status === 'IN_CONSULTATION' && (
            <button
              onClick={() => updateStatus(row.id, 'COMPLETED')}
              className="px-2.5 py-1 bg-success text-white rounded text-xs font-bold hover:bg-success/90 transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-light-outline">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            OPD Roster Management
          </span>
          <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
            Patient Queue Registry
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-light-on-surface-variant">Filter Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs rounded-lg border border-light-outline bg-white px-2.5 py-1.5 font-bold text-light-primary"
          >
            <option value="ALL">All Patients</option>
            <option value="Emergency">Emergency Only</option>
            <option value="Senior">Senior Citizens</option>
            <option value="Pediatric">Pediatric</option>
            <option value="Normal">Normal OPD</option>
          </select>
        </div>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Filter by patient name, token number, or mobile..."
      />

      <DataTable columns={columns} data={filtered} />
    </div>
  );
};

export const DoctorSchedule: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Clinical Duty Management
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Doctor Schedule &amp; Roster
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-light-surface p-6 rounded-2xl border border-light-outline shadow-card space-y-3">
          <span className="text-[10px] uppercase font-bold text-secondary block">Today's Shift</span>
          <div className="font-headline text-lg font-bold text-light-primary">Morning OPD (OPD-12)</div>
          <div className="text-xs text-light-on-surface-variant">08:30 AM – 02:00 PM</div>
          <div className="p-2.5 bg-success/10 border border-success/30 rounded-lg text-success text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success"></span> Currently On Duty
          </div>
        </div>

        <div className="bg-light-surface p-6 rounded-2xl border border-light-outline shadow-card space-y-3">
          <span className="text-[10px] uppercase font-bold text-secondary block">Upcoming Ward Round</span>
          <div className="font-headline text-lg font-bold text-light-primary">Male Medical Ward 3</div>
          <div className="text-xs text-light-on-surface-variant">02:30 PM – 04:00 PM</div>
          <div className="text-xs text-light-on-surface-variant">18 Inpatients Assigned</div>
        </div>

        <div className="bg-light-surface p-6 rounded-2xl border border-light-outline shadow-card space-y-3">
          <span className="text-[10px] uppercase font-bold text-secondary block">On-Call Trauma Reserve</span>
          <div className="font-headline text-lg font-bold text-light-primary">Emergency Trauma Wing</div>
          <div className="text-xs text-light-on-surface-variant">Night Emergency Backup</div>
          <div className="text-xs text-light-on-surface-variant">Cluster Tele-Call Active</div>
        </div>
      </div>
    </div>
  );
};

export const PrescriptionManager: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Clinical Prescribing Engine
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Standard Rx Bundles &amp; Templates
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 bg-light-surface rounded-2xl border border-light-outline shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-title-md font-bold text-light-primary">
              Acute Viral Upper Respiratory Kit
            </h3>
            <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary font-bold text-[10px]">
              Template #1
            </span>
          </div>
          <p className="text-light-on-surface-variant">
            Standard 3-drug bundle: Amoxicillin-Clav 625mg + Paracetamol 650mg + Pantoprazole 40mg.
          </p>
          <button
            onClick={() => alert('Template #1 applied to current patient!')}
            className="px-4 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90"
          >
            Load into Active Consultation
          </button>
        </div>

        <div className="p-5 bg-light-surface rounded-2xl border border-light-outline shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-title-md font-bold text-light-primary">
              Pre-Hypertension Starter Kit
            </h3>
            <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary font-bold text-[10px]">
              Template #2
            </span>
          </div>
          <p className="text-light-on-surface-variant">
            Standard 30-day bundle: Telmisartan 40mg + Amlodipine 5mg + Low Sodium Diet Advice.
          </p>
          <button
            onClick={() => alert('Template #2 applied to current patient!')}
            className="px-4 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90"
          >
            Load into Active Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

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


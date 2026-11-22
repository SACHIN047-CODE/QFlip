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
        <span className="font-mono font-bold text-[#0F766E] text-sm tabular-nums">
          {row.tokenNumber}
        </span>
      ),
    },
    {
      key: 'patientName',
      header: 'Patient Details',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900">{row.patientName}</div>
          <div className="text-[10px] text-slate-500 font-mono">
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
          <span className="font-semibold text-slate-900">{row.department}</span>
          <span className="block text-[10px] text-slate-500">{row.roomNumber}</span>
        </div>
      ),
    },
    {
      key: 'symptoms',
      header: 'Symptoms',
      render: (row) => (
        <div className="max-w-xs truncate text-[11px] text-slate-500">
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
      render: (row) => <span className="font-mono text-xs text-slate-600">{row.registeredAt}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status === 'WAITING' && (
            <button
              onClick={() => updateStatus(row.id, 'IN_CONSULTATION')}
              className="px-2.5 py-1 bg-[#0F766E] text-white rounded-lg text-xs font-bold hover:bg-[#115E59] transition-colors shadow-xs"
            >
              Call In
            </button>
          )}
          {row.status === 'IN_CONSULTATION' && (
            <button
              onClick={() => updateStatus(row.id, 'COMPLETED')}
              className="px-2.5 py-1 bg-[#16A34A] text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors shadow-xs"
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
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            OPD Roster Management
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Patient Queue Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete list of registered outpatients awaiting consultation across OPD wings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 font-bold text-slate-900 shadow-xs focus:border-[#0F766E]"
          >
            <option value="ALL">All Patients ({tokens.length})</option>
            <option value="Emergency">Emergency Only</option>
            <option value="Senior">Senior Citizens</option>
            <option value="Pediatric">Pediatric</option>
            <option value="Normal">Normal OPD</option>
          </select>
        </div>
      </div>

      <div className="glass-card p-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Filter by patient name, token number, or mobile..."
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-1">
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
};


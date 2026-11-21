import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityIndicator } from '../../components/common/PriorityIndicator';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { BentoCard } from '../../components/common/BentoCard';
import { PatientToken } from '../../types';
import { Printer, Ban } from 'lucide-react';

export const TokenManagement: React.FC = () => {
  const { tokens, updateStatus } = useQueue();
  const [search, setSearch] = useState('');

  const filtered = tokens.filter(
    (t) =>
      t.patientName.toLowerCase().includes(search.toLowerCase()) ||
      t.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search)
  );

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
    { key: 'patientName', header: 'Patient Name' },
    { key: 'phone', header: 'Mobile Number' },
    { key: 'department', header: 'Department' },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => <PriorityIndicator priority={row.priority} />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Re-print
          </button>
          {row.status === 'WAITING' && (
            <button
              onClick={() => updateStatus(row.id, 'SKIPPED')}
              className="px-2.5 py-1 text-red-600 hover:bg-red-50 border border-red-200 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              Cancel / Skip
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hospital Token Master Registry"
        subtitle="Live registry of all patient queue tokens across OPD counters"
      />

      <div className="glass-card p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search token, patient name or mobile number..." />
      </div>

      <BentoCard variant="solid" padding="none" className="overflow-hidden">
        <DataTable columns={columns} data={filtered} />
      </BentoCard>
    </div>
  );
};

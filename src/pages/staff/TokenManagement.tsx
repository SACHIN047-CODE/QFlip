import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchBar } from '../../components/common/SearchBar';
import { PatientToken } from '../../types';

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
        <span className="font-headline font-code font-bold text-secondary text-sm">
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
      render: (row) => <StatusBadge priority={row.priority} />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      header: 'Counter Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-2.5 py-1 bg-light-surface-variant hover:bg-light-outline border border-light-outline rounded text-xs font-semibold"
          >
            Re-print
          </button>
          {row.status === 'WAITING' && (
            <button
              onClick={() => updateStatus(row.id, 'SKIPPED')}
              className="px-2.5 py-1 text-danger hover:bg-danger/10 border border-danger/30 rounded text-xs font-semibold"
            >
              Cancel / Skip
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Front Desk Queue Administration
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Hospital Token Master Registry
        </h1>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search token, patient name or mobile..." />

      <DataTable columns={columns} data={filtered} />
    </div>
  );
};

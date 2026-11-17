import React, { useState } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  itemsPerPage?: number;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found',
  onRowClick,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="bg-light-surface rounded-xl border border-light-outline p-12 text-center shadow-card">
        <div className="inline-block w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-3 text-xs font-semibold text-light-on-surface-variant">Loading records...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-light-surface rounded-xl border border-light-outline p-12 text-center shadow-card">
        <span className="material-symbols-outlined text-4xl text-light-outline mb-2">inbox</span>
        <div className="text-sm font-semibold text-light-primary">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="bg-light-surface rounded-xl border border-light-outline shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-body">
          <thead className="bg-light-surface-variant border-b border-light-outline text-light-on-surface-variant font-label uppercase text-[11px] tracking-wider">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-4 py-3.5 font-bold ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-light-outline-variant">
            {paginatedData.map((row, idx) => (
              <tr
                key={row.id || idx}
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition-colors hover:bg-light-surface-variant/40 ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 text-light-primary ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-light-outline flex items-center justify-between text-xs text-light-on-surface-variant bg-light-surface-variant/20">
          <div>
            Showing <strong className="text-light-primary">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-light-primary">{Math.min(currentPage * itemsPerPage, data.length)}</strong> of{' '}
            <strong className="text-light-primary">{data.length}</strong> records
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-light-outline bg-white hover:bg-light-surface-variant disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <span className="px-2 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-light-outline bg-white hover:bg-light-surface-variant disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchBar } from '../../components/common/SearchBar';
import { PatientToken } from '../../types';

export const TokenManagement: React.FC = () => {
  const { tokens, skippedTokens, updateStatus, skip, rejoin } = useQueue();
  const [activeTab, setActiveTab] = useState<'all' | 'skipped' | 'buffer'>('all');
  const [search, setSearch] = useState('');

  // Scanner state
  const [scanInput, setScanInput] = useState('');
  const [scanMessage, setScanMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [scannedToken, setScannedToken] = useState<PatientToken | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Filter lists based on tab and search
  const activeList =
    activeTab === 'skipped'
      ? skippedTokens
      : activeTab === 'buffer'
      ? tokens.filter((t) => t.isBuffer)
      : tokens;

  const filtered = activeList.filter(
    (t) =>
      t.patientName.toLowerCase().includes(search.toLowerCase()) ||
      t.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search)
  );

  const handleScanLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setScanMessage(null);
    setScannedToken(null);

    const term = scanInput.trim().toUpperCase();
    if (!term) {
      setScanMessage({ type: 'error', text: 'Please enter or scan a token number or QR code.' });
      return;
    }

    const found = tokens.find(
      (t) => t.tokenNumber.toUpperCase() === term || t.id === term || t.phone === term
    );

    if (!found) {
      setScanMessage({ type: 'error', text: `Token "${term}" not found in today's hospital registry.` });
      return;
    }

    setScannedToken(found);

    if (found.status === 'SKIPPED' || found.status === 'SKIPPED_AWAITING_RECEPTION') {
      setScanMessage({
        type: 'info',
        text: `Token ${found.tokenNumber} is currently SKIPPED. Confirm physical arrival to rejoin main queue with 3-place penalty.`
      });
    } else if (found.status === 'WAITING') {
      setScanMessage({
        type: 'error',
        text: `Duplicate Scan: Token ${found.tokenNumber} is already active in the main waiting queue.`
      });
    } else if (found.status === 'IN_CONSULTATION') {
      setScanMessage({
        type: 'error',
        text: `Duplicate Scan: Token ${found.tokenNumber} is already inside the consultation room.`
      });
    } else if (found.status === 'COMPLETED') {
      setScanMessage({
        type: 'error',
        text: `Token ${found.tokenNumber} has already completed consultation today.`
      });
    }
  };

  const handleConfirmReentry = async (tokenNumberOrId: string) => {
    try {
      setIsVerifying(true);
      setScanMessage(null);
      const res = await rejoin(tokenNumberOrId, 'Reception Front Desk');
      setScanMessage({
        type: 'success',
        text: `Physical arrival verified! Token ${res.token.tokenNumber} (${res.token.patientName}) rejoined the main queue at position #${res.newPosition} with 3-position penalty applied.`
      });
      setScannedToken(null);
      setScanInput('');
    } catch (err: any) {
      setScanMessage({
        type: 'error',
        text: err.message || 'Failed to rejoin patient to queue.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSkipPatient = async (tokenId: string, tokenNum: string) => {
    try {
      await skip(tokenId, 'Skipped by counter receptionist – patient not present');
      setScanMessage({
        type: 'info',
        text: `Token ${tokenNum} moved to separate Skipped Patients Queue awaiting reception check-in.`
      });
    } catch (err: any) {
      setScanMessage({ type: 'error', text: err.message || 'Failed to skip patient.' });
    }
  };

  const columns: Column<PatientToken>[] = [
    {
      key: 'tokenNumber',
      header: 'Token #',
      render: (row) => (
        <div>
          <span className="font-headline font-code font-bold text-secondary text-sm">
            {row.tokenNumber}
          </span>
          {row.isBuffer && (
            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-300">
              Buffer Quota
            </span>
          )}
          {row.reentryPenaltyApplied && (
            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              +3 Penalty Re-entry
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'patientName',
      header: 'Patient Details',
      render: (row) => (
        <div>
          <div className="font-bold text-light-primary">{row.patientName}</div>
          <div className="text-[10px] text-light-on-surface-variant font-code">
            {row.gender}, {row.age}y • {row.phone}
          </div>
        </div>
      ),
    },
    { key: 'department', header: 'Department' },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => <StatusBadge priority={row.priority} />,
    },
    {
      key: 'status',
      header: 'Current Status',
      render: (row) => (
        <div>
          <StatusBadge status={row.status} />
          {row.status === 'SKIPPED' && (
            <span className="block text-[10px] text-amber-700 font-semibold mt-0.5">
              Awaiting Physical Check-in
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Counter Actions',
      render: (row) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* If skipped: allow reception verification and rejoining with 3-position penalty */}
          {(row.status === 'SKIPPED' || row.status === 'SKIPPED_AWAITING_RECEPTION') && (
            <button
              onClick={() => handleConfirmReentry(row.tokenNumber)}
              disabled={isVerifying}
              className="px-2.5 py-1 bg-secondary text-white hover:bg-secondary/90 rounded text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xs">how_to_reg</span>
              <span>Verify &amp; Rejoin (+3)</span>
            </button>
          )}

          {row.status === 'WAITING' && (
            <button
              onClick={() => handleSkipPatient(row.id, row.tokenNumber)}
              className="px-2.5 py-1 text-danger hover:bg-danger/10 border border-danger/30 rounded text-xs font-semibold transition-colors"
            >
              Skip Patient
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="px-2 py-1 bg-light-surface-variant hover:bg-light-outline border border-light-outline rounded text-xs font-semibold text-light-primary"
          >
            Re-print
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
          Front Desk Queue Administration
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Hospital Token Master Registry
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor active OPD queues, verify physical re-entry of skipped patients, and manage capacity quotas.
        </p>
      </div>

      {/* Reception QR/Token Scan & Physical Arrival Verification Panel */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-100">
              <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Physical Re-entry &amp; Token Verification Desk
              </h3>
              <p className="text-[11px] text-slate-500">
                Scan patient token barcode or enter token number to verify physical arrival and apply three-position penalty.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#E6F4F1] text-[#0F766E] text-xs font-bold font-mono self-start sm:self-center border border-[#0F766E]/20">
            {skippedTokens.length} Skipped Patient{skippedTokens.length === 1 ? '' : 's'} Waiting
          </span>
        </div>

        <form onSubmit={handleScanLookup} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              pin
            </span>
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Scan QR or enter token number (e.g. OPD-098, OPD-104)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold text-slate-900 focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]/20 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0F766E] text-white font-bold text-xs rounded-xl hover:bg-[#115E59] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">search</span>
            <span>Verify Token</span>
          </button>
        </form>

        {/* Scan Message Alert */}
        {scanMessage && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-3 ${
              scanMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : scanMessage.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">
                {scanMessage.type === 'success'
                  ? 'check_circle'
                  : scanMessage.type === 'error'
                  ? 'error'
                  : 'info'}
              </span>
              <span>{scanMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setScanMessage(null)}
              className="text-xs hover:opacity-70"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        )}

        {/* Scanned Token Preview Card if Skipped */}
        {scannedToken && (
          <div className="p-4 bg-white/80 rounded-xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-black text-[#0F766E]">
                    {scannedToken.tokenNumber}
                  </span>
                  <StatusBadge status={scannedToken.status} priority={scannedToken.priority} />
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">
                  {scannedToken.patientName} • {scannedToken.department} ({scannedToken.roomNumber || 'OPD Room 12'})
                </div>
                <div className="text-[11px] text-slate-500">
                  Phone: {scannedToken.phone} • Registered: {scannedToken.registeredAt}
                </div>
              </div>

              {(scannedToken.status === 'SKIPPED' || scannedToken.status === 'SKIPPED_AWAITING_RECEPTION') && (
                <button
                  type="button"
                  onClick={() => handleConfirmReentry(scannedToken.tokenNumber)}
                  disabled={isVerifying}
                  className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Confirm Arrival &amp; Rejoin Queue (+3 Penalty)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'all'
              ? 'bg-[#0F766E] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>All Hospital Tokens</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
            {tokens.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('skipped')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'skipped'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span className="material-symbols-outlined text-sm">fast_forward</span>
          <span>Skipped Patients Queue</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/30 text-[10px] font-bold">
            {skippedTokens.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('buffer')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'buffer'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200'
          }`}
        >
          <span className="material-symbols-outlined text-sm">hourglass_top</span>
          <span>Extended Buffer Quota</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/30 text-[10px]">
            {tokens.filter((t) => t.isBuffer).length}
          </span>
        </button>
      </div>

      <div className="glass-card p-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Filter by token number, patient name or mobile..."
        />
      </div>

      {filtered.length === 0 ? (
        <div className="p-10 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 space-y-2">
          <span className="material-symbols-outlined text-3xl text-slate-300">inbox</span>
          <p className="font-semibold text-slate-900">No active patient records available in this view.</p>
          <p className="text-[11px]">Any new OPD slips or skipped patients will be listed here in real time.</p>
        </div>
      ) : (
        <div className="bento-card-solid rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
          <DataTable columns={columns} data={filtered} />
        </div>
      )}
    </div>
  );
};

export default TokenManagement;

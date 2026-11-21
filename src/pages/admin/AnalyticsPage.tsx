import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartContainer } from '../../components/common/LoadingSpinner';
import { adminService } from '../../services/adminService';
import { Modal } from '../../components/common/Modal';
import { SupportTicket, TicketStatus } from '../../types';

export const AnalyticsPage: React.FC = () => {
  // Peak hour data
  const peakHourData = [
    { hour: '07:00 AM', registrations: 18, waitMins: 8 },
    { hour: '08:00 AM', registrations: 45, waitMins: 14 },
    { hour: '09:00 AM', registrations: 120, waitMins: 22 },
    { hour: '10:00 AM', registrations: 195, waitMins: 38 },
    { hour: '11:00 AM', registrations: 240, waitMins: 42 },
    { hour: '12:00 PM', registrations: 180, waitMins: 28 },
    { hour: '01:00 PM', registrations: 95, waitMins: 16 },
    { hour: '02:00 PM', registrations: 50, waitMins: 10 },
  ];

  // Doctor workload data
  const doctorWorkloadData = [
    { doctor: 'Dr. Sharma (Gen Med)', patients: 68, avgConsultMins: 6.2 },
    { doctor: 'Dr. Patel (Peds)', patients: 51, avgConsultMins: 7.1 },
    { doctor: 'Dr. Singh (Ortho)', patients: 42, avgConsultMins: 8.5 },
    { doctor: 'Dr. Kumar (Cardio)', patients: 29, avgConsultMins: 10.4 },
    { doctor: 'Dr. Verma (Gynae)', patients: 59, avgConsultMins: 6.8 },
    { doctor: 'Dr. Sen (Emergency)', patients: 88, avgConsultMins: 5.5 },
  ];

  // Waiting time trends vs NHM target
  const waitTrendsData = [
    { day: 'Mon', actualWait: 28, benchmark: 20 },
    { day: 'Tue', actualWait: 22, benchmark: 20 },
    { day: 'Wed', actualWait: 19, benchmark: 20 },
    { day: 'Thu', actualWait: 18, benchmark: 20 },
    { day: 'Fri', actualWait: 24, benchmark: 20 },
    { day: 'Sat', actualWait: 16, benchmark: 20 },
  ];

  return (
    <div className="space-y-8">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Hospital Operational Intelligence
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Clinical Analytics &amp; Performance Graphs
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hour Rush Analysis */}
        <ChartContainer
          title="Peak-Hour Patient Inflow Analysis"
          subtitle="Correlation between arrival surge and waiting line build-up"
          badge="OPD Rush"
        >
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={peakHourData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DEE2E6" />
                <XAxis dataKey="hour" stroke="#495057" fontSize={10} />
                <YAxis stroke="#495057" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #DEE2E6',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  name="Arrivals"
                  stroke="#2585E8"
                  fill="#2585E8"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="waitMins"
                  name="Avg Wait (Mins)"
                  stroke="#D9534F"
                  fill="#D9534F"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Doctor Workload Comparison */}
        <ChartContainer
          title="Doctor Workload &amp; Consultation Duration"
          subtitle="Patients evaluated per clinician alongside average consultation speed"
          badge="Staffing Audit"
        >
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorWorkloadData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#DEE2E6" />
                <XAxis type="number" stroke="#495057" fontSize={10} />
                <YAxis dataKey="doctor" type="category" stroke="#495057" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #DEE2E6',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="patients" name="Patients Treated" fill="#249B69" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Waiting Time Trends vs NHM Benchmark */}
        <ChartContainer
          title="Weekly Waiting Time Trend vs NHM Benchmark"
          subtitle="Target threshold (&lt;20 mins) compliance across Civil Hospital Ambala"
          badge="Quality Benchmark"
          className="lg:col-span-2"
        >
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waitTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DEE2E6" />
                <XAxis dataKey="day" stroke="#495057" fontSize={11} />
                <YAxis stroke="#495057" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #DEE2E6',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="actualWait"
                  name="Actual Wait Time (mins)"
                  stroke="#2585E8"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  name="NHM National Benchmark (20 mins)"
                  stroke="#D9534F"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Statutory Health Records
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Hospital Operations Reports
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {[
          { title: 'Daily OPD Patient Volume Report', format: 'PDF / CSV', period: 'Today, 17 Nov 2026', size: '1.2 MB' },
          { title: 'ABHA / Ayushman Bharat Claim Summary', format: 'Excel (XLSX)', period: 'Weekly Cluster Audit', size: '2.4 MB' },
          { title: 'Jan Aushadhi Medication Stock & Dispense Log', format: 'PDF', period: 'Daily Pharmacy Audit', size: '890 KB' },
          { title: 'Clinical Laboratory Turnaround Time (TAT) Analysis', format: 'CSV', period: 'Monthly Compliance', size: '3.1 MB' },
        ].map((rep, idx) => (
          <div key={idx} className="p-5 bg-light-surface rounded-2xl border border-light-outline shadow-card space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-headline text-title-md font-bold text-light-primary">{rep.title}</h3>
                <div className="text-light-on-surface-variant mt-0.5">{rep.period}</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary font-code font-bold text-[10px]">
                {rep.format}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-light-outline">
              <span className="text-light-on-surface-variant">File size: {rep.size}</span>
              <button
                onClick={() => alert(`Generating and downloading ${rep.title}`)}
                className="px-3.5 py-1.5 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-xs">download</span>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ComplaintsManagement: React.FC = () => {
  const [tickets, setTickets] = React.useState<SupportTicket[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | TicketStatus>('ALL');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedTicket, setSelectedTicket] = React.useState<SupportTicket | null>(null);

  // Modal form states
  const [modalStatus, setModalStatus] = React.useState<TicketStatus>('OPEN');
  const [modalResolution, setModalResolution] = React.useState<string>('');
  const [modalAdminUpdate, setModalAdminUpdate] = React.useState<string>('');
  const [modalInternalNote, setModalInternalNote] = React.useState<string>('');
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const fetchTickets = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleOpenModal = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setModalStatus(ticket.status);
    setModalResolution(ticket.resolutionMessage || ticket.resolutionNote || '');
    setModalAdminUpdate('');
    setModalInternalNote('');
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const handleQuickStatusChange = async (ticket: SupportTicket, newStatus: TicketStatus) => {
    let resolutionMessage = ticket.resolutionMessage;
    if (newStatus === 'RESOLVED' && !resolutionMessage) {
      resolutionMessage = 'Issue investigated and resolved by Hospital Grievance Cell.';
    }

    try {
      const updated = await adminService.updateTicket(ticket.id, {
        status: newStatus,
        resolutionMessage,
        author: 'Chief Medical Superintendent'
      });
      setTickets((prev) => prev.map((t) => (t.id === ticket.id ? updated : t)));
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setIsSaving(true);
    try {
      const updated = await adminService.updateTicket(selectedTicket.id, {
        status: modalStatus,
        resolutionMessage: modalResolution.trim() || undefined,
        adminUpdate: modalAdminUpdate.trim() || undefined,
        internalNote: modalInternalNote.trim() || undefined,
        author: 'Chief Medical Superintendent'
      });

      setTickets((prev) => prev.map((t) => (t.id === selectedTicket.id ? updated : t)));
      setSelectedTicket(updated);
      setModalAdminUpdate('');
      setModalInternalNote('');
    } catch (err) {
      console.error('Failed to save ticket changes:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: TicketStatus | string) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-warning/15 text-on-warning border border-warning/30">
            Open
          </span>
        );
      case 'IN_PROGRESS':
      case 'INVESTIGATING':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary/15 text-secondary border border-secondary/30">
            In Progress
          </span>
        );
      case 'AWAITING_USER':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
            Awaiting User
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-success/15 text-success border border-success/30">
            Resolved ✓
          </span>
        );
      case 'CLOSED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 border border-slate-300">
            Closed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-light-surface-variant text-light-primary">
            {status}
          </span>
        );
    }
  };

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    const matchesStatus =
      statusFilter === 'ALL' ||
      t.status === statusFilter ||
      (statusFilter === 'IN_PROGRESS' && (t.status as any) === 'INVESTIGATING');

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      t.ticketId.toLowerCase().includes(q) ||
      t.subject?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.message?.toLowerCase().includes(q) ||
      t.patientName?.toLowerCase().includes(q) ||
      t.phone?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Summary counts
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'OPEN').length;
  const inProgressCount = tickets.filter(
    (t) => t.status === 'IN_PROGRESS' || (t.status as any) === 'INVESTIGATING'
  ).length;
  const resolvedCount = tickets.filter(
    (t) => t.status === 'RESOLVED' || t.status === 'CLOSED'
  ).length;

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Patient Grievance Redressal Cell
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Support Tickets &amp; Grievances Management
        </h1>
        <p className="text-xs text-light-on-surface-variant mt-1">
          Review patient escalations, add administrative notes, issue patient updates, and manage ticket resolution lifecycle.
        </p>
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-light-surface rounded-2xl border border-light-outline shadow-sm">
          <div className="text-[11px] font-bold uppercase text-light-on-surface-variant">Total Tickets</div>
          <div className="text-2xl font-extrabold text-light-primary mt-1 font-headline">{totalCount}</div>
        </div>
        <div className="p-4 bg-light-surface rounded-2xl border border-warning/30 shadow-sm bg-warning/5">
          <div className="text-[11px] font-bold uppercase text-on-warning">Open / Unassigned</div>
          <div className="text-2xl font-extrabold text-on-warning mt-1 font-headline">{openCount}</div>
        </div>
        <div className="p-4 bg-light-surface rounded-2xl border border-secondary/30 shadow-sm bg-secondary/5">
          <div className="text-[11px] font-bold uppercase text-secondary">In Progress</div>
          <div className="text-2xl font-extrabold text-secondary mt-1 font-headline">{inProgressCount}</div>
        </div>
        <div className="p-4 bg-light-surface rounded-2xl border border-success/30 shadow-sm bg-success/5">
          <div className="text-[11px] font-bold uppercase text-success">Resolved / Closed</div>
          <div className="text-2xl font-extrabold text-success mt-1 font-headline">{resolvedCount}</div>
        </div>
      </div>

      {/* Toolbar: Search and Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {(['ALL', 'OPEN', 'IN_PROGRESS', 'AWAITING_USER', 'RESOLVED', 'CLOSED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-light-primary text-white shadow-sm'
                  : 'bg-light-surface border border-light-outline text-light-on-surface-variant hover:bg-light-surface-variant'
              }`}
            >
              {st === 'ALL'
                ? `All (${totalCount})`
                : st === 'OPEN'
                ? `Open (${openCount})`
                : st === 'IN_PROGRESS'
                ? `In Progress (${inProgressCount})`
                : st === 'RESOLVED'
                ? `Resolved (${resolvedCount})`
                : st === 'AWAITING_USER'
                ? 'Awaiting User'
                : 'Closed'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-light-on-surface-variant text-base">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket ID, submitter, keyword..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-light-on-surface-variant">Loading support tickets...</div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-12 text-center bg-light-surface rounded-2xl border border-light-outline space-y-2">
            <span className="material-symbols-outlined text-4xl text-light-on-surface-variant">inbox</span>
            <div className="font-bold text-light-primary text-sm">No tickets found</div>
            <p className="text-xs text-light-on-surface-variant">
              {searchQuery ? `No support tickets match "${searchQuery}"` : 'There are no support tickets in this category.'}
            </p>
          </div>
        ) : (
          filteredTickets.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-light-surface rounded-2xl border border-light-outline shadow-card space-y-3.5 hover:border-secondary/40 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-headline font-code font-bold text-secondary text-sm">
                    {t.ticketId}
                  </span>
                  {getStatusBadge(t.status)}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary/10 text-secondary">
                    {t.category}
                  </span>
                  <span className="text-xs font-semibold text-light-primary">
                    {t.patientName}
                  </span>
                  <span className="text-[11px] text-light-on-surface-variant font-code">
                    {t.phone}
                  </span>
                </div>
                <span className="font-code text-xs text-light-on-surface-variant">
                  {t.submittedAt}
                </span>
              </div>

              {/* Subject & Description */}
              <div>
                <h3 className="font-bold text-light-primary text-xs sm:text-sm">
                  {t.subject || `${t.category} Grievance`}
                </h3>
                <p className="text-xs text-light-on-surface-variant mt-1 leading-relaxed">
                  {t.description || t.message}
                </p>
              </div>

              {/* Patient-Facing Resolution / Notes */}
              {(t.resolutionMessage || t.resolutionNote) && (
                <div className="p-3 bg-success/10 rounded-xl border border-success/30 text-xs text-light-primary space-y-0.5">
                  <div className="flex items-center gap-1.5 text-success font-bold text-[11px]">
                    <span className="material-symbols-outlined text-xs">task_alt</span>
                    Hospital Resolution:
                  </div>
                  <p className="text-[11px] text-light-primary">
                    {t.resolutionMessage || t.resolutionNote}
                  </p>
                </div>
              )}

              {/* Indicator Pills & Action Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-light-outline text-xs">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-light-on-surface-variant">
                  {t.adminUpdates && t.adminUpdates.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary/10 text-secondary font-medium">
                      <span className="material-symbols-outlined text-xs">campaign</span>
                      {t.adminUpdates.length} Patient Updates
                    </span>
                  )}
                  {t.internalNotes && t.internalNotes.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-warning/10 text-on-warning font-medium">
                      <span className="material-symbols-outlined text-xs">lock</span>
                      {t.internalNotes.length} Internal Notes
                    </span>
                  )}
                  {t.statusHistory && t.statusHistory.length > 0 && (
                    <span className="text-[10px] text-light-on-surface-variant">
                      Last updated by {t.statusHistory[t.statusHistory.length - 1].changedBy}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(t)}
                    className="px-3.5 py-1.5 bg-light-surface-variant hover:bg-light-outline text-light-primary rounded-lg font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    Review &amp; Manage
                  </button>

                  {t.status === 'OPEN' && (
                    <button
                      onClick={() => handleQuickStatusChange(t, 'IN_PROGRESS')}
                      className="px-3 py-1.5 bg-secondary text-white hover:bg-secondary/90 rounded-lg font-bold text-xs transition-colors"
                    >
                      In Progress →
                    </button>
                  )}

                  {t.status !== 'RESOLVED' && t.status !== 'CLOSED' && (
                    <button
                      onClick={() => handleQuickStatusChange(t, 'RESOLVED')}
                      className="px-3 py-1.5 bg-success text-white hover:bg-success/90 rounded-lg font-bold text-xs transition-colors"
                    >
                      Resolve ✓
                    </button>
                  )}

                  {(t.status === 'RESOLVED' || t.status === 'CLOSED') && (
                    <button
                      onClick={() => handleQuickStatusChange(t, 'IN_PROGRESS')}
                      className="px-3 py-1.5 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg font-bold text-xs transition-colors"
                    >
                      Reopen ↺
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full Ticket Detail & Resolution Modal */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={handleCloseModal}
          title={`Support Ticket: ${selectedTicket.ticketId}`}
          subtitle={`${selectedTicket.category} • Submitted by ${selectedTicket.patientName}`}
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModal} className="p-6 space-y-6 text-xs max-h-[80vh] overflow-y-auto">
            {/* Ticket Summary Banner */}
            <div className="p-4 bg-light-surface-variant/40 rounded-xl border border-light-outline space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Subject</span>
                  <div className="font-bold text-light-primary text-sm">{selectedTicket.subject}</div>
                </div>
                <div>{getStatusBadge(selectedTicket.status)}</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Description</span>
                <p className="text-light-primary mt-0.5 leading-relaxed bg-white p-2.5 rounded-lg border border-light-outline/70">
                  {selectedTicket.description || selectedTicket.message}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-light-on-surface-variant block">Patient / Submitter:</span>
                  <strong className="text-light-primary">{selectedTicket.patientName}</strong>
                </div>
                <div>
                  <span className="text-light-on-surface-variant block">Contact Phone:</span>
                  <strong className="text-light-primary font-code">{selectedTicket.phone}</strong>
                </div>
                <div>
                  <span className="text-light-on-surface-variant block">Date Submitted:</span>
                  <span className="text-light-primary">{selectedTicket.submittedAt}</span>
                </div>
              </div>
            </div>

            {/* Status Selector */}
            <div>
              <label className="font-bold text-light-primary block mb-1.5">Change Ticket Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['OPEN', 'IN_PROGRESS', 'AWAITING_USER', 'RESOLVED', 'CLOSED'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setModalStatus(st)}
                    className={`py-2 px-2 rounded-lg font-bold text-center text-xs border transition-all ${
                      modalStatus === st
                        ? 'bg-secondary text-white border-secondary shadow-sm'
                        : 'bg-light-surface text-light-primary border-light-outline hover:bg-light-surface-variant'
                    }`}
                  >
                    {st === 'OPEN'
                      ? 'Open'
                      : st === 'IN_PROGRESS'
                      ? 'In Progress'
                      : st === 'AWAITING_USER'
                      ? 'Awaiting User'
                      : st === 'RESOLVED'
                      ? 'Resolved ✓'
                      : 'Closed'}
                  </button>
                ))}
              </div>
            </div>

            {/* Official Resolution Message (Patient-Visible) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-light-primary">
                  Official Resolution Message / Action Taken
                </label>
                <span className="text-[10px] text-success font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  Visible to Patient
                </span>
              </div>
              <textarea
                rows={2}
                value={modalResolution}
                onChange={(e) => setModalResolution(e.target.value)}
                placeholder="State the resolution action taken (e.g. Added extra pharmacist, rescheduled appointment, spoken with patient)..."
                className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>

            {/* Add Patient-Visible Action Update */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-light-primary">
                  Add Patient-Facing Update
                </label>
                <span className="text-[10px] text-secondary font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">campaign</span>
                  Dispatched to Patient
                </span>
              </div>
              <input
                type="text"
                value={modalAdminUpdate}
                onChange={(e) => setModalAdminUpdate(e.target.value)}
                placeholder="e.g. Investigation initiated with duty MO; report expected within 1 hour."
                className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>

            {/* Existing Patient Updates Display */}
            {selectedTicket.adminUpdates && selectedTicket.adminUpdates.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">
                  Previously Sent Patient Updates ({selectedTicket.adminUpdates.length})
                </span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {selectedTicket.adminUpdates.map((u) => (
                    <div key={u.id} className="p-2.5 bg-light-surface-variant/40 rounded-lg border border-light-outline text-[11px]">
                      <div className="flex justify-between text-[10px] text-secondary font-bold">
                        <span>{u.author}</span>
                        <span className="text-light-on-surface-variant font-code">{u.timestamp}</span>
                      </div>
                      <p className="text-light-primary mt-0.5">{u.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confidential Internal Admin Notes */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-on-warning font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Confidential Internal Admin Notes
                </div>
                <span className="text-[10px] text-on-warning uppercase font-bold">
                  Strictly Confidential / Staff Only
                </span>
              </div>

              {selectedTicket.internalNotes && selectedTicket.internalNotes.length > 0 && (
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {selectedTicket.internalNotes.map((n) => (
                    <div key={n.id} className="p-2.5 bg-white rounded-lg border border-amber-500/20 text-[11px]">
                      <div className="flex justify-between text-[10px] text-on-warning font-bold">
                        <span>{n.author}</span>
                        <span className="text-light-on-surface-variant font-code">{n.timestamp}</span>
                      </div>
                      <p className="text-light-primary mt-0.5">{n.note}</p>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <input
                  type="text"
                  value={modalInternalNote}
                  onChange={(e) => setModalInternalNote(e.target.value)}
                  placeholder="Add confidential internal note (e.g. MO Dr. Rajesh notified, incident logged in register)..."
                  className="w-full p-2.5 rounded-lg border border-amber-500/30 bg-white text-light-primary focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
                />
              </div>
            </div>

            {/* Status History Timeline */}
            {selectedTicket.statusHistory && selectedTicket.statusHistory.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-light-outline">
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">
                  Status Transition Audit History
                </span>
                <div className="space-y-1 text-[11px] max-h-32 overflow-y-auto">
                  {selectedTicket.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <span className="material-symbols-outlined text-xs text-secondary">history</span>
                      <strong className="text-light-primary">{h.status}</strong>
                      <span className="text-light-on-surface-variant">at {h.timestamp}</span>
                      <span className="text-secondary font-medium">by {h.changedBy}</span>
                      {h.note && <span className="text-light-on-surface-variant italic">({h.note})</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-light-outline">
              <div className="flex items-center gap-2">
                {modalStatus !== 'RESOLVED' && (
                  <button
                    type="button"
                    onClick={() => {
                      setModalStatus('RESOLVED');
                      if (!modalResolution) {
                        setModalResolution('Grievance investigated and resolved by Hospital Grievance Cell.');
                      }
                    }}
                    className="px-3 py-2 bg-success/10 text-success border border-success/30 hover:bg-success/20 rounded-lg font-bold text-xs"
                  >
                    Quick Resolve ✓
                  </button>
                )}
                {(modalStatus === 'RESOLVED' || modalStatus === 'CLOSED') && (
                  <button
                    type="button"
                    onClick={() => setModalStatus('IN_PROGRESS')}
                    className="px-3 py-2 bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 rounded-lg font-bold text-xs"
                  >
                    Reopen Ticket ↺
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-light-outline text-light-on-surface-variant hover:bg-light-surface-variant rounded-lg font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-light-primary text-white hover:bg-slate-800 rounded-lg font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  {isSaving ? 'Saving...' : 'Save & Update Ticket'}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

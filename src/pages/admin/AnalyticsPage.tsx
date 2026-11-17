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
  const [complaints, setComplaints] = React.useState<any[]>([]);

  React.useEffect(() => {
    adminService.getComplaints().then(setComplaints);
  }, []);

  const handleUpdateStatus = (id: string, status: any) => {
    adminService.updateComplaintStatus(id, status, 'Resolved by Medical Superintendent').then(() => {
      setComplaints(complaints.map((c) => (c.id === id ? { ...c, status } : c)));
    });
  };

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Patient Grievance Redressal
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Feedback &amp; Grievance Management
        </h1>
      </div>

      <div className="space-y-4">
        {complaints.map((c) => (
          <div key={c.id} className="p-6 bg-light-surface rounded-2xl border border-light-outline shadow-card space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-headline font-code font-bold text-secondary text-sm">{c.ticketId}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary/15 text-secondary">
                  {c.category}
                </span>
                <span className="text-xs font-semibold text-light-primary">{c.patientName}</span>
              </div>
              <span className="font-code text-xs text-light-on-surface-variant">{c.submittedAt}</span>
            </div>

            <p className="text-xs text-light-on-surface-variant">{c.message}</p>

            {c.resolutionNote && (
              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline text-xs text-success font-medium">
                Hospital Action: {c.resolutionNote}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-light-outline text-xs">
              <div>
                Status: <strong className="text-light-primary">{c.status}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(c.id, 'INVESTIGATING')}
                  className="px-3 py-1 bg-light-surface-variant hover:bg-light-outline rounded font-semibold text-light-primary"
                >
                  Mark In-Progress
                </button>
                <button
                  onClick={() => handleUpdateStatus(c.id, 'RESOLVED')}
                  className="px-3 py-1 bg-success text-white rounded font-bold hover:bg-success/90"
                >
                  Mark Resolved ✓
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { adminService } from '../../services/adminService';
import { aiService } from '../../services/aiService';
import { HospitalDepartment, HospitalResource, AIRecommendation } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { ChartContainer } from '../../components/common/LoadingSpinner';

export const AdminDashboard: React.FC = () => {
  const [departments, setDepartments] = useState<HospitalDepartment[]>([]);
  const [resources, setResources] = useState<HospitalResource[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  useEffect(() => {
    adminService.getDepartments().then(setDepartments);
    adminService.getResources().then(setResources);
    aiService.getRecommendations().then(setRecommendations);
  }, []);

  // Realistic registration & volume data
  const registrationTrend = [
    { time: '08:00 AM', patients: 45, waitTime: 12 },
    { time: '09:00 AM', patients: 112, waitTime: 18 },
    { time: '10:00 AM', patients: 184, waitTime: 28 },
    { time: '11:00 AM', patients: 220, waitTime: 34 },
    { time: '12:00 PM', patients: 175, waitTime: 25 },
    { time: '01:00 PM', patients: 95, waitTime: 15 },
    { time: '02:00 PM', patients: 60, waitTime: 10 },
  ];

  const departmentDistribution = departments.map((d) => ({
    name: d.code,
    waiting: d.waitingCount,
    completed: d.completedTodayCount,
  }));

  const handleApproveRecommendation = async (id: string) => {
    const updated = await aiService.toggleApproval(id);
    setRecommendations((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  return (
    <div className="space-y-8">
      {/* Overview Statistics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Total Registered"
          value="2,840"
          subtext="+8.4% vs yesterday"
          icon="groups"
        />
        <StatCard
          label="Waiting Queue"
          value="138"
          trend={{ value: "-14%", isPositive: true, label: "Wait backlog dropping" }}
          variant="accent"
          icon="format_list_numbered"
        />
        <StatCard
          label="In Consultation"
          value="34"
          subtext="Across 28 OPD rooms"
          variant="secondary"
          icon="stethoscope"
        />
        <StatCard
          label="Completed Today"
          value="1,920"
          trend={{ value: "98.4%", isPositive: true, label: "Fulfillment" }}
          variant="success"
          icon="task_alt"
        />
        <StatCard
          label="Active Doctors"
          value="28 / 32"
          subtext="4 on ward round"
          icon="badge"
        />
        <StatCard
          label="Emergency Cases"
          value="14"
          variant="danger"
          subtext="Triage Bay optimal"
          icon="emergency"
        />
      </div>

      {/* Analytics Charts Grid (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Registration & Wait Time Curve (7 cols) */}
        <div className="lg:col-span-7">
          <ChartContainer
            title="OPD Footfall &amp; Waiting Time Dynamics"
            subtitle="Hourly patient arrivals mapped against average wait duration"
            badge="Live Telemetry"
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={registrationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2585E8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2585E8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F2D500" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#F2D500" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DEE2E6" />
                  <XAxis dataKey="time" stroke="#495057" fontSize={11} />
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
                    dataKey="patients"
                    name="Patient Footfall"
                    stroke="#2585E8"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorPatients)"
                  />
                  <Area
                    type="monotone"
                    dataKey="waitTime"
                    name="Avg Wait Time (Mins)"
                    stroke="#E9A23B"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorWait)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>

        {/* Right: Department Flow Distribution (5 cols) */}
        <div className="lg:col-span-5">
          <ChartContainer
            title="Department Volume Breakdown"
            subtitle="Waiting vs Consulted Patients across OPD Wings"
            badge="Civil Cluster"
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DEE2E6" />
                  <XAxis dataKey="name" stroke="#495057" fontSize={10} />
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
                  <Bar dataKey="waiting" name="Waiting" fill="#E9A23B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" name="Completed" fill="#249B69" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>
      </div>

      {/* AI Queue Optimization Recommendations Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-light-primary text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-on-accent flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold">
                Explainable AI Queue &amp; Staffing Recommendations
              </h3>
              <p className="text-xs text-slate-300">
                Actionable real-time interventions generated from live patient arrivals &amp; historical rush models
              </p>
            </div>
          </div>
          <Link
            to="/ai/dashboard"
            className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Launch AI Digital Twin</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-5 rounded-2xl border text-xs flex flex-col justify-between transition-all ${
                rec.approved
                  ? 'bg-slate-800/90 border-success/40'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent/20 text-accent border border-accent/40">
                    {rec.impactScore}
                  </span>
                  <span className="text-[10px] text-slate-400">{rec.timestamp}</span>
                </div>
                <h4 className="font-headline text-xs font-bold text-white">{rec.title}</h4>
                <p className="text-slate-300 text-[11px] leading-relaxed">{rec.explanation}</p>
                <div className="p-2.5 bg-slate-900/60 rounded-lg text-[10px] text-slate-400 border border-slate-700">
                  <strong className="text-secondary block">Action:</strong> {rec.recommendedAction}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-700 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Status: <strong>{rec.approved ? 'Active in System' : 'Requires Approval'}</strong>
                </span>
                <button
                  onClick={() => handleApproveRecommendation(rec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rec.approved
                      ? 'bg-success/20 text-success border border-success/40'
                      : 'bg-accent text-on-accent hover:brightness-95'
                  }`}
                >
                  {rec.approved ? 'Approved ✓' : 'Approve Action'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Operations Table */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-light-outline">
          <h3 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">apartment</span>
            Live Department Flow &amp; Capacity Status
          </h3>
          <Link to="/admin/departments" className="text-xs text-secondary font-bold hover:underline">
            Manage All Departments &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-light-surface-variant text-light-on-surface-variant uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3">Department</th>
                <th className="p-3">Head of Department</th>
                <th className="p-3">Active Doctors</th>
                <th className="p-3">Waiting Queue</th>
                <th className="p-3">Treated Today</th>
                <th className="p-3">Avg Wait</th>
                <th className="p-3">Capacity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-outline">
              {departments.map((d) => (
                <tr key={d.id} className="hover:bg-light-surface-variant/40">
                  <td className="p-3">
                    <span className="font-bold text-light-primary">{d.name}</span>
                    <span className="block text-[10px] text-light-on-surface-variant font-code">{d.code}</span>
                  </td>
                  <td className="p-3 text-light-on-surface-variant">{d.headDoctor}</td>
                  <td className="p-3 font-code font-bold text-light-primary">{d.activeDoctorsCount} Doctors</td>
                  <td className="p-3 font-code font-bold text-secondary">{d.waitingCount}</td>
                  <td className="p-3 font-code text-light-primary">{d.completedTodayCount}</td>
                  <td className="p-3 font-code font-bold text-light-primary">{d.avgWaitTimeMinutes} mins</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        d.capacityStatus === 'OVERLOAD'
                          ? 'bg-danger/15 text-danger border border-danger/30 animate-pulse'
                          : d.capacityStatus === 'ELEVATED'
                          ? 'bg-warning/20 text-on-warning border border-warning/40'
                          : 'bg-success/15 text-success border border-success/30'
                      }`}
                    >
                      {d.capacityStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hospital Critical Equipment & Beds Grid */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-light-outline">
          <h3 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">hotel</span>
            Emergency Beds, Stretchers &amp; Mobility Assets
          </h3>
          <Link to="/admin/resources" className="text-xs text-secondary font-bold hover:underline">
            Manage All Resources &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {resources.map((res) => (
            <div
              key={res.id}
              className="p-3.5 bg-light-surface-variant rounded-xl border border-light-outline space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant">
                  {res.category}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    res.status === 'CRITICAL'
                      ? 'bg-danger animate-ping'
                      : res.status === 'LOW'
                      ? 'bg-warning'
                      : 'bg-success'
                  }`}
                ></span>
              </div>
              <div className="font-bold text-light-primary truncate">{res.name}</div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-headline text-lg font-black text-light-primary font-code">
                  {res.available}
                </span>
                <span className="text-[10px] text-light-on-surface-variant font-medium">
                  of {res.total} Free
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { BentoCard } from '../../components/common/BentoCard';
import { GlassCard } from '../../components/common/GlassCard';

export const AdminDashboard: React.FC = () => {
  const [departments, setDepartments] = useState<HospitalDepartment[]>([]);
  const [resources, setResources] = useState<HospitalResource[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  useEffect(() => {
    document.title = 'Operations Command Center — CAREFLOW';
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
    <div className="space-y-6">
      <PageHeader
        title="Hospital Operations Command Center"
        subtitle="Real-time outpatient flow, bed utilization, and predictive crowd surveillance"
        badge={
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse"></span>
            Telemetry Active
          </span>
        }
        actions={
          <Link
            to="/ai/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm text-[#7C3AED]">psychology</span>
            <span>Digital Twin Simulator</span>
          </Link>
        }
      />

      {/* Overview Statistics Bento Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <StatCard
          label="Total Registered"
          value="2,840"
          subtext="+8.4% vs yesterday"
          icon="groups"
          className="glass-card"
        />
        <StatCard
          label="Waiting Queue"
          value="138"
          trend={{ value: "-14%", isPositive: true, label: "Backlog dropping" }}
          variant="secondary"
          icon="format_list_numbered"
          className="glass-card"
        />
        <StatCard
          label="In Consultation"
          value="34"
          subtext="28 OPD rooms active"
          icon="stethoscope"
          className="glass-card"
        />
        <StatCard
          label="Completed Today"
          value="1,920"
          trend={{ value: "98.4%", isPositive: true, label: "Fulfillment" }}
          variant="success"
          icon="task_alt"
          className="glass-card"
        />
        <StatCard
          label="Active Doctors"
          value="28 / 32"
          subtext="4 on ward round"
          icon="badge"
          className="glass-card"
        />
        <StatCard
          label="Emergency Cases"
          value="14"
          variant="danger"
          subtext="Trauma Bay optimal"
          icon="emergency"
          className="glass-card"
        />
      </div>

      {/* Analytics Charts Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Registration & Wait Time Curve */}
        <div className="lg:col-span-7">
          <BentoCard variant="glass" padding="none" hover={false} className="h-full">
            <ChartContainer
              title="OPD Footfall & Waiting Time Dynamics"
              subtitle="Hourly patient arrivals mapped against average wait duration"
              badge="Real-Time"
            >
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={registrationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F766E" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Area
                      type="monotone"
                      dataKey="patients"
                      name="Patient Footfall"
                      stroke="#0F766E"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPatients)"
                    />
                    <Area
                      type="monotone"
                      dataKey="waitTime"
                      name="Avg Wait Time (Mins)"
                      stroke="#2563EB"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorWait)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </BentoCard>
        </div>

        {/* Right: Department Flow Distribution */}
        <div className="lg:col-span-5">
          <BentoCard variant="glass" padding="none" hover={false} className="h-full">
            <ChartContainer
              title="Department Volume Breakdown"
              subtitle="Waiting vs Consulted Patients across OPD Wings"
              badge="OPD Wings"
            >
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="waiting" name="Waiting" fill="#D97706" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" name="Completed" fill="#16A34A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </BentoCard>
        </div>
      </div>

      {/* AI Queue Optimization Recommendations Banner */}
      <BentoCard variant="ai" padding="md" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100/80 text-[#7C3AED] flex items-center justify-center font-bold flex-shrink-0">
              <span className="material-symbols-outlined text-lg">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  AI Crowd & Queue Interventions
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-[#7C3AED]">
                  Explainable AI
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Decision-support suggestions to balance OPD congestion and clinician workload
              </p>
            </div>
          </div>
          <Link
            to="/ai/dashboard"
            className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All AI Recommendations</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                rec.approved
                  ? 'bg-green-50/70 border-green-200'
                  : 'bg-white/80 border-purple-100 hover:border-purple-200 shadow-xs'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20">
                    Impact: {rec.impactScore}
                  </span>
                  <span className="text-[10px] text-slate-400">{rec.timestamp}</span>
                </div>
                <h4 className="font-semibold text-slate-900">{rec.title}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">{rec.explanation}</p>
                <div className="p-2.5 bg-white/90 rounded-lg text-[11px] text-slate-700 border border-slate-200">
                  <strong className="text-[#0F766E] block mb-0.5">Recommended Action:</strong>
                  {rec.recommendedAction}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {rec.approved ? (
                    <span className="text-[#16A34A] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span> Active in System
                    </span>
                  ) : (
                    <span className="text-slate-500">Pending Review</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => handleApproveRecommendation(rec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    rec.approved
                      ? 'bg-green-100 text-[#16A34A] border border-green-200'
                      : 'bg-[#0F766E] hover:bg-[#115E59] text-white shadow-xs'
                  }`}
                >
                  {rec.approved ? 'Approved ✓' : 'Approve Action'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Department Operations Table (Solid Bento Card for clinical legibility) */}
      <BentoCard variant="solid" padding="md" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#0F766E]">apartment</span>
            <h3 className="text-sm font-bold text-slate-900">
              Department Occupancy & Flow Metrics
            </h3>
          </div>
          <Link to="/admin/departments" className="text-xs text-[#0F766E] font-semibold hover:underline">
            Manage All Departments &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Head of Department</th>
                <th className="py-2.5 px-3">Active Doctors</th>
                <th className="py-2.5 px-3">Waiting Queue</th>
                <th className="py-2.5 px-3">Treated Today</th>
                <th className="py-2.5 px-3">Avg Wait</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departments.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-900">{d.name}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{d.code}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{d.headDoctor}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{d.activeDoctorsCount} Doctors</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F766E]">{d.waitingCount}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">{d.completedTodayCount}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{d.avgWaitTimeMinutes} mins</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        d.capacityStatus === 'OVERLOAD'
                          ? 'bg-red-50 text-[#DC2626] border border-red-200'
                          : d.capacityStatus === 'ELEVATED'
                          ? 'bg-amber-50 text-[#D97706] border border-amber-200'
                          : 'bg-green-50 text-[#16A34A] border border-green-200'
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
      </BentoCard>

      {/* Hospital Critical Equipment & Beds Grid (Glass Bento Card) */}
      <BentoCard variant="glass" padding="md" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#0F766E]">hotel</span>
            <h3 className="text-sm font-bold text-slate-900">
              Resource Utilisation & Critical Beds
            </h3>
          </div>
          <Link to="/admin/resources" className="text-xs text-[#0F766E] font-semibold hover:underline">
            Manage All Resources &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {resources.map((res) => (
            <div
              key={res.id}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 space-y-1 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {res.category}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    res.status === 'CRITICAL'
                      ? 'bg-[#DC2626]'
                      : res.status === 'LOW'
                      ? 'bg-[#D97706]'
                      : 'bg-[#16A34A]'
                  }`}
                ></span>
              </div>
              <div className="font-semibold text-slate-900 truncate">{res.name}</div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-base font-bold text-slate-900 font-mono">
                  {res.available}
                </span>
                <span className="text-[10px] text-slate-500">
                  of {res.total} Free
                </span>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  );
};

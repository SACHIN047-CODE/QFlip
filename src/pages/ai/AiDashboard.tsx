import React, { useState, useEffect } from 'react';
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
import { aiService } from '../../services/aiService';
import {
  CrowdForecastHour,
  AIRecommendation,
  DigitalTwinSimulationParams,
  DigitalTwinSimulationResult,
} from '../../types';
import { ChartContainer } from '../../components/common/LoadingSpinner';
import { BentoCard } from '../../components/common/BentoCard';
import { GlassCard } from '../../components/common/GlassCard';

export const AiDashboard: React.FC = () => {
  const [forecast, setForecast] = useState<CrowdForecastHour[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  // Digital Twin Interactive Simulation State
  const [simParams, setSimParams] = useState<DigitalTwinSimulationParams>({
    patientArrivalMultiplier: 1.25, // 125% rush
    activeDoctorRatio: 1.0, // standard doctors
    triageEfficiencyGain: 20, // 20% voice triage speedup
    pharmacyThroughput: 35, // standard
  });

  const [simResult, setSimResult] = useState<DigitalTwinSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    aiService.getHourlyCrowdForecast().then(setForecast);
    aiService.getRecommendations().then(setRecommendations);
    runSimulation();
  }, []);

  const runSimulation = async () => {
    setIsSimulating(true);
    const result = await aiService.runDigitalTwinSimulation(simParams);
    setSimResult(result);
    setIsSimulating(false);
  };

  const handleToggleApproval = async (id: string) => {
    const updated = await aiService.toggleApproval(id);
    setRecommendations((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  return (
    <div className="space-y-8">
      {/* Simulation / Real AI Notice Banner */}
      <div className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-900 border-purple-200/80 bg-purple-50/70">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#7C3AED] text-lg">science</span>
          <span>
            <strong>Simulated Telemetry Notice:</strong> Real-time neural models running against Civil Hospital
            Ambala historical benchmarks. Switch parameters in the Digital Twin simulator below to preview operational
            impacts.
          </span>
        </div>
        <span className="font-code font-bold text-[#7C3AED] bg-purple-100/90 px-2.5 py-0.5 rounded-lg self-start sm:self-auto border border-purple-200">
          AI Engine v2.4 Active
        </span>
      </div>

      {/* SECTION 1: CROWD PREDICTION & SURGE FORECASTING (Bento Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <BentoCard variant="glass" padding="none" hover={false} className="h-full">
            <ChartContainer
              title="Hourly Patient Volume Prediction & Surge Forecast"
              subtitle="Comparing historical baseline arrivals vs predicted surge peaks"
              badge="Next 8 Hours"
            >
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecast}>
                    <defs>
                      <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="hour" stroke="#64748B" fontSize={10} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Area
                      type="monotone"
                      dataKey="predictedVolume"
                      name="Predicted Patient Surge"
                      stroke="#7C3AED"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorPredicted)"
                    />
                    <Area
                      type="monotone"
                      dataKey="historicalAverage"
                      name="Historical Baseline"
                      stroke="#64748B"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#colorHistorical)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </BentoCard>
        </div>

        {/* Surge Alert Card (Danger Bento Card) */}
        <div className="lg:col-span-4">
          <BentoCard variant="danger" padding="md" className="space-y-4 h-full">
            <div className="flex items-center justify-between pb-3 border-b border-red-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping"></span>
                Surge Forecast: High Risk
              </span>
              <span className="font-code text-xs text-slate-500 font-semibold">11:00 AM – 01:00 PM</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Expected Patient Rush: +42% Inflow
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Inter-district bus schedules & weather changes will cause significant crowding in General Medicine
                and Pediatric OPDs.
              </p>
            </div>

            <div className="p-3.5 bg-white/90 rounded-xl border border-red-200 text-xs space-y-2">
              <div className="font-bold text-[#DC2626]">Recommended Staff Adjustments:</div>
              <ul className="space-y-1.5 text-[11px] text-slate-800">
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#0F766E]">arrow_right</span>
                  <span>Open OPD Room 14 & 15 with Reserve Duty Doctors</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#0F766E]">arrow_right</span>
                  <span>Deploy Registration Desk #03 & #04 for rapid token issue</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#0F766E]">arrow_right</span>
                  <span>Pre-package 100 fever/cough kits at Jan Aushadhi Chemist</span>
                </li>
              </ul>
            </div>
          </BentoCard>
        </div>
      </div>

      {/* SECTION 2: DIGITAL TWIN INTERACTIVE SIMULATION (Glass Bento Container) */}
      <BentoCard variant="glass" padding="lg" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 text-[#0F766E] text-xs font-bold mb-1 border border-[#0F766E]/20">
              <span className="material-symbols-outlined text-sm">view_in_ar</span>
              Interactive Digital Twin Simulator
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hospital Operations Scenario Modeling
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Test what happens to waiting lines and physician burnout when patient volume surges or doctors are added.
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">
              {isSimulating ? 'autorenew' : 'play_circle'}
            </span>
            <span>{isSimulating ? 'Simulating Model...' : 'Run Simulation Scenario'}</span>
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Slider 1: Patient Volume Multiplier */}
          <div className="p-4 bg-white/85 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Patient Arrival Rush:</span>
              <span className="font-code text-[#0F766E] font-bold">{Math.round(simParams.patientArrivalMultiplier * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.1}
              value={simParams.patientArrivalMultiplier}
              onChange={(e) => {
                setSimParams({ ...simParams, patientArrivalMultiplier: parseFloat(e.target.value) });
                runSimulation();
              }}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Range: 50% to 250% of normal footfall</span>
          </div>

          {/* Slider 2: Active Doctor Staffing Ratio */}
          <div className="p-4 bg-white/85 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Active Doctor Staffing:</span>
              <span className="font-code text-[#0F766E] font-bold">{Math.round(simParams.activeDoctorRatio * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.8}
              step={0.1}
              value={simParams.activeDoctorRatio}
              onChange={(e) => {
                setSimParams({ ...simParams, activeDoctorRatio: parseFloat(e.target.value) });
                runSimulation();
              }}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Simulate staff leaves or duty surge</span>
          </div>

          {/* Slider 3: Triage Speed / Voice Adoption */}
          <div className="p-4 bg-white/85 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Voice Triage Adoption:</span>
              <span className="font-code text-[#0F766E] font-bold">{simParams.triageEfficiencyGain}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={simParams.triageEfficiencyGain}
              onChange={(e) => {
                setSimParams({ ...simParams, triageEfficiencyGain: parseInt(e.target.value) });
                runSimulation();
              }}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Cuts registration counter bottleneck</span>
          </div>

          {/* Slider 4: Pharmacy Dispense Throughput */}
          <div className="p-4 bg-white/85 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Pharmacy Bundles:</span>
              <span className="font-code text-[#0F766E] font-bold">{simParams.pharmacyThroughput} kits/hr</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={simParams.pharmacyThroughput}
              onChange={(e) => {
                setSimParams({ ...simParams, pharmacyThroughput: parseInt(e.target.value) });
                runSimulation();
              }}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Pre-assembled medication packages</span>
          </div>
        </div>

        {/* Before vs After Simulation Comparison Result Cards */}
        {simResult && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {/* Metric 1 */}
            <div className="p-5 rounded-xl border bg-white/80 border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs uppercase font-semibold text-slate-500 block">
                Average Wait Time
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg text-slate-400 line-through font-code">
                  {simResult.avgWaitTimeBefore}m
                </span>
                <span className="material-symbols-outlined text-[#0F766E] text-sm">arrow_forward</span>
                <span
                  className={`text-2xl font-black font-code tabular-nums ${
                    simResult.avgWaitTimeAfter > 28 ? 'text-[#DC2626]' : 'text-[#16A34A]'
                  }`}
                >
                  {simResult.avgWaitTimeAfter} mins
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block">
                {simResult.avgWaitTimeAfter < simResult.avgWaitTimeBefore ? 'Improvement Achieved' : 'Potential Delay'}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-xl border bg-white/80 border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs uppercase font-semibold text-slate-500 block">
                Peak Queue Depth
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg text-slate-400 line-through font-code">
                  {simResult.peakQueueDepthBefore}
                </span>
                <span className="material-symbols-outlined text-[#0F766E] text-sm">arrow_forward</span>
                <span className="text-2xl font-black text-slate-900 font-code tabular-nums">
                  {simResult.peakQueueDepthAfter}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block">Simulated Patients in Line</span>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-xl border bg-white/80 border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs uppercase font-semibold text-slate-500 block">
                Identified Bottleneck
              </span>
              <div className="text-sm font-bold text-slate-900 mt-2 truncate">
                {simResult.bottleneckDepartment}
              </div>
              <span className="text-[10px] text-slate-500 block">Critical Path Department</span>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-xl border bg-white/80 border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs uppercase font-semibold text-slate-500 block">
                Physician Burnout Risk
              </span>
              <div className="mt-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    simResult.burnoutRiskLevel === 'HIGH'
                      ? 'bg-red-50 text-[#DC2626] border border-red-200'
                      : simResult.burnoutRiskLevel === 'MODERATE'
                      ? 'bg-amber-50 text-[#D97706] border border-amber-200'
                      : 'bg-green-50 text-[#16A34A] border border-green-200'
                  }`}
                >
                  {simResult.burnoutRiskLevel} RISK
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Based on patient velocity</span>
            </div>
          </div>
        )}

        {/* Recommended Digital Twin Interventions */}
        {simResult && (
          <div className="p-4 bg-teal-50/70 rounded-xl border border-[#0F766E]/20 space-y-2 text-xs">
            <span className="text-xs font-bold text-[#0F766E] uppercase block">
              Digital Twin AI Policy Suggestions:
            </span>
            <ul className="space-y-1.5 text-slate-800">
              {simResult.recommendedInterventions.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#0F766E]">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </BentoCard>

      {/* SECTION 3: EXPLAINABLE AI RECOMMENDATION ENGINE (AI Bento Card) */}
      <BentoCard variant="ai" padding="lg" className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-purple-200/70">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Explainable AI (XAI) Queue Directives
            </h3>
            <p className="text-xs text-slate-600">
              Every machine recommendation provides auditable supporting clinical data and expected impact metrics
            </p>
          </div>
          <span className="text-xs font-bold text-[#7C3AED]">100% Explainable Architecture</span>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-xl border border-purple-100 bg-white/90 space-y-3 text-xs shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded font-code font-bold text-[10px] bg-secondary/15 text-secondary">
                    {rec.category}
                  </span>
                  <h4 className="font-headline text-sm font-bold text-light-primary">{rec.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-accent text-on-accent">
                    {rec.impactScore}
                  </span>
                  <button
                    onClick={() => handleToggleApproval(rec.id)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      rec.approved
                        ? 'bg-success text-white'
                        : 'bg-light-primary text-white hover:bg-slate-800'
                    }`}
                  >
                    {rec.approved ? 'Approved ✓' : 'Approve Directive'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-xl border border-light-outline">
                  <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block mb-1">
                    AI Clinical Logic &amp; Explanation
                  </span>
                  <p className="text-light-primary">{rec.explanation}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-light-outline">
                  <span className="text-[10px] uppercase font-bold text-secondary block mb-1">
                    Auditable Telemetry &amp; Evidence
                  </span>
                  <p className="text-light-on-surface-variant">{rec.supportingData}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  );
};

export const CrowdPrediction: React.FC = () => <AiDashboard />;
export const QueueOptimization: React.FC = () => <AiDashboard />;
export const DigitalTwinSimulation: React.FC = () => <AiDashboard />;

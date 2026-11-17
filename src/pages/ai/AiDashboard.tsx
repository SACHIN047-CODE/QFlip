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
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-amber-600 text-lg">science</span>
          <span>
            <strong>Simulated Telemetry Notice:</strong> Real-time neural models running against Civil Hospital
            Ambala historical benchmarks. Switch parameters in the Digital Twin simulator below to preview operational
            impacts.
          </span>
        </div>
        <span className="font-code font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded self-start sm:self-auto">
          AI Engine v2.4 Active
        </span>
      </div>

      {/* SECTION 1: CROWD PREDICTION & SURGE FORECASTING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ChartContainer
            title="Hourly Patient Volume Prediction &amp; Surge Forecast"
            subtitle="Comparing historical baseline arrivals vs predicted surge peaks"
            badge="Next 8 Hours"
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2585E8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2585E8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
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
                    dataKey="predictedVolume"
                    name="Predicted Patient Surge"
                    stroke="#2585E8"
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
        </div>

        {/* Surge Alert Card */}
        <div className="lg:col-span-4 bg-light-surface rounded-2xl border-2 border-danger/40 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-light-outline">
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-danger flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-danger animate-ping"></span>
              Surge Forecast: High Risk
            </span>
            <span className="font-code text-xs text-light-on-surface-variant">11:00 AM – 01:00 PM</span>
          </div>

          <div>
            <h3 className="font-headline text-title-md font-bold text-light-primary">
              Expected Patient Rush: +42% Inflow
            </h3>
            <p className="text-xs text-light-on-surface-variant mt-1 leading-relaxed">
              Inter-district bus schedules &amp; weather changes will cause significant crowding in General Medicine
              and Pediatric OPDs.
            </p>
          </div>

          <div className="p-3 bg-danger/5 rounded-xl border border-danger/20 text-xs space-y-2">
            <div className="font-bold text-danger">Recommended Staff Adjustments:</div>
            <ul className="space-y-1.5 text-[11px] text-light-primary">
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">arrow_right</span>
                <span>Open OPD Room 14 &amp; 15 with Reserve Duty Doctors</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">arrow_right</span>
                <span>Deploy Registration Desk #03 &amp; #04 for rapid token issue</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">arrow_right</span>
                <span>Pre-package 100 fever/cough kits at Jan Aushadhi Chemist</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: DIGITAL TWIN INTERACTIVE SIMULATION */}
      <div className="bg-light-surface rounded-3xl border-2 border-secondary/40 p-6 sm:p-10 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-light-outline">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary/10 text-secondary text-xs font-bold mb-1">
              <span className="material-symbols-outlined text-sm">view_in_ar</span>
              Interactive Digital Twin Simulator
            </div>
            <h2 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
              Hospital Operations Scenario Modeling
            </h2>
            <p className="text-xs text-light-on-surface-variant mt-1">
              Test what happens to waiting lines and physician burnout when patient volume surges or doctors are added.
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-headline text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">
              {isSimulating ? 'autorenew' : 'play_circle'}
            </span>
            <span>{isSimulating ? 'Simulating Model...' : 'Run Simulation Scenario'}</span>
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {/* Slider 1: Patient Volume Multiplier */}
          <div className="p-4 bg-light-surface-variant rounded-2xl border border-light-outline space-y-3">
            <div className="flex justify-between font-bold text-light-primary">
              <span>Patient Arrival Rush:</span>
              <span className="font-code text-secondary">{Math.round(simParams.patientArrivalMultiplier * 100)}%</span>
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
              className="w-full accent-secondary cursor-pointer"
            />
            <span className="text-[10px] text-light-on-surface-variant block">Range: 50% to 250% of normal footfall</span>
          </div>

          {/* Slider 2: Active Doctor Staffing Ratio */}
          <div className="p-4 bg-light-surface-variant rounded-2xl border border-light-outline space-y-3">
            <div className="flex justify-between font-bold text-light-primary">
              <span>Active Doctor Staffing:</span>
              <span className="font-code text-secondary">{Math.round(simParams.activeDoctorRatio * 100)}%</span>
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
              className="w-full accent-secondary cursor-pointer"
            />
            <span className="text-[10px] text-light-on-surface-variant block">Simulate staff leaves or duty surge</span>
          </div>

          {/* Slider 3: Triage Speed / Voice Adoption */}
          <div className="p-4 bg-light-surface-variant rounded-2xl border border-light-outline space-y-3">
            <div className="flex justify-between font-bold text-light-primary">
              <span>Voice Triage Adoption:</span>
              <span className="font-code text-secondary">{simParams.triageEfficiencyGain}%</span>
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
              className="w-full accent-secondary cursor-pointer"
            />
            <span className="text-[10px] text-light-on-surface-variant block">Cuts registration counter bottleneck</span>
          </div>

          {/* Slider 4: Pharmacy Dispense Throughput */}
          <div className="p-4 bg-light-surface-variant rounded-2xl border border-light-outline space-y-3">
            <div className="flex justify-between font-bold text-light-primary">
              <span>Pharmacy Bundles:</span>
              <span className="font-code text-secondary">{simParams.pharmacyThroughput} kits/hr</span>
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
              className="w-full accent-secondary cursor-pointer"
            />
            <span className="text-[10px] text-light-on-surface-variant block">Pre-assembled medication packages</span>
          </div>
        </div>

        {/* Before vs After Simulation Comparison Result Cards */}
        {simResult && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
              <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
                Average Wait Time
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-headline text-lg text-slate-400 line-through font-code">
                  {simResult.avgWaitTimeBefore}m
                </span>
                <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
                <span
                  className={`font-headline text-3xl font-black font-code ${
                    simResult.avgWaitTimeAfter > 28 ? 'text-danger' : 'text-success'
                  }`}
                >
                  {simResult.avgWaitTimeAfter} mins
                </span>
              </div>
              <span className="text-[10px] text-light-on-surface-variant block">
                {simResult.avgWaitTimeAfter < simResult.avgWaitTimeBefore ? 'Improvement Achieved' : 'Potential Delay'}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
              <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
                Peak Queue Depth
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-headline text-lg text-slate-400 line-through font-code">
                  {simResult.peakQueueDepthBefore}
                </span>
                <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
                <span className="font-headline text-3xl font-black text-light-primary font-code">
                  {simResult.peakQueueDepthAfter}
                </span>
              </div>
              <span className="text-[10px] text-light-on-surface-variant block">Simulated Patients in Line</span>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
              <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
                Identified Bottleneck
              </span>
              <div className="font-headline text-sm font-bold text-light-primary mt-2">
                {simResult.bottleneckDepartment}
              </div>
              <span className="text-[10px] text-light-on-surface-variant block">Critical Path Department</span>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
              <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
                Physician Burnout Risk
              </span>
              <div className="mt-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    simResult.burnoutRiskLevel === 'HIGH'
                      ? 'bg-danger text-white'
                      : simResult.burnoutRiskLevel === 'MODERATE'
                      ? 'bg-warning/20 text-on-warning'
                      : 'bg-success/20 text-success'
                  }`}
                >
                  {simResult.burnoutRiskLevel} RISK
                </span>
              </div>
              <span className="text-[10px] text-light-on-surface-variant block mt-1">Based on patient velocity</span>
            </div>
          </div>
        )}

        {/* Recommended Digital Twin Interventions */}
        {simResult && (
          <div className="p-5 bg-secondary/5 rounded-2xl border border-secondary/20 space-y-2 text-xs">
            <span className="font-headline text-xs font-bold text-secondary uppercase block">
              Digital Twin AI Policy Suggestions:
            </span>
            <ul className="space-y-1.5 text-light-primary">
              {simResult.recommendedInterventions.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* SECTION 3: EXPLAINABLE AI RECOMMENDATION ENGINE */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-light-outline">
          <div>
            <h3 className="font-headline text-title-md font-bold text-light-primary">
              Explainable AI (XAI) Queue Directives
            </h3>
            <p className="text-xs text-light-on-surface-variant">
              Every machine recommendation provides auditable supporting clinical data and expected impact metrics
            </p>
          </div>
          <span className="text-xs font-bold text-secondary">100% Explainable Architecture</span>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl border border-light-outline bg-light-surface-variant/30 space-y-3 text-xs"
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
      </div>
    </div>
  );
};

export const CrowdPrediction: React.FC = () => <AiDashboard />;
export const QueueOptimization: React.FC = () => <AiDashboard />;
export const DigitalTwinSimulation: React.FC = () => <AiDashboard />;

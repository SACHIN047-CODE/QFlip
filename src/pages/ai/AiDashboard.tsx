import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useQueue } from '../../context/QueueContext';
import { DigitalTwinSimulationParams } from '../../types';
import { ChartContainer } from '../../components/common/LoadingSpinner';

const BASELINE_PARAMS: DigitalTwinSimulationParams = {
  patientArrivalMultiplier: 1.0,
  activeDoctorRatio: 1.0,
  triageEfficiencyGain: 0,
  pharmacyThroughput: 35,
};

const BASE_FORECAST_DATA = [
  { hour: '08:00 AM', historicalAverage: 35 },
  { hour: '09:00 AM', historicalAverage: 85 },
  { hour: '10:00 AM', historicalAverage: 145 },
  { hour: '11:00 AM', historicalAverage: 160 },
  { hour: '12:00 PM', historicalAverage: 130 },
  { hour: '01:00 PM', historicalAverage: 75 },
  { hour: '02:00 PM', historicalAverage: 45 },
  { hour: '03:00 PM', historicalAverage: 40 },
  { hour: '04:00 PM', historicalAverage: 30 },
];

interface XAIDirective {
  id: string;
  category: 'STAFFING' | 'QUEUE' | 'RESOURCE';
  action: string;
  impactMetric: string;
  explanation: string;
  evidence: string;
  impactReduction: number;
}

export const AiDashboard: React.FC = () => {
  const { tokens } = useQueue();

  // Digital Twin Simulation State
  const [simParams, setSimParams] = useState<DigitalTwinSimulationParams>({
    patientArrivalMultiplier: 1.25, // 125% rush initially
    activeDoctorRatio: 1.0,
    triageEfficiencyGain: 20,
    pharmacyThroughput: 35,
  });

  const [approvedDirectives, setApprovedDirectives] = useState<Record<string, boolean>>({});

  // Dynamic values derived from sliders
  const arrivalRate = Math.round(30 * simParams.patientArrivalMultiplier);
  const surgePercent = Math.round((simParams.patientArrivalMultiplier - 1.0) * 100);

  // Queue context derived telemetry
  const delayedTokens = useMemo(() => {
    return tokens.filter((t) => t.status === 'WAITING' || t.status === 'LAB_PENDING');
  }, [tokens]);

  // Rule 1: Only show Staffing Directive when arrivalRate > 30 (or surge slider > 20%)
  const showStaffingDirective = arrivalRate > 30 || surgePercent > 20;

  // Rule 2: Trigger Queue Balancing dynamically whenever delayedTokens.length >= 2
  const showQueueBalancing = delayedTokens.length >= 2;

  // Dynamic directives list
  const directives = useMemo<XAIDirective[]>(() => {
    const list: XAIDirective[] = [];

    // Rule 1: Staffing Directive
    if (showStaffingDirective) {
      list.push({
        id: 'directive-staffing',
        category: 'STAFFING',
        action: 'Reallocate 1 General Doctor to OPD-12 (Deploy On-Duty Floater Dr. Arvind Kumar to Room 14)',
        impactMetric: '-32% Wait Time',
        explanation: `OPD queue is accelerating at ${arrivalRate} patients/hr (+${surgePercent}% surge) following morning rural bus arrivals. Dr. Sharma alone will face a ${Math.max(
          36,
          Math.round(28 + (arrivalRate - 30) * 1.6)
        )}-minute average backlog by 11:30 AM without immediate secondary room allocation.`,
        evidence: `Turnstile LiDAR sensor trigger: ${arrivalRate} patients/hr ingress; single-physician bottleneck threshold (30 pt/hr) exceeded. Historical peak window: 10:30 AM – 1:00 PM.`,
        impactReduction: 0.32,
      });
    }

    // Rule 2: Queue Balancing Directive
    if (showQueueBalancing) {
      list.push({
        id: 'directive-queue',
        category: 'QUEUE',
        action: 'OPD / Phlebotomy Queue Balancing (Auto-route next 8 blood test tokens to Counter #2 display)',
        impactMetric: '-12 min Lab Transit',
        explanation: `Phlebotomy counter #1 has ${delayedTokens.length} patients delayed in queue while counter #2 has open capacity due to uneven slip direction. Re-routing balances transit load and unblocks laboratory sample intake.`,
        evidence: `Counter 2 technician idle for 8 mins; optical queue depth sensor proves ${delayedTokens.length} patients delayed beyond 15-minute standard threshold.`,
        impactReduction: 0.15,
      });
    }

    // Resource Directive: Formulary & Medicine Bundling
    list.push({
      id: 'directive-resource',
      category: 'RESOURCE',
      action: 'Pre-package Common Fever & Cough Rx Kits at Pharmacy (Pre-assemble 50 kits at Counter #01 for instant barcode checkout)',
      impactMetric: '4x Dispensing Speed',
      explanation: `68% of today's prescriptions contain standard Paracetamol + Cetirizine + Antacid combinations during monsoon weather. Pre-bundling eliminates pharmacist manual item picking delay.`,
      evidence: `Jan Aushadhi inventory telemetry: batch #MN-2026 formulary kits in stock; current counter throughput is ${simParams.pharmacyThroughput} kits/hr.`,
      impactReduction: 0.12,
    });

    return list;
  }, [showStaffingDirective, showQueueBalancing, arrivalRate, surgePercent, delayedTokens.length, simParams.pharmacyThroughput]);

  // Calculate total approved impact from active directives
  const totalApprovedImpact = useMemo(() => {
    let impact = 0;
    directives.forEach((d) => {
      if (approvedDirectives[d.id]) {
        impact += d.impactReduction;
      }
    });
    return Math.min(impact, 0.60); // Cap at 60% total reduction
  }, [directives, approvedDirectives]);

  // Dynamic Chart Forecast Data
  // Baseline remains CONSTANT; Predicted volume reacts in real time to sliders & approved directive impacts
  const chartData = useMemo(() => {
    return BASE_FORECAST_DATA.map((item) => {
      const baseline = item.historicalAverage;
      // Surge scaled by arrival slider
      const rawSurge = baseline * simParams.patientArrivalMultiplier;
      // Operational relief from doctor ratio and voice triage
      const operationalRelief =
        (simParams.activeDoctorRatio - 1.0) * 0.22 +
        (simParams.triageEfficiencyGain / 100) * 0.16;
      // Apply operational parameters
      const operationalVolume = rawSurge * (1 - operationalRelief);
      // Automatically apply approved directive impact (e.g. -32% Wait Time so blue line visibly drops!)
      const finalPredicted = Math.round(
        Math.max(12, operationalVolume * (1 - totalApprovedImpact))
      );

      return {
        hour: item.hour,
        historicalAverage: baseline,
        predictedVolume: finalPredicted,
      };
    });
  }, [simParams, totalApprovedImpact]);

  // Dynamic Simulation Metrics
  const simMetrics = useMemo(() => {
    const baselineWait = 28; // minutes
    const waitRatio =
      (simParams.patientArrivalMultiplier / simParams.activeDoctorRatio) *
      (1 - simParams.triageEfficiencyGain / 100);
    const mitigatedWait = Math.max(
      8,
      Math.round(baselineWait * waitRatio * (1 - totalApprovedImpact))
    );

    const peakDepthBefore = Math.round(145 * simParams.patientArrivalMultiplier);
    const peakDepthAfter = Math.max(
      15,
      Math.round(
        (peakDepthBefore /
          (simParams.activeDoctorRatio * (1 + simParams.triageEfficiencyGain / 100))) *
          (1 - totalApprovedImpact * 0.7)
      )
    );

    let bottleneck = 'General Medicine OPD';
    if (simParams.patientArrivalMultiplier > 1.3 && simParams.activeDoctorRatio <= 1.0) {
      bottleneck = 'OPD Room 12 Consultation Bottleneck';
    } else if (simParams.pharmacyThroughput < 30) {
      bottleneck = 'Jan Aushadhi Pharmacy Counter #01';
    } else if (simParams.triageEfficiencyGain < 10 && simParams.patientArrivalMultiplier > 1.1) {
      bottleneck = 'Front Desk Registration Ingress';
    } else if (totalApprovedImpact >= 0.32) {
      bottleneck = 'Optimal Load Distribution (Resolved)';
    }

    const effectiveLoad =
      (simParams.patientArrivalMultiplier / simParams.activeDoctorRatio) *
      (1 - totalApprovedImpact);
    const burnoutRisk: 'LOW' | 'MODERATE' | 'HIGH' =
      effectiveLoad > 1.25 ? 'HIGH' : effectiveLoad > 0.95 ? 'MODERATE' : 'LOW';

    const policySuggestions: string[] = [];
    if (totalApprovedImpact > 0) {
      policySuggestions.push(
        `Active Directive Applied: -${Math.round(totalApprovedImpact * 100)}% queue mitigation dispatched across active clinical wings.`
      );
    }
    if (simParams.patientArrivalMultiplier > 1.2) {
      policySuggestions.push(
        `Surge Ingress: Deploy Reserve Floater Doctors to General Medicine Room 14 & 15.`
      );
    }
    if (simParams.triageEfficiencyGain < 15) {
      policySuggestions.push(
        `Voice Triage: Increase Multi-Lingual Kiosk adoption at main porch to cut counter queue by 35%.`
      );
    }
    if (simParams.pharmacyThroughput < 40) {
      policySuggestions.push(
        `Pharmacy Pre-Bundling: Pre-assemble standard fever/cough kits at Counter #1.`
      );
    }
    if (policySuggestions.length === 0) {
      policySuggestions.push(
        `Current parameters maintain optimal patient flow under NHM benchmark (Average Wait < 20 mins).`
      );
    }

    return {
      avgWaitTimeBefore: baselineWait,
      avgWaitTimeAfter: mitigatedWait,
      peakQueueDepthBefore: peakDepthBefore,
      peakQueueDepthAfter: peakDepthAfter,
      bottleneckDepartment: bottleneck,
      burnoutRiskLevel: burnoutRisk,
      recommendedInterventions: policySuggestions,
    };
  }, [simParams, totalApprovedImpact]);

  // Toggle approval state for a directive
  const handleToggleApproval = (id: string) => {
    setApprovedDirectives((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Reset to live OPD baseline
  const handleResetBaseline = () => {
    setSimParams({ ...BASELINE_PARAMS });
    setApprovedDirectives({});
  };

  return (
    <div className="space-y-8">
      {/* Simulation / Real AI Notice Banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-amber-600 text-lg">science</span>
          <span>
            <strong>Simulated Telemetry Notice:</strong> Real-time neural models running against Civil Hospital
            Ambala historical benchmarks. Move parameters in the Digital Twin simulator below to preview operational
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
            subtitle="Comparing constant historical baseline arrivals vs projected curve (reacts dynamically to sliders &amp; approved directives)"
            badge="Next 8 Hours"
          >
            {totalApprovedImpact > 0 && (
              <div className="mb-2 px-3 py-1.5 rounded-lg bg-success/15 border border-success/30 flex items-center justify-between text-xs text-success font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Directives Dispatched: -{Math.round(totalApprovedImpact * 100)}% Wait Time Mitigation Applied
                </span>
                <span className="font-code text-[11px]">Blue Curve Adjusted</span>
              </div>
            )}
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
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
                    name="Predicted Patient Surge (Reactive)"
                    stroke="#2585E8"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorPredicted)"
                  />
                  <Area
                    type="monotone"
                    dataKey="historicalAverage"
                    name="Historical Baseline (Constant)"
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
              Surge Forecast: {simParams.patientArrivalMultiplier > 1.2 ? 'High Risk' : 'Normal Operations'}
            </span>
            <span className="font-code text-xs text-light-on-surface-variant">11:00 AM – 01:00 PM</span>
          </div>

          <div>
            <h3 className="font-headline text-title-md font-bold text-light-primary">
              Expected Inflow: {surgePercent >= 0 ? `+${surgePercent}% Surge` : `${surgePercent}% Below Base`}
            </h3>
            <p className="text-xs text-light-on-surface-variant mt-1 leading-relaxed">
              {simParams.patientArrivalMultiplier > 1.2
                ? 'Morning rural bus arrival influx is generating elevated waiting pressure in General Medicine OPD-12.'
                : 'Current footfall is within baseline capacity. OPD consultation desks operating smoothly.'}
            </p>
          </div>

          <div className="p-3 bg-danger/5 rounded-xl border border-danger/20 text-xs space-y-2">
            <div className="font-bold text-danger">Real-time Operational Telemetry:</div>
            <ul className="space-y-1.5 text-[11px] text-light-primary">
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">arrow_right</span>
                <span>Inflow Rate: <strong>{arrivalRate} patients/hour</strong></span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">arrow_right</span>
                <span>Active Doctor Capacity: <strong>{Math.round(simParams.activeDoctorRatio * 100)}%</strong></span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">arrow_right</span>
                <span>
                  Directive Mitigation Applied:{' '}
                  <strong>{totalApprovedImpact > 0 ? `-${Math.round(totalApprovedImpact * 100)}%` : 'None (Pending Approval)'}</strong>
                </span>
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

          {/* Reset to Live OPD Baseline Button */}
          <button
            onClick={handleResetBaseline}
            className="px-5 py-2.5 bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-headline text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto group"
            title="Reset simulation sliders & directives to live OPD baseline"
          >
            <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-300">
              restart_alt
            </span>
            <span>Reset to Live OPD Baseline</span>
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
              step={0.05}
              value={simParams.patientArrivalMultiplier}
              onChange={(e) =>
                setSimParams((prev) => ({
                  ...prev,
                  patientArrivalMultiplier: parseFloat(e.target.value),
                }))
              }
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant">
              <span>50% to 250% footfall</span>
              <span className="font-bold text-light-primary font-code">{arrivalRate} pt/hr</span>
            </div>
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
              onChange={(e) =>
                setSimParams((prev) => ({
                  ...prev,
                  activeDoctorRatio: parseFloat(e.target.value),
                }))
              }
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant">
              <span>50% to 180% coverage</span>
              <span className="font-bold text-light-primary font-code">
                {simParams.activeDoctorRatio >= 1.0 ? 'Standard/Surge' : 'Shortage'}
              </span>
            </div>
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
              onChange={(e) =>
                setSimParams((prev) => ({
                  ...prev,
                  triageEfficiencyGain: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant">
              <span>0% to 50% speedup</span>
              <span className="font-bold text-light-primary font-code">Kiosk Stream</span>
            </div>
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
              onChange={(e) =>
                setSimParams((prev) => ({
                  ...prev,
                  pharmacyThroughput: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant">
              <span>10 to 80 kits/hr</span>
              <span className="font-bold text-light-primary font-code">Jan Aushadhi</span>
            </div>
          </div>
        </div>

        {/* Before vs After Simulation Comparison Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {/* Metric 1: Average Wait Time */}
          <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
            <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
              Average Wait Time
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-headline text-lg text-slate-400 line-through font-code">
                {simMetrics.avgWaitTimeBefore}m
              </span>
              <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
              <span
                className={`font-headline text-3xl font-black font-code ${
                  simMetrics.avgWaitTimeAfter > 28 ? 'text-danger' : 'text-success'
                }`}
              >
                {simMetrics.avgWaitTimeAfter} mins
              </span>
            </div>
            <span className="text-[10px] text-light-on-surface-variant block">
              {simMetrics.avgWaitTimeAfter < simMetrics.avgWaitTimeBefore ? 'Improvement Achieved' : 'Potential Delay'}
            </span>
          </div>

          {/* Metric 2: Peak Queue Depth */}
          <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
            <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
              Peak Queue Depth
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-headline text-lg text-slate-400 line-through font-code">
                {simMetrics.peakQueueDepthBefore}
              </span>
              <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
              <span className="font-headline text-3xl font-black text-light-primary font-code">
                {simMetrics.peakQueueDepthAfter}
              </span>
            </div>
            <span className="text-[10px] text-light-on-surface-variant block">Simulated Patients in Line</span>
          </div>

          {/* Metric 3: Identified Bottleneck */}
          <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
            <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
              Identified Bottleneck
            </span>
            <div className="font-headline text-sm font-bold text-light-primary mt-2">
              {simMetrics.bottleneckDepartment}
            </div>
            <span className="text-[10px] text-light-on-surface-variant block">Critical Path Department</span>
          </div>

          {/* Metric 4: Physician Burnout Risk */}
          <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
            <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
              Physician Burnout Risk
            </span>
            <div className="mt-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  simMetrics.burnoutRiskLevel === 'HIGH'
                    ? 'bg-danger text-white'
                    : simMetrics.burnoutRiskLevel === 'MODERATE'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-success/20 text-success'
                }`}
              >
                {simMetrics.burnoutRiskLevel} RISK
              </span>
            </div>
            <span className="text-[10px] text-light-on-surface-variant block mt-1">Based on patient velocity</span>
          </div>
        </div>

        {/* Recommended Digital Twin Interventions */}
        <div className="p-5 bg-secondary/5 rounded-2xl border border-secondary/20 space-y-2 text-xs">
          <span className="font-headline text-xs font-bold text-secondary uppercase block">
            Digital Twin AI Policy Suggestions:
          </span>
          <ul className="space-y-1.5 text-light-primary">
            {simMetrics.recommendedInterventions.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SECTION 3: EXPLAINABLE AI RECOMMENDATION ENGINE */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-light-outline">
          <div>
            <h3 className="font-headline text-title-md font-bold text-light-primary">
              Explainable AI (XAI) Queue Directives
            </h3>
            <p className="text-xs text-light-on-surface-variant">
              Every machine recommendation provides auditable supporting clinical data, live telemetry triggers, and expected impact metrics
            </p>
          </div>
          <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-lg border border-secondary/20 self-start sm:self-auto">
            100% Explainable Architecture
          </span>
        </div>

        <div className="space-y-4">
          {directives.map((rec) => {
            const isApproved = !!approvedDirectives[rec.id];

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 text-xs ${
                  isApproved
                    ? 'border-success/50 bg-success/5 shadow-sm'
                    : 'border-light-outline bg-light-surface-variant/30'
                }`}
              >
                {/* Header: Category Tag & Concrete Action + Expected Impact Metric + Approval Badge/Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2.5 py-0.5 rounded font-code font-bold text-[10px] ${
                        rec.category === 'STAFFING'
                          ? 'bg-secondary/15 text-secondary'
                          : rec.category === 'QUEUE'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {rec.category}
                    </span>
                    <h4 className="font-headline text-sm font-bold text-light-primary">{rec.action}</h4>
                  </div>

                  <div className="flex items-center gap-2.5 self-start sm:self-auto">
                    {/* Expected Impact Metric */}
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-accent text-on-accent font-code shadow-xs">
                      {rec.impactMetric}
                    </span>

                    {/* Approve Directive Button / Green Approved & Dispatched Badge */}
                    <button
                      onClick={() => handleToggleApproval(rec.id)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all ${
                        isApproved
                          ? 'bg-success hover:bg-emerald-700 text-white shadow-emerald-500/20'
                          : 'bg-light-primary text-white hover:bg-slate-800'
                      }`}
                      title={isApproved ? 'Click to revoke directive' : 'Click to approve & dispatch directive to live queue'}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isApproved ? 'check_circle' : 'bolt'}
                      </span>
                      <span>{isApproved ? '✓ Approved & Dispatched' : 'Approve Directive'}</span>
                    </button>
                  </div>
                </div>

                {/* Body: AI Clinical Logic & Explanation + Auditable Telemetry & Evidence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-white rounded-xl border border-light-outline space-y-1">
                    <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block tracking-wider">
                      AI Clinical Logic &amp; Explanation
                    </span>
                    <p className="text-light-primary leading-relaxed">{rec.explanation}</p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-light-outline space-y-1">
                    <span className="text-[10px] uppercase font-bold text-secondary block tracking-wider">
                      Auditable Telemetry &amp; Evidence
                    </span>
                    <p className="text-light-on-surface-variant leading-relaxed font-mono text-[11px]">
                      {rec.evidence}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const CrowdPrediction: React.FC = () => <AiDashboard />;
export const QueueOptimization: React.FC = () => <AiDashboard />;
export const DigitalTwinSimulation: React.FC = () => <AiDashboard />;

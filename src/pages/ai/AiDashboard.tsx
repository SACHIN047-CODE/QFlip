import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { queueService } from '../../services/queueService';
import { PatientToken } from '../../types';
import { ChartContainer } from '../../components/common/LoadingSpinner';
import {
  SimulationParams,
  BASELINE_SIM_PARAMS,
  BASELINE_AVG_WAIT_MINUTES,
  DynamicDirective,
  AuditRecord,
  digitalTwinSimulationEngine,
} from '../../services/digitalTwinSimulation';

export const AiDashboard: React.FC = () => {
  // Live Token Queue data from main token service
  const [tokens, setTokens] = useState<PatientToken[]>([]);

  // Simulation parameters reactive state
  const [simParams, setSimParams] = useState<SimulationParams>({ ...BASELINE_SIM_PARAMS });

  // Approved directives map (preserves approval status and audit history)
  const [approvedDirectivesMap, setApprovedDirectivesMap] = useState<Record<string, DynamicDirective>>({});
  const [auditLog, setAuditLog] = useState<AuditRecord[]>([]);

  // Graph metric mode: 'wait_time' | 'patient_volume'
  const [graphMode, setGraphMode] = useState<'wait_time' | 'patient_volume'>('wait_time');

  // Load real queue tokens on mount
  useEffect(() => {
    queueService.getTokens().then((loadedTokens) => {
      setTokens(loadedTokens);
    });
  }, []);

  // Approved directive IDs currently active in simulation
  const approvedDirectiveIds = useMemo(() => {
    return Object.keys(approvedDirectivesMap).filter((id) => approvedDirectivesMap[id]?.approved);
  }, [approvedDirectivesMap]);

  // Reactive simulation calculation: runs immediately on every slider or approval change
  const outcome = useMemo(() => {
    return digitalTwinSimulationEngine.calculateProjection(simParams, approvedDirectiveIds);
  }, [simParams, approvedDirectiveIds]);

  // Reactive XAI Directives generation: updates whenever parameters or queue tokens change
  const dynamicDirectives = useMemo(() => {
    return digitalTwinSimulationEngine.generateDirectives(simParams, tokens, approvedDirectivesMap);
  }, [simParams, tokens, approvedDirectivesMap]);

  // Update slider parameter helper
  const handleSliderChange = <K extends keyof SimulationParams>(key: K, value: SimulationParams[K]) => {
    setSimParams((prev) => {
      const updated = { ...prev, [key]: value };
      // Synchronize related parameters
      if (key === 'patientArrivalMultiplier') {
        const mult = Number(value);
        updated.arrivalRate = Math.round(25 * mult);
        updated.patientSurgePercent = Math.round((mult - 1.0) * 100);
      } else if (key === 'patientSurgePercent') {
        const surge = Number(value);
        const mult = 1.0 + surge / 100;
        updated.patientArrivalMultiplier = Math.round(mult * 100) / 100;
        updated.arrivalRate = Math.round(25 * mult);
      } else if (key === 'activeDoctors') {
        const docs = Number(value);
        updated.activeDoctorRatio = Math.round((docs / 4) * 100) / 100;
      } else if (key === 'activeDoctorRatio') {
        const ratio = Number(value);
        updated.activeDoctors = Math.max(1, Math.round(4 * ratio));
      }
      return updated;
    });
  };

  /**
   * RESET TO LIVE OPD BASELINE
   * Replaces the old manual "Run Simulation Scenario" button.
   * Restores all sliders to baseline, resets hypothetical directive impacts,
   * restores projected graph to baseline (45 mins), keeps actual baseline dataset unchanged.
   */
  const handleResetToBaseline = () => {
    setSimParams({ ...BASELINE_SIM_PARAMS });
    setApprovedDirectivesMap({});
  };

  /**
   * APPROVE DIRECTIVE FUNCTIONALITY (Section 3.1)
   * 1. Validates directive is applicable.
   * 2. Marks as approved and prevents duplicates.
   * 3. Changes button into green badge: "✓ Approved & Dispatched".
   * 4. Records entry in audit/history log.
   * 5. Applies impact to projected simulation, immediately updating graph (blue line drops!).
   * 6. Does NOT alter real hospital database.
   */
  const handleApproveDirective = (directiveId: string) => {
    const directive = dynamicDirectives.find((d) => d.id === directiveId);
    if (!directive || approvedDirectivesMap[directiveId]?.approved) return;

    const approvedDirective: DynamicDirective = {
      ...directive,
      approved: true,
      approvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setApprovedDirectivesMap((prev) => ({
      ...prev,
      [directiveId]: approvedDirective,
    }));

    // Record in audit log
    const newAuditRecord: AuditRecord = {
      id: `audit-${Date.now()}`,
      directiveId,
      title: directive.title,
      category: directive.category,
      impactMetric: directive.impactMetric,
      dispatchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      snapshotBeforeWait: outcome.projectedAvgWait,
      snapshotAfterWait: directive.category === 'STAFFING'
        ? Math.round(outcome.projectedAvgWait * 0.68)
        : Math.round(outcome.projectedAvgWait * 0.85),
    };

    setAuditLog((prev) => [newAuditRecord, ...prev]);
  };

  return (
    <div className="space-y-8">
      {/* Simulation / Real AI Notice Banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-amber-600 text-lg">science</span>
          <span>
            <strong>Digital Twin Operational Simulator:</strong> Real-time operations modeling comparing constant{' '}
            <strong>Live OPD Baseline</strong> ({BASELINE_AVG_WAIT_MINUTES}m benchmark) against hypothetical{' '}
            <strong>Projected Simulation</strong> scenarios. Moving sliders or approving directives recalculates
            projected telemetry immediately without altering real hospital records.
          </span>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="font-code font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded">
            Reactive Twin v3.1
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" title="Simulation Engine Synced"></span>
        </div>
      </div>

      {/* SECTION 1: DUAL-DATASET REACTIVE GRAPH (BASELINE VS PROJECTED) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ChartContainer
            title="OPD Outpatient Flow: Live Baseline vs Projected Simulation"
            subtitle="Comparing constant reference baseline against reactive hypothetical simulation outcome"
            badge="08:00 AM – 04:00 PM"
          >
            {/* Graph Mode Selector */}
            <div className="flex items-center justify-between pt-2 pb-1 border-b border-light-outline/40">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGraphMode('wait_time')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    graphMode === 'wait_time'
                      ? 'bg-secondary text-white shadow-sm'
                      : 'bg-light-surface-variant text-light-on-surface-variant hover:text-light-primary'
                  }`}
                >
                  Average Wait Time (Mins)
                </button>
                <button
                  type="button"
                  onClick={() => setGraphMode('patient_volume')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    graphMode === 'patient_volume'
                      ? 'bg-secondary text-white shadow-sm'
                      : 'bg-light-surface-variant text-light-on-surface-variant hover:text-light-primary'
                  }`}
                >
                  Patient Arrival Volume (Pts/Hr)
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-[11px] font-semibold">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-500 inline-block"></span>
                  Live OPD Baseline (Constant)
                </span>
                <span className="flex items-center gap-1.5 text-secondary">
                  <span className="w-4 h-1 bg-secondary inline-block rounded"></span>
                  Projected Simulation (Dynamic)
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                {graphMode === 'wait_time' ? (
                  <AreaChart data={outcome.graphData}>
                    <defs>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2585E8" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#2585E8" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DEE2E6" />
                    <XAxis dataKey="hour" stroke="#495057" fontSize={10} />
                    <YAxis
                      stroke="#495057"
                      fontSize={11}
                      domain={[0, 'auto']}
                      label={{ value: 'Wait (mins)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748B' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid #DEE2E6',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                      formatter={(val: any, name: string) => [
                        `${val} mins`,
                        name === 'projectedWait' ? 'Projected Simulation' : 'Live OPD Baseline (Ref)',
                      ]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Area
                      type="monotone"
                      dataKey="projectedWait"
                      name="Projected Simulation"
                      stroke="#2585E8"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorProjected)"
                      isAnimationActive={true}
                    />
                    <Area
                      type="monotone"
                      dataKey="baselineWait"
                      name="Live OPD Baseline (Constant)"
                      stroke="#64748B"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorBaseline)"
                    />
                  </AreaChart>
                ) : (
                  <LineChart data={outcome.graphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DEE2E6" />
                    <XAxis dataKey="hour" stroke="#495057" fontSize={10} />
                    <YAxis
                      stroke="#495057"
                      fontSize={11}
                      label={{ value: 'Patients / Hr', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748B' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid #DEE2E6',
                        fontSize: '12px',
                      }}
                      formatter={(val: any, name: string) => [
                        `${val} pts/hr`,
                        name === 'projectedVolume' ? 'Projected Footfall' : 'Baseline Footfall',
                      ]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line
                      type="monotone"
                      dataKey="projectedVolume"
                      name="Projected Simulation Volume"
                      stroke="#2585E8"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="baselineVolume"
                      name="Live Baseline Volume"
                      stroke="#64748B"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>

        {/* Live Operational Status Card */}
        <div className="lg:col-span-4 bg-light-surface rounded-2xl border-2 border-secondary/30 p-6 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <span className="font-headline text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                Operational Comparison
              </span>
              <span className="font-code text-xs text-light-on-surface-variant">Live Telemetry</span>
            </div>

            <div>
              <div className="text-[11px] uppercase font-bold text-light-on-surface-variant">
                Live OPD Baseline Wait:
              </div>
              <div className="font-headline text-3xl font-extrabold text-slate-600 font-code mt-0.5">
                {outcome.baselineAvgWait} mins
              </div>
              <div className="text-[11px] text-light-on-surface-variant mt-0.5">
                Standard reference line across hospital shifts
              </div>
            </div>

            <div className="pt-2 border-t border-light-outline">
              <div className="text-[11px] uppercase font-bold text-secondary">
                Projected Simulation Wait:
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span
                  className={`font-headline text-4xl font-black font-code ${
                    outcome.projectedAvgWait > outcome.baselineAvgWait
                      ? 'text-danger'
                      : outcome.projectedAvgWait < outcome.baselineAvgWait
                      ? 'text-success'
                      : 'text-secondary'
                  }`}
                >
                  {outcome.projectedAvgWait} mins
                </span>
                <span className="text-xs font-bold text-light-on-surface-variant">
                  {outcome.projectedAvgWait > outcome.baselineAvgWait
                    ? `(+${outcome.projectedAvgWait - outcome.baselineAvgWait}m delay)`
                    : outcome.projectedAvgWait < outcome.baselineAvgWait
                    ? `(-${outcome.baselineAvgWait - outcome.projectedAvgWait}m saved)`
                    : '(At baseline)'}
                </span>
              </div>
              <div className="text-[11px] text-light-on-surface-variant mt-1">
                Updates dynamically with every slider or approved directive
              </div>
            </div>

            {/* Directive Impact Badge if applied */}
            {outcome.approvedImpactNotes.length > 0 && (
              <div className="p-3 bg-success/10 rounded-xl border border-success/30 text-xs text-success-700 space-y-1">
                <div className="font-bold text-success flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Directives Applied to Simulation:
                </div>
                {outcome.approvedImpactNotes.map((note, idx) => (
                  <div key={idx} className="text-[11px] text-light-primary">
                    • {note}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-light-surface-variant/60 rounded-xl border border-light-outline text-[11px] text-light-on-surface-variant">
            <strong className="text-light-primary">Notice:</strong> Live baseline data remains untouched. Only hypothetical simulation variables are adjusted.
          </div>
        </div>
      </div>

      {/* SECTION 2: DIGITAL TWIN INTERACTIVE SIMULATION & CONTROLS */}
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
              Test what happens to waiting lines and physician burnout when patient volume surges or doctors are reallocated.
            </p>
          </div>

          {/* RESET TO LIVE OPD BASELINE BUTTON (Replaces Run Simulation Scenario) */}
          <button
            onClick={handleResetToBaseline}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-headline text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2.5 self-start sm:self-auto border border-slate-700 active:scale-95"
            title="Restore all sliders and graph to live OPD baseline values"
          >
            <span className="material-symbols-outlined text-base text-amber-400">restart_alt</span>
            <span>Reset to Live OPD Baseline</span>
          </button>
        </div>

        {/* Sliders Grid: Connected reactively to simulation calculation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {/* Slider 1: Patient Surge & Arrival Rate */}
          <div className="p-4 bg-light-surface-variant rounded-2xl border border-light-outline space-y-3">
            <div className="flex justify-between font-bold text-light-primary">
              <span>Patient Surge &amp; Influx:</span>
              <span className="font-code text-secondary">
                {simParams.patientSurgePercent >= 0 ? `+${simParams.patientSurgePercent}%` : `${simParams.patientSurgePercent}%`}
              </span>
            </div>
            <input
              type="range"
              min={-50}
              max={150}
              step={5}
              value={simParams.patientSurgePercent}
              onChange={(e) => handleSliderChange('patientSurgePercent', parseInt(e.target.value, 10))}
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant font-code">
              <span>Arrival: {simParams.arrivalRate} pts/hr</span>
              <span>Multiplier: {simParams.patientArrivalMultiplier.toFixed(2)}x</span>
            </div>
          </div>

          {/* Slider 2: Available Doctors */}
          <div className="p-4 bg-light-surface-variant rounded-2xl border border-light-outline space-y-3">
            <div className="flex justify-between font-bold text-light-primary">
              <span>Doctor Staffing Availability:</span>
              <span className="font-code text-secondary">{simParams.activeDoctors} Doctors</span>
            </div>
            <input
              type="range"
              min={2}
              max={8}
              step={1}
              value={simParams.activeDoctors}
              onChange={(e) => handleSliderChange('activeDoctors', parseInt(e.target.value, 10))}
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant font-code">
              <span>Staffing: {Math.round(simParams.activeDoctorRatio * 100)}%</span>
              <span>Baseline: 4 Docs</span>
            </div>
          </div>

          {/* Slider 3: Voice Triage Speedup */}
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
              onChange={(e) => handleSliderChange('triageEfficiencyGain', parseInt(e.target.value, 10))}
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant font-code">
              <span>Relief: cuts intake choke</span>
              <span>Baseline: 15%</span>
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
              onChange={(e) => handleSliderChange('pharmacyThroughput', parseInt(e.target.value, 10))}
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-light-on-surface-variant font-code">
              <span>Dispense Velocity</span>
              <span>Baseline: 35 kits</span>
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
                {outcome.baselineAvgWait}m
              </span>
              <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
              <span
                className={`font-headline text-3xl font-black font-code ${
                  outcome.projectedAvgWait > outcome.baselineAvgWait ? 'text-danger' : 'text-success'
                }`}
              >
                {outcome.projectedAvgWait} mins
              </span>
            </div>
            <span className="text-[10px] text-light-on-surface-variant block">
              {outcome.projectedAvgWait <= outcome.baselineAvgWait ? 'Within NHM Target' : 'Crowd Influx Delay'}
            </span>
          </div>

          {/* Metric 2: Peak Queue Depth */}
          <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
            <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
              Peak Queue Depth
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-headline text-lg text-slate-400 line-through font-code">
                {outcome.peakQueueDepthBefore}
              </span>
              <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
              <span className="font-headline text-3xl font-black text-light-primary font-code">
                {outcome.peakQueueDepthAfter}
              </span>
            </div>
            <span className="text-[10px] text-light-on-surface-variant block">Simulated Patients in Line</span>
          </div>

          {/* Metric 3: Identified Bottleneck */}
          <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
            <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
              Identified Bottleneck
            </span>
            <div className="font-headline text-xs font-bold text-light-primary mt-2 min-h-[32px] flex items-center justify-center">
              {outcome.bottleneckDepartment}
            </div>
            <span className="text-[10px] text-light-on-surface-variant block">Critical Path Focus</span>
          </div>

          {/* Metric 4: Physician Burnout Risk */}
          <div className="p-5 rounded-2xl border bg-light-surface-variant/40 border-light-outline space-y-1">
            <span className="text-xs uppercase font-bold text-light-on-surface-variant block">
              Physician Burnout Risk
            </span>
            <div className="mt-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  outcome.burnoutRiskLevel === 'HIGH'
                    ? 'bg-danger text-white'
                    : outcome.burnoutRiskLevel === 'MODERATE'
                    ? 'bg-warning/20 text-on-warning'
                    : 'bg-success/20 text-success'
                }`}
              >
                {outcome.burnoutRiskLevel} RISK
              </span>
            </div>
            <span className="text-[10px] text-light-on-surface-variant block mt-1">
              {outcome.effectiveDoctors} active doctors on floor
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: DYNAMIC EXPLAINABLE AI (XAI) QUEUE DIRECTIVES */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-light-outline">
          <div>
            <h3 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">auto_awesome</span>
              Explainable AI (XAI) Queue Directives
            </h3>
            <p className="text-xs text-light-on-surface-variant">
              Every machine recommendation provides auditable supporting clinical data and expected impact metrics.
              Directives update dynamically as simulation sliders and queue data change.
            </p>
          </div>
          <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-lg self-start sm:self-auto">
            100% Explainable Architecture
          </span>
        </div>

        {/* Dynamic Directives List */}
        {dynamicDirectives.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-light-outline bg-light-surface-variant/20 space-y-2">
            <span className="material-symbols-outlined text-3xl text-success">check_circle</span>
            <div className="font-headline text-sm font-bold text-light-primary">
              All Parameters Within Optimal Benchmarks
            </div>
            <p className="text-xs text-light-on-surface-variant max-w-md mx-auto">
              Current patient arrival rate ({simParams.arrivalRate} pts/hr) and queue backlog are operating safely.
              Increase Patient Surge &gt; 20% or Arrival Rate &gt; 30 pts/hr to trigger dynamic AI staffing interventions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {dynamicDirectives.map((rec) => {
              const isApproved = rec.approved;
              return (
                <div
                  key={rec.id}
                  className={`p-5 rounded-2xl border transition-all space-y-4 text-xs ${
                    isApproved
                      ? 'border-success/40 bg-success/5'
                      : 'border-light-outline bg-light-surface-variant/30'
                  }`}
                >
                  {/* Top Bar: Category, Action, Impact, Approval Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded font-code font-bold text-[10px] ${
                          rec.category === 'STAFFING'
                            ? 'bg-secondary/15 text-secondary'
                            : rec.category === 'QUEUE'
                            ? 'bg-amber-500/15 text-amber-800'
                            : 'bg-emerald-500/15 text-emerald-800'
                        }`}
                      >
                        {rec.category}
                      </span>
                      <h4 className="font-headline text-sm font-bold text-light-primary">{rec.title}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Expected Impact Metric */}
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent text-on-accent shadow-sm">
                        {rec.impactMetric}
                      </span>

                      {/* Approval Action Button / Status Badge (Section 3.1) */}
                      {isApproved ? (
                        <div className="px-3.5 py-1.5 rounded-lg bg-success text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                          <span className="material-symbols-outlined text-sm">verified</span>
                          <span>✓ Approved &amp; Dispatched</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApproveDirective(rec.id)}
                          className="px-4 py-2 bg-light-primary hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                          title="Apply this simulated intervention to the Digital Twin"
                        >
                          <span className="material-symbols-outlined text-sm text-accent">bolt</span>
                          <span>Approve Directive</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 4 Information Categories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category 3: AI Clinical Logic & Explanation */}
                    <div className="p-3.5 bg-white rounded-xl border border-light-outline space-y-1">
                      <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">
                        AI Clinical Logic &amp; Operational Explanation
                      </span>
                      <p className="text-light-primary leading-relaxed">{rec.explanation}</p>
                    </div>

                    {/* Category 4: Auditable Telemetry & Evidence */}
                    <div className="p-3.5 bg-white rounded-xl border border-light-outline space-y-1">
                      <span className="text-[10px] uppercase font-bold text-secondary block">
                        Auditable Telemetry &amp; Underlying Evidence
                      </span>
                      <p className="text-light-on-surface-variant font-code text-[11px] leading-relaxed">
                        {rec.telemetry}
                      </p>
                    </div>
                  </div>

                  {/* Simulated impact notice if approved */}
                  {isApproved && rec.appliedImpactDescription && (
                    <div className="p-2.5 bg-success/10 rounded-lg text-[11px] text-success-800 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-success">info</span>
                      <span>
                        <strong>Simulation Impact Active:</strong> {rec.appliedImpactDescription} Projected graph
                        updated in real-time.
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* AUDIT TRAIL / DISPATCHED INTERVENTIONS LOG */}
        {auditLog.length > 0 && (
          <div className="pt-4 border-t border-light-outline space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-headline text-xs font-bold uppercase tracking-wider text-light-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">history</span>
                Preserved Audit Trail of Dispatched Directives
              </span>
              <span className="text-[11px] text-light-on-surface-variant">
                {auditLog.length} simulated intervention{auditLog.length > 1 ? 's' : ''} recorded
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-light-outline rounded-xl overflow-hidden">
                <thead className="bg-light-surface-variant text-light-primary font-bold text-[11px]">
                  <tr>
                    <th className="p-2.5">Time</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Intervention</th>
                    <th className="p-2.5">Impact Metric</th>
                    <th className="p-2.5">Wait Before</th>
                    <th className="p-2.5">Wait After</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-outline bg-white">
                  {auditLog.map((log) => (
                    <tr key={log.id} className="hover:bg-light-surface-variant/20 font-code text-[11px]">
                      <td className="p-2.5 text-light-on-surface-variant">{log.dispatchedAt}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary font-bold text-[10px]">
                          {log.category}
                        </span>
                      </td>
                      <td className="p-2.5 font-bold font-sans text-light-primary">{log.title}</td>
                      <td className="p-2.5 text-accent-700 font-bold">{log.impactMetric}</td>
                      <td className="p-2.5 text-slate-500 line-through">{log.snapshotBeforeWait}m</td>
                      <td className="p-2.5 text-success font-bold">{log.snapshotAfterWait}m</td>
                      <td className="p-2.5">
                        <span className="text-success font-bold font-sans text-[10px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                          Dispatched
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CrowdPrediction: React.FC = () => <AiDashboard />;
export const QueueOptimization: React.FC = () => <AiDashboard />;
export const DigitalTwinSimulation: React.FC = () => <AiDashboard />;
export default AiDashboard;

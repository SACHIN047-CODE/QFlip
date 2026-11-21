import { PatientToken } from '../types';

export interface SimulationParams {
  patientArrivalMultiplier: number; // 0.5x to 2.5x (baseline: 1.0)
  patientSurgePercent: number; // -50% to +150% (baseline: 0%)
  arrivalRate: number; // patients/hr (baseline: 25)
  activeDoctorRatio: number; // 0.5x to 1.8x (baseline: 1.0)
  activeDoctors: number; // baseline: 4 doctors
  triageEfficiencyGain: number; // 0% to 50% (baseline: 15%)
  pharmacyThroughput: number; // 10 to 80 kits/hr (baseline: 35)
}

export interface HourlyGraphPoint {
  hour: string;
  baselineWait: number; // Constant reference line (minutes)
  projectedWait: number; // Dynamic simulated line (minutes)
  baselineVolume: number; // Reference arrivals
  projectedVolume: number; // Simulated arrivals
}

export interface SimulationOutcome {
  baselineAvgWait: number; // Constant 45 mins
  projectedAvgWait: number; // Dynamically computed
  peakQueueDepthBefore: number; // Baseline peak
  peakQueueDepthAfter: number; // Projected peak
  bottleneckDepartment: string;
  burnoutRiskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  graphData: HourlyGraphPoint[];
  effectiveDoctors: number;
  approvedImpactNotes: string[];
}

export interface DynamicDirective {
  id: string;
  ruleId: 'RULE_STAFFING' | 'RULE_QUEUE_BALANCING' | 'RULE_RESOURCE';
  title: string;
  category: 'STAFFING' | 'QUEUE' | 'RESOURCE';
  impactMetric: string;
  explanation: string;
  telemetry: string;
  approved: boolean;
  approvedAt?: string;
  appliedImpactDescription?: string;
}

export interface AuditRecord {
  id: string;
  directiveId: string;
  title: string;
  category: string;
  impactMetric: string;
  dispatchedAt: string;
  snapshotBeforeWait: number;
  snapshotAfterWait: number;
}

// -------------------------------------------------------------
// CONSTANT LIVE OPD BASELINE REFERENCE DATASET
// -------------------------------------------------------------
export const BASELINE_SIM_PARAMS: Readonly<SimulationParams> = Object.freeze({
  patientArrivalMultiplier: 1.0,
  patientSurgePercent: 0,
  arrivalRate: 25, // 25 patients/hr nominal
  activeDoctorRatio: 1.0,
  activeDoctors: 4, // 4 on-duty General Medicine OPD physicians
  triageEfficiencyGain: 15, // 15% standard triage efficiency
  pharmacyThroughput: 35, // 35 kits/hr baseline dispensing
});

export const BASELINE_AVG_WAIT_MINUTES = 45; // Constant live reference benchmark

export const BASELINE_HOURLY_POINTS: ReadonlyArray<Readonly<HourlyGraphPoint>> = Object.freeze([
  { hour: '08:00 AM', baselineWait: 30, projectedWait: 30, baselineVolume: 35, projectedVolume: 35 },
  { hour: '09:00 AM', baselineWait: 38, projectedWait: 38, baselineVolume: 85, projectedVolume: 85 },
  { hour: '10:00 AM', baselineWait: 48, projectedWait: 48, baselineVolume: 145, projectedVolume: 145 },
  { hour: '11:00 AM', baselineWait: 58, projectedWait: 58, baselineVolume: 160, projectedVolume: 160 },
  { hour: '12:00 PM', baselineWait: 52, projectedWait: 52, baselineVolume: 130, projectedVolume: 130 },
  { hour: '01:00 PM', baselineWait: 45, projectedWait: 45, baselineVolume: 75, projectedVolume: 75 },
  { hour: '02:00 PM', baselineWait: 35, projectedWait: 35, baselineVolume: 45, projectedVolume: 45 },
  { hour: '03:00 PM', baselineWait: 30, projectedWait: 30, baselineVolume: 40, projectedVolume: 40 },
  { hour: '04:00 PM', baselineWait: 26, projectedWait: 26, baselineVolume: 30, projectedVolume: 30 },
]);

// -------------------------------------------------------------
// REUSABLE SIMULATION ENGINE
// -------------------------------------------------------------
export const digitalTwinSimulationEngine = {
  /**
   * Calculate deterministic projected simulation results from current sliders and approved directive impacts.
   * Baseline data remains completely untouched and serves as constant reference.
   */
  calculateProjection(
    params: SimulationParams,
    approvedDirectiveIds: string[] = []
  ): SimulationOutcome {
    const isStaffingApproved = approvedDirectiveIds.includes('dir-staffing');
    const isQueueApproved = approvedDirectiveIds.includes('dir-queue');

    // 1. Doctor Capacity with optional directive intervention
    // Staffing directive adds +1 floater doctor to General OPD
    const baseDoctors = Math.max(1, params.activeDoctors);
    const effectiveDoctors = isStaffingApproved ? baseDoctors + 1 : baseDoctors;
    const effectiveDoctorRatio = effectiveDoctors / 4;

    // 2. Non-linear queuing model (M/M/c approximation tailored for OPD triage)
    // Multiplier for surge volume
    const arrivalMultiplier = params.patientArrivalMultiplier;

    // Triage efficiency mitigation factor
    const triageRelief = 1 - ((params.triageEfficiencyGain - 15) / 100) * 0.35;

    // Queue balancing relief factor (shaves off cross-department congestion)
    const queueBalancingRelief = isQueueApproved ? 0.82 : 1.0;

    // Pharmacy throughput factor (penalizes wait if pharmacy is clogged below 25)
    let pharmacyPenalty = 1.0;
    if (params.pharmacyThroughput < 25) {
      pharmacyPenalty = 1.0 + (25 - params.pharmacyThroughput) * 0.008;
    }

    // Capacity utilization ratio
    const utilization = arrivalMultiplier / effectiveDoctorRatio;

    // Base wait scaling:
    // When multiplier = 1.0, doctorRatio = 1.0, triage = 15 -> wait = 45 mins exactly.
    // When surge increases by +25% (multiplier 1.25, doctors 1.0) -> wait becomes 62 mins.
    // When staffing directive is approved (effectiveDoctors becomes 5) -> wait visibly drops to 42-45 mins!
    let rawProjectedWait: number;
    if (utilization <= 1.0) {
      // Approaching or below capacity: slight relief if doctor capacity expanded
      const staffingBonus = isStaffingApproved ? 0.94 : 1.0;
      rawProjectedWait = BASELINE_AVG_WAIT_MINUTES * Math.pow(utilization, 1.2) * triageRelief * queueBalancingRelief * pharmacyPenalty * staffingBonus;
    } else {
      // Congestion curve above 100% capacity
      const excess = utilization - 1.0;
      const nonLinearFactor = 1.0 + excess * 1.5;
      rawProjectedWait = BASELINE_AVG_WAIT_MINUTES * nonLinearFactor * triageRelief * queueBalancingRelief * pharmacyPenalty;
    }

    const projectedAvgWait = Math.max(8, Math.min(130, Math.round(rawProjectedWait)));

    // Peak Queue Depth
    const basePeak = 145;
    const projectedPeak = Math.max(
      15,
      Math.round((basePeak * arrivalMultiplier) / (effectiveDoctorRatio * (1 + (params.triageEfficiencyGain - 15) / 200)))
    );

    // Bottleneck identification
    let bottleneck = 'Normal Operational Flow';
    if (params.arrivalRate > 35 || params.patientSurgePercent > 30) {
      bottleneck = 'General Medicine OPD Hall #12 Backlog';
    } else if (effectiveDoctorRatio < 0.8) {
      bottleneck = 'Physician Consultation Rooms Shortage';
    } else if (params.pharmacyThroughput < 25) {
      bottleneck = 'Pharmacy Dispensing Counter #01 Bottleneck';
    } else if (params.triageEfficiencyGain < 10) {
      bottleneck = 'Registration Desk Entrance Choke Point';
    } else if (params.arrivalRate > 28) {
      bottleneck = 'OPD Room 12 Waiting Corridor Spillover';
    }

    // Burnout risk calculation
    const burnoutRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' =
      utilization > 1.3 ? 'HIGH' : utilization > 0.95 ? 'MODERATE' : 'LOW';

    // Scale hourly graph curve deterministically
    const waitRatio = projectedAvgWait / BASELINE_AVG_WAIT_MINUTES;
    const graphData: HourlyGraphPoint[] = BASELINE_HOURLY_POINTS.map((pt) => {
      const pWait = Math.max(5, Math.round(pt.baselineWait * waitRatio));
      const pVol = Math.max(10, Math.round(pt.baselineVolume * arrivalMultiplier));
      return {
        hour: pt.hour,
        baselineWait: pt.baselineWait,
        projectedWait: pWait,
        baselineVolume: pt.baselineVolume,
        projectedVolume: pVol,
      };
    });

    const approvedImpactNotes: string[] = [];
    if (isStaffingApproved) {
      approvedImpactNotes.push('Floater Physician Deployed: +1 Active Doctor in OPD-12 (-32% Wait Time)');
    }
    if (isQueueApproved) {
      approvedImpactNotes.push('Phlebotomy / OPD Queue Cross-Balanced: -12 min transit reduction');
    }

    return {
      baselineAvgWait: BASELINE_AVG_WAIT_MINUTES,
      projectedAvgWait,
      peakQueueDepthBefore: basePeak,
      peakQueueDepthAfter: projectedPeak,
      bottleneckDepartment: bottleneck,
      burnoutRiskLevel,
      graphData,
      effectiveDoctors,
      approvedImpactNotes,
    };
  },

  /**
   * Generate dynamic XAI Directives based on simulation parameters and main queue tokens.
   * Only satisfied rules are generated. Preserves approved status.
   */
  generateDirectives(
    params: SimulationParams,
    tokens: PatientToken[],
    approvedDirectivesMap: Record<string, DynamicDirective>
  ): DynamicDirective[] {
    const directives: DynamicDirective[] = [];

    // Delayed tokens from main token queue
    // Defined as waiting tokens exceeding standard wait threshold (>= 20 mins) or skipped
    const delayedTokens = tokens.filter(
      (t) =>
        t.status === 'SKIPPED' ||
        t.status === 'SKIPPED_AWAITING_RECEPTION' ||
        (t.status === 'WAITING' && t.estimatedWaitMinutes >= 20) ||
        (t as any).isDelayed
    );

    const activeQueueLength = tokens.filter(
      (t) => t.status === 'WAITING' || t.status === 'IN_CONSULTATION'
    ).length;

    // -------------------------------------------------------------
    // RULE 1: STAFFING DIRECTIVE
    // Trigger: arrivalRate > 30 OR surge slider value > 20%
    // -------------------------------------------------------------
    const rule1Triggered = params.arrivalRate > 30 || params.patientSurgePercent > 20;
    const staffAlreadyApproved = approvedDirectivesMap['dir-staffing'];

    if (rule1Triggered || staffAlreadyApproved) {
      const isApproved = !!staffAlreadyApproved?.approved;
      directives.push({
        id: 'dir-staffing',
        ruleId: 'RULE_STAFFING',
        title: 'Reallocate 1 General Doctor to OPD-12',
        category: 'STAFFING',
        impactMetric: '-32% Wait Time',
        explanation: `OPD queue is accelerating at ${params.arrivalRate} patients/hr (${params.patientSurgePercent > 0 ? `+${params.patientSurgePercent}% surge` : 'peak inflow'}). Current staffing capacity (${params.activeDoctors} doctors) is insufficient to handle the projected patient influx. Reallocating one General Doctor to OPD-12 is expected to reduce patient waiting time.`,
        telemetry: `Live Telemetry: Arrival Rate: ${params.arrivalRate} pts/hr | Surge: ${params.patientSurgePercent >= 0 ? `+${params.patientSurgePercent}%` : `${params.patientSurgePercent}%`} | Available Doctors: ${params.activeDoctors} | Active Queue Depth: ${activeQueueLength} patients.`,
        approved: isApproved,
        approvedAt: staffAlreadyApproved?.approvedAt,
        appliedImpactDescription: isApproved
          ? 'Applied: Effective doctor capacity increased from 4 to 5 (+25% capacity, -32% projected wait time).'
          : undefined,
      });
    }

    // -------------------------------------------------------------
    // RULE 2: QUEUE BALANCING DIRECTIVE
    // Trigger: delayedTokens.length >= 2 (must come from main token queue)
    // -------------------------------------------------------------
    const rule2Triggered = delayedTokens.length >= 2;
    const queueAlreadyApproved = approvedDirectivesMap['dir-queue'];

    if (rule2Triggered || queueAlreadyApproved) {
      const isApproved = !!queueAlreadyApproved?.approved;
      const affectedDepts = Array.from(new Set(delayedTokens.map((t) => t.department))).join(', ') || 'General Medicine & Phlebotomy';
      const tokenNumbers = delayedTokens.map((t) => t.tokenNumber).slice(0, 3).join(', ');
      const maxDelay = delayedTokens.length > 0 ? Math.max(...delayedTokens.map((t) => t.estimatedWaitMinutes || 0), 20) : 25;

      directives.push({
        id: 'dir-queue',
        ruleId: 'RULE_QUEUE_BALANCING',
        title: 'OPD / Phlebotomy Queue Balancing',
        category: 'QUEUE',
        impactMetric: '-12 min Lab Transit',
        explanation: `${delayedTokens.length} tokens (${tokenNumbers}${delayedTokens.length > 3 ? '...' : ''}) in ${affectedDepts} are experiencing delays exceeding the standard benchmark. Cross-routing blood-draw investigations and balancing counter allocations will normalize patient flow.`,
        telemetry: `Queue Telemetry: ${delayedTokens.length} delayed tokens detected in live main queue. Affected: ${affectedDepts}. Max recorded delay: ${maxDelay} mins. Threshold benchmark: < 2 tokens.`,
        approved: isApproved,
        approvedAt: queueAlreadyApproved?.approvedAt,
        appliedImpactDescription: isApproved
          ? 'Applied: Cross-counter routing active; diagnostic transit compressed by 12 mins.'
          : undefined,
      });
    }

    return directives;
  },
};

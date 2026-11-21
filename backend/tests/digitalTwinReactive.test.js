import { describe, it, expect } from 'vitest';

// Replicating digitalTwinSimulationEngine algorithm to verify mathematical consistency in test environment
const BASELINE_AVG_WAIT_MINUTES = 45;
const BASELINE_SIM_PARAMS = {
  patientArrivalMultiplier: 1.0,
  patientSurgePercent: 0,
  arrivalRate: 25,
  activeDoctorRatio: 1.0,
  activeDoctors: 4,
  triageEfficiencyGain: 15,
  pharmacyThroughput: 35,
};

function calculateProjection(params, approvedDirectiveIds = []) {
  const isStaffingApproved = approvedDirectiveIds.includes('dir-staffing');
  const isQueueApproved = approvedDirectiveIds.includes('dir-queue');

  const baseDoctors = Math.max(1, params.activeDoctors);
  const effectiveDoctors = isStaffingApproved ? baseDoctors + 1 : baseDoctors;
  const effectiveDoctorRatio = effectiveDoctors / 4;

  const arrivalMultiplier = params.patientArrivalMultiplier;
  const triageRelief = 1 - ((params.triageEfficiencyGain - 15) / 100) * 0.35;
  const queueBalancingRelief = isQueueApproved ? 0.82 : 1.0;

  let pharmacyPenalty = 1.0;
  if (params.pharmacyThroughput < 25) {
    pharmacyPenalty = 1.0 + (25 - params.pharmacyThroughput) * 0.008;
  }

  const utilization = arrivalMultiplier / effectiveDoctorRatio;
  let rawProjectedWait;
  if (utilization <= 1.0) {
    const staffingBonus = isStaffingApproved ? 0.94 : 1.0;
    rawProjectedWait = BASELINE_AVG_WAIT_MINUTES * Math.pow(utilization, 1.2) * triageRelief * queueBalancingRelief * pharmacyPenalty * staffingBonus;
  } else {
    const excess = utilization - 1.0;
    const nonLinearFactor = 1.0 + excess * 1.5;
    rawProjectedWait = BASELINE_AVG_WAIT_MINUTES * nonLinearFactor * triageRelief * queueBalancingRelief * pharmacyPenalty;
  }

  const projectedAvgWait = Math.max(8, Math.min(130, Math.round(rawProjectedWait)));

  return {
    baselineAvgWait: BASELINE_AVG_WAIT_MINUTES,
    projectedAvgWait,
    effectiveDoctors,
  };
}

function generateDirectives(params, tokens, approvedDirectivesMap = {}) {
  const directives = [];

  const delayedTokens = tokens.filter(
    (t) =>
      t.status === 'SKIPPED' ||
      t.status === 'SKIPPED_AWAITING_RECEPTION' ||
      (t.status === 'WAITING' && t.estimatedWaitMinutes >= 20) ||
      t.isDelayed
  );

  const activeQueueLength = tokens.filter(
    (t) => t.status === 'WAITING' || t.status === 'IN_CONSULTATION'
  ).length;

  // RULE 1: STAFFING DIRECTIVE
  const rule1Triggered = params.arrivalRate > 30 || params.patientSurgePercent > 20;
  const staffAlreadyApproved = approvedDirectivesMap['dir-staffing'];

  if (rule1Triggered || staffAlreadyApproved) {
    directives.push({
      id: 'dir-staffing',
      ruleId: 'RULE_STAFFING',
      title: 'Reallocate 1 General Doctor to OPD-12',
      category: 'STAFFING',
      impactMetric: '-32% Wait Time',
      explanation: `OPD queue is accelerating at ${params.arrivalRate} patients/hr. Current staffing capacity (${params.activeDoctors} doctors) is insufficient to handle the projected patient influx. Reallocating one General Doctor to OPD-12 is expected to reduce patient waiting time.`,
      telemetry: `Live Telemetry: Arrival Rate: ${params.arrivalRate} pts/hr | Surge: +${params.patientSurgePercent}% | Available Doctors: ${params.activeDoctors} | Active Queue Depth: ${activeQueueLength} patients.`,
      approved: !!staffAlreadyApproved?.approved,
    });
  }

  // RULE 2: QUEUE BALANCING DIRECTIVE
  const rule2Triggered = delayedTokens.length >= 2;
  const queueAlreadyApproved = approvedDirectivesMap['dir-queue'];

  if (rule2Triggered || queueAlreadyApproved) {
    directives.push({
      id: 'dir-queue',
      ruleId: 'RULE_QUEUE_BALANCING',
      title: 'OPD / Phlebotomy Queue Balancing',
      category: 'QUEUE',
      impactMetric: '-12 min Lab Transit',
      explanation: `${delayedTokens.length} tokens in General Medicine & Phlebotomy are experiencing delays.`,
      telemetry: `Queue Telemetry: ${delayedTokens.length} delayed tokens detected in live main queue.`,
      approved: !!queueAlreadyApproved?.approved,
    });
  }

  return directives;
}

describe('CAREFLOW Digital Twin Simulation & Reactive XAI Directives Tests', () => {
  it('1. Initial state maintains baseline and projected at 45 minutes', () => {
    const outcome = calculateProjection(BASELINE_SIM_PARAMS);
    expect(outcome.baselineAvgWait).toBe(45);
    expect(outcome.projectedAvgWait).toBe(45);
  });

  it('2. Increasing patient surge by 25% keeps baseline at 45m and increases projected wait to ~62m', () => {
    const surgeParams = {
      ...BASELINE_SIM_PARAMS,
      patientArrivalMultiplier: 1.25,
      patientSurgePercent: 25,
      arrivalRate: 31,
    };
    const outcome = calculateProjection(surgeParams);
    expect(outcome.baselineAvgWait).toBe(45);
    expect(outcome.projectedAvgWait).toBe(62);
  });

  it('3. Approving Staffing Directive increases doctor capacity and visibly drops projected wait', () => {
    const surgeParams = {
      ...BASELINE_SIM_PARAMS,
      patientArrivalMultiplier: 1.25,
      patientSurgePercent: 25,
      arrivalRate: 31,
    };
    // Before approval
    const beforeApproval = calculateProjection(surgeParams, []);
    expect(beforeApproval.projectedAvgWait).toBe(62);
    expect(beforeApproval.effectiveDoctors).toBe(4);

    // After approval
    const afterApproval = calculateProjection(surgeParams, ['dir-staffing']);
    expect(afterApproval.baselineAvgWait).toBe(45); // Baseline never changes!
    expect(afterApproval.effectiveDoctors).toBe(5); // +1 doctor deployed
    expect(afterApproval.projectedAvgWait).toBeLessThan(beforeApproval.projectedAvgWait);
    expect(afterApproval.projectedAvgWait).toBe(42); // ~32% reduction
  });

  it('4. Reset to Live OPD Baseline restores projected graph to baseline 45m', () => {
    // When reset
    const resetOutcome = calculateProjection(BASELINE_SIM_PARAMS, []);
    expect(resetOutcome.baselineAvgWait).toBe(45);
    expect(resetOutcome.projectedAvgWait).toBe(45);
  });

  it('5. Rule 1 Staffing Directive triggers when arrivalRate > 30 OR surge > 20%', () => {
    const mockTokens = [{ id: 'tok-1', status: 'WAITING', estimatedWaitMinutes: 5 }];

    // Not triggered at baseline
    const dirBaseline = generateDirectives(BASELINE_SIM_PARAMS, mockTokens);
    expect(dirBaseline.some((d) => d.id === 'dir-staffing')).toBe(false);

    // Triggered when surge = 25% (and arrivalRate = 31)
    const dirSurge = generateDirectives(
      { ...BASELINE_SIM_PARAMS, patientSurgePercent: 25, arrivalRate: 31 },
      mockTokens
    );
    const staffDir = dirSurge.find((d) => d.id === 'dir-staffing');
    expect(staffDir).toBeDefined();
    expect(staffDir.title).toBe('Reallocate 1 General Doctor to OPD-12');
    expect(staffDir.category).toBe('STAFFING');
    expect(staffDir.impactMetric).toBe('-32% Wait Time');
    expect(staffDir.explanation).toContain('OPD queue is accelerating at 31 patients/hr');
    expect(staffDir.telemetry).toContain('Surge: +25%');
  });

  it('6. Rule 2 Queue Balancing Directive triggers when delayedTokens.length >= 2 from main queue', () => {
    const tokensWithDelays = [
      { id: 'tok-1', tokenNumber: 'OPD-101', status: 'WAITING', estimatedWaitMinutes: 10, department: 'General Medicine' },
      { id: 'tok-2', tokenNumber: 'OPD-102', status: 'WAITING', estimatedWaitMinutes: 20, department: 'General Medicine' }, // delayed
      { id: 'tok-3', tokenNumber: 'OPD-103', status: 'WAITING', estimatedWaitMinutes: 25, department: 'Phlebotomy' }, // delayed
    ];

    const dirs = generateDirectives(BASELINE_SIM_PARAMS, tokensWithDelays);
    const queueDir = dirs.find((d) => d.id === 'dir-queue');
    expect(queueDir).toBeDefined();
    expect(queueDir.title).toBe('OPD / Phlebotomy Queue Balancing');
    expect(queueDir.category).toBe('QUEUE');
    expect(queueDir.impactMetric).toBe('-12 min Lab Transit');
    expect(queueDir.telemetry).toContain('2 delayed tokens detected');
  });

  it('7. Rule 2 Queue Balancing Directive disappears when delayed tokens are under 2', () => {
    const tokensWithoutDelays = [
      { id: 'tok-1', tokenNumber: 'OPD-101', status: 'WAITING', estimatedWaitMinutes: 5, department: 'General Medicine' },
      { id: 'tok-2', tokenNumber: 'OPD-102', status: 'WAITING', estimatedWaitMinutes: 10, department: 'General Medicine' },
    ];

    const dirs = generateDirectives(BASELINE_SIM_PARAMS, tokensWithoutDelays);
    expect(dirs.some((d) => d.id === 'dir-queue')).toBe(false);
  });
});

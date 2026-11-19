import { describe, it, expect } from 'vitest';
import { QueueService } from '../src/services/queueService.js';
import { PredictionService } from '../src/services/predictionService.js';
import { DigitalTwinService } from '../src/services/digitalTwinService.js';

describe('CAREFLOW Services & Domain Logic Tests', () => {
  it('QueueService calculateWaitTime returns realistic minimums', async () => {
    // If 0 patients ahead, minimum wait is 2 minutes
    const wait = await QueueService.calculateWaitTime(null, 0);
    expect(wait).toBeGreaterThanOrEqual(2);
  });

  it('PredictionService triages Hindi symptoms accurately', async () => {
    const hindiResult = await PredictionService.suggestDepartment('छाती में तेज दर्द और घबराहट');
    expect(hindiResult.department).toBe('Cardiology');
    expect(hindiResult.triageColor).toBe('yellow');
    expect(hindiResult.disclaimer).toBeDefined();
  });

  it('PredictionService predicts crowd surge for high volume days', () => {
    const surge = PredictionService.predictSurge({ dayOfWeek: 'Monday', expectedWeather: 'Clear' });
    expect(surge.projectedFootfall).toBeGreaterThan(400);
    expect(surge.recommendedDoctors).toBeGreaterThan(3);
    expect(Array.isArray(surge.recommendations)).toBe(true);
  });

  it('DigitalTwinService simulates scenario throughput and wait reduction', () => {
    const sim = DigitalTwinService.runSimulation({
      surgeScenario: 'normal',
      additionalDoctors: 2,
      additionalRegistrationCounters: 1
    });

    expect(sim.simulatedWaitReductionPercent).toBeGreaterThan(0);
    expect(sim.predictedThroughputPerHour).toBeGreaterThan(0);
  });
});

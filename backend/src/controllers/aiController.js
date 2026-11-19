import { PredictionService } from '../services/predictionService.js';
import { DigitalTwinService } from '../services/digitalTwinService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const triageSymptoms = asyncHandler(async (req, res) => {
  const { symptoms, language = 'en' } = req.body;
  const analysis = await PredictionService.suggestDepartment(symptoms, language);
  return ApiResponse.success(res, analysis, 'Symptom triage evaluated');
});

export const predictSurge = asyncHandler(async (req, res) => {
  const { dayOfWeek, expectedWeather, isFestival } = req.query;
  const forecast = PredictionService.predictSurge({
    dayOfWeek: dayOfWeek || 'Monday',
    expectedWeather: expectedWeather || 'Clear',
    isFestival: isFestival === 'true'
  });
  return ApiResponse.success(res, forecast, 'OPD Crowd surge prediction');
});

export const getDigitalTwin = asyncHandler(async (req, res) => {
  const state = await DigitalTwinService.getDigitalTwinState();
  return ApiResponse.success(res, state, 'Digital Twin operational twin state');
});

export const runSimulation = asyncHandler(async (req, res) => {
  const { surgeScenario, additionalDoctors, additionalRegistrationCounters } = req.body;
  const simulationResult = DigitalTwinService.runSimulation({
    surgeScenario,
    additionalDoctors: parseInt(additionalDoctors || 0, 10),
    additionalRegistrationCounters: parseInt(additionalRegistrationCounters || 0, 10)
  });
  return ApiResponse.success(res, simulationResult, 'Hospital operational simulation complete');
});

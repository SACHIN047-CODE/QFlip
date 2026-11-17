import { apiClient, delay, USE_MOCK } from './api';
import { 
  CrowdForecastHour, 
  AIRecommendation, 
  DigitalTwinSimulationParams, 
  DigitalTwinSimulationResult 
} from '../types';
import { CROWD_FORECAST_DATA, INITIAL_AI_RECOMMENDATIONS } from './mockData';

const REC_STORAGE_KEY = 'careflow_ai_recommendations';

const getStoredRecs = (): AIRecommendation[] => {
  const data = localStorage.getItem(REC_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(REC_STORAGE_KEY, JSON.stringify(INITIAL_AI_RECOMMENDATIONS));
    return INITIAL_AI_RECOMMENDATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_AI_RECOMMENDATIONS;
  }
};

export const aiService = {
  async getHourlyCrowdForecast(): Promise<CrowdForecastHour[]> {
    if (USE_MOCK) {
      await delay(250);
      return CROWD_FORECAST_DATA;
    }
    return apiClient.get('/ai/forecast/crowd');
  },

  async getRecommendations(): Promise<AIRecommendation[]> {
    if (USE_MOCK) {
      await delay(200);
      return getStoredRecs();
    }
    return apiClient.get('/ai/recommendations');
  },

  async toggleApproval(id: string): Promise<AIRecommendation> {
    if (USE_MOCK) {
      await delay(200);
      const list = getStoredRecs();
      const updated = list.map(r => r.id === id ? { ...r, approved: !r.approved } : r);
      localStorage.setItem(REC_STORAGE_KEY, JSON.stringify(updated));
      const found = updated.find(r => r.id === id);
      if (!found) throw new Error('Recommendation not found');
      return found;
    }
    return apiClient.post(`/ai/recommendations/${id}/approve`);
  },

  async runDigitalTwinSimulation(params: DigitalTwinSimulationParams): Promise<DigitalTwinSimulationResult> {
    if (USE_MOCK) {
      await delay(400);
      
      const baselineWait = 28; // minutes
      const waitMultiplier = (params.patientArrivalMultiplier / params.activeDoctorRatio) * (1 - params.triageEfficiencyGain / 100);
      const afterWait = Math.round(baselineWait * waitMultiplier);
      const peakDepthBefore = Math.round(145 * params.patientArrivalMultiplier);
      const peakDepthAfter = Math.round(peakDepthBefore / (params.activeDoctorRatio * (1 + params.triageEfficiencyGain / 100)));

      let bottleneck = 'General Medicine OPD';
      if (params.patientArrivalMultiplier > 1.4 && params.activeDoctorRatio < 1.0) {
        bottleneck = 'Obstetrics & Gynae & Pharmacy Counter';
      } else if (params.triageEfficiencyGain < 10) {
        bottleneck = 'Registration Desk #02 Bottleneck';
      }

      const burnoutRisk: 'LOW' | 'MODERATE' | 'HIGH' = 
        waitMultiplier > 1.3 ? 'HIGH' : waitMultiplier > 0.95 ? 'MODERATE' : 'LOW';

      const interventions: string[] = [];
      if (params.patientArrivalMultiplier > 1.2) {
        interventions.push('Activate On-Call Reserve Duty Doctors in General OPD 14 & 15');
      }
      if (params.triageEfficiencyGain < 15) {
        interventions.push('Enable Voice-Based Multi-Lingual Triage Kiosk at Main Porch to cut counter queue by 35%');
      }
      if (params.pharmacyThroughput < 40) {
        interventions.push('Pre-package standard fever/cough medication bundles at Pharmacy Desk #1');
      }
      if (interventions.length === 0) {
        interventions.push('Current parameters maintain optimal patient flow under NHM benchmark (Wait < 20 mins)');
      }

      return {
        avgWaitTimeBefore: baselineWait,
        avgWaitTimeAfter: Math.max(8, afterWait),
        peakQueueDepthBefore: peakDepthBefore,
        peakQueueDepthAfter: Math.max(15, peakDepthAfter),
        bottleneckDepartment: bottleneck,
        burnoutRiskLevel: burnoutRisk,
        recommendedInterventions: interventions
      };
    }
    return apiClient.post('/ai/digital-twin/simulate', params);
  }
};

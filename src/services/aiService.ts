import { apiClient, delay, USE_MOCK } from './api';
import { 
  CrowdForecastHour, 
  AIRecommendation, 
  DigitalTwinSimulationParams, 
  DigitalTwinSimulationResult,
  TriageResult
} from '../types';
import { CROWD_FORECAST_DATA, INITIAL_AI_RECOMMENDATIONS } from './mockData';

const REC_STORAGE_KEY = 'qflip_ai_recommendations';

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
  },

  async triageSymptoms(symptoms: string, language: string = 'en'): Promise<TriageResult> {
    const text = (symptoms || '').toLowerCase().trim();

    if (!USE_MOCK) {
      try {
        const response: any = await apiClient.post('/ai/triage', { symptoms, language });
        if (response && response.department) {
          return response;
        }
      } catch (err) {
        console.warn('Backend triage API failed, using intelligent client-side fallback:', err);
      }
    }

    await delay(300);

    // Multi-lingual clinical heuristics supporting English, Hindi, Punjabi, and Tamil
    let department = 'General Medicine';
    let departmentCode = 'GEN';
    let urgency: 'normal' | 'urgent' | 'emergency' = 'normal';
    let triageColor: 'green' | 'yellow' | 'red' = 'green';
    let confidence = 0.88;
    let summary = 'General physician consultation recommended based on symptoms.';

    if (
      text.includes('chest') ||
      text.includes('heart') ||
      text.includes('cardiac') ||
      text.includes('छाती') ||
      text.includes('दिल') ||
      text.includes('ਧੜਕਨ') ||
      text.includes('ਮਾਰਬੁ') ||
      text.includes('இதயம்') ||
      text.includes('marbu') ||
      text.includes('palpitation')
    ) {
      department = 'Cardiology';
      departmentCode = 'CARD';
      urgency = text.includes('severe') || text.includes('shoulder') || text.includes('sweat') ? 'emergency' : 'urgent';
      triageColor = urgency === 'emergency' ? 'red' : 'yellow';
      confidence = 0.95;
      summary = 'Cardiovascular indicators detected. Prompt cardiac assessment advised.';
    } else if (
      text.includes('bone') ||
      text.includes('fracture') ||
      text.includes('joint') ||
      text.includes('knee') ||
      text.includes('gitta') ||
      text.includes('हड्डी') ||
      text.includes('जोड़ों') ||
      text.includes('ਗਿੱਟਾ') ||
      text.includes('ਗੋਡਾ') ||
      text.includes('எலும்பு') ||
      text.includes('மூட்டு') ||
      text.includes('mootu')
    ) {
      department = 'Orthopedics';
      departmentCode = 'ORTHO';
      confidence = 0.92;
      summary = 'Musculoskeletal or joint strain aligned with Orthopedic examination.';
    } else if (
      text.includes('child') ||
      text.includes('baby') ||
      text.includes('infant') ||
      text.includes('बच्चा') ||
      text.includes('ਬੱਚਾ') ||
      text.includes('குழந்தை') ||
      text.includes('kulanthai') ||
      text.includes('kid')
    ) {
      department = 'Pediatrics';
      departmentCode = 'PED';
      urgency = text.includes('high') ? 'urgent' : 'normal';
      triageColor = urgency === 'urgent' ? 'yellow' : 'green';
      confidence = 0.96;
      summary = 'Pediatric care team recommended for child specialist evaluation.';
    } else if (
      text.includes('ear') ||
      text.includes('nose') ||
      text.includes('throat') ||
      text.includes('कान') ||
      text.includes('नाक') ||
      text.includes('गला') ||
      text.includes('ਕੰਨ') ||
      text.includes('ਗਲਾ') ||
      text.includes('காது') ||
      text.includes('தொண்டை') ||
      text.includes('thondai')
    ) {
      department = 'ENT & Head Neck';
      departmentCode = 'ENT';
      confidence = 0.90;
      summary = 'ENT examination recommended for ear, nose, or throat irritation.';
    } else if (
      text.includes('pregnant') ||
      text.includes('maternity') ||
      text.includes('period') ||
      text.includes('mahila') ||
      text.includes('गर्भावस्था') ||
      text.includes('கர்ப்பம்')
    ) {
      department = 'Obstetrics & Gynecology';
      departmentCode = 'OBGYN';
      confidence = 0.94;
      summary = 'Maternal and gynecological specialist consultation assigned.';
    } else if (
      text.includes('accident') ||
      text.includes('bleeding heavily') ||
      text.includes('unconscious') ||
      text.includes('emergency') ||
      text.includes('आपातकालीन') ||
      text.includes('அவசரம்')
    ) {
      department = 'Emergency Trauma Care';
      departmentCode = 'EMG';
      urgency = 'emergency';
      triageColor = 'red';
      confidence = 0.98;
      summary = 'Critical acute indicators. Immediate emergency room triage required.';
    }

    return {
      department,
      departmentCode,
      urgency,
      triageColor,
      confidence,
      summary,
      disclaimer: 'AI operational triage assistance only. Please consult a registered medical practitioner.'
    };
  }
};

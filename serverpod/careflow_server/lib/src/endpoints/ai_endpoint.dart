import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Neural Crowd Forecasting, Digital Twin Simulation & AI Triage Endpoint
class AiEndpoint extends Endpoint {
  /// Hourly crowd forecast for OPD crowd management
  Future<List<CrowdForecast>> getCrowdForecast(Session session) async {
    return [
      CrowdForecast(hour: '08:00 AM', historicalAverage: 35, predictedVolume: 42, riskLevel: 'MODERATE'),
      CrowdForecast(hour: '09:00 AM', historicalAverage: 78, predictedVolume: 95, riskLevel: 'HIGH'),
      CrowdForecast(hour: '10:00 AM', historicalAverage: 110, predictedVolume: 130, riskLevel: 'SURGE'),
      CrowdForecast(hour: '11:00 AM', historicalAverage: 125, predictedVolume: 140, riskLevel: 'SURGE'),
      CrowdForecast(hour: '12:00 PM', historicalAverage: 85, predictedVolume: 90, riskLevel: 'HIGH'),
      CrowdForecast(hour: '01:00 PM', historicalAverage: 45, predictedVolume: 48, riskLevel: 'MODERATE'),
      CrowdForecast(hour: '02:00 PM', historicalAverage: 20, predictedVolume: 22, riskLevel: 'LOW'),
    ];
  }

  /// Digital Twin OPD simulation engine
  Future<DigitalTwinResult> simulateDigitalTwin(
    Session session,
    double arrivalMultiplier,
    double doctorRatio,
    double triageEfficiency,
    double pharmacyThroughput,
  ) async {
    const baselineWait = 28;
    final waitMultiplier = (arrivalMultiplier / doctorRatio) * (1 - triageEfficiency / 100);
    final afterWait = (baselineWait * waitMultiplier).round().clamp(8, 120);
    final peakBefore = (145 * arrivalMultiplier).round();
    final peakAfter = (peakBefore / (doctorRatio * (1 + triageEfficiency / 100))).round().clamp(15, 200);

    String bottleneck = 'General Medicine OPD';
    if (arrivalMultiplier > 1.4 && doctorRatio < 1.0) {
      bottleneck = 'Obstetrics & Gynae & Pharmacy Counter';
    } else if (triageEfficiency < 10) {
      bottleneck = 'Registration Desk #02 Bottleneck';
    }

    String burnout = 'LOW';
    if (waitMultiplier > 1.3) {
      burnout = 'HIGH';
    } else if (waitMultiplier > 0.95) {
      burnout = 'MODERATE';
    }

    final interventions = <String>[];
    if (arrivalMultiplier > 1.2) {
      interventions.add('Activate On-Call Reserve Duty Doctors in General OPD 14 & 15');
    }
    if (triageEfficiency < 15) {
      interventions.add('Enable Voice-Based Multi-Lingual Triage Kiosk at Main Porch to cut counter queue by 35%');
    }
    if (pharmacyThroughput < 40) {
      interventions.add('Pre-package standard fever/cough medication bundles at Jan Aushadhi Counter #1');
    }
    if (interventions.isEmpty) {
      interventions.add('Current parameters maintain optimal patient flow under NHM benchmark (Wait < 20 mins)');
    }

    return DigitalTwinResult(
      avgWaitTimeBefore: baselineWait,
      avgWaitTimeAfter: afterWait,
      peakQueueDepthBefore: peakBefore,
      peakQueueDepthAfter: peakAfter,
      bottleneckDepartment: bottleneck,
      burnoutRiskLevel: burnout,
      recommendedInterventions: interventions,
    );
  }

  /// Multi-lingual symptom triage heuristic engine
  Future<TriageResponse> triageSymptoms(
    Session session,
    String symptoms,
    String language,
  ) async {
    final text = symptoms.toLowerCase();

    if (text.contains('chest') ||
        text.contains('heart') ||
        text.contains('cardiac') ||
        text.contains('छाती') ||
        text.contains('दिल') ||
        text.contains('ਧੜਕਨ')) {
      final isSevere = text.contains('severe') || text.contains('pain') || text.contains('sweat');
      return TriageResponse(
        department: 'Cardiology',
        departmentCode: 'CARD',
        urgency: isSevere ? 'emergency' : 'urgent',
        triageColor: isSevere ? 'red' : 'yellow',
        confidence: 0.95,
        summary: 'Cardiovascular indicators detected. Immediate cardiac examination advised.',
        disclaimer: 'Operational triage suggestion only. Always consult a certified medical practitioner.',
      );
    }

    if (text.contains('bone') ||
        text.contains('fracture') ||
        text.contains('joint') ||
        text.contains('knee') ||
        text.contains('हड्डी') ||
        text.contains('जोड़ों') ||
        text.contains('ਗੋਡਾ')) {
      return TriageResponse(
        department: 'Orthopedics',
        departmentCode: 'ORTHO',
        urgency: 'normal',
        triageColor: 'green',
        confidence: 0.92,
        summary: 'Musculoskeletal or joint irritation aligned with Orthopedic examination.',
        disclaimer: 'Operational triage suggestion only. Always consult a certified medical practitioner.',
      );
    }

    if (text.contains('child') ||
        text.contains('baby') ||
        text.contains('infant') ||
        text.contains('बच्चा') ||
        text.contains('ਬੱਚਾ')) {
      return TriageResponse(
        department: 'Pediatrics',
        departmentCode: 'PED',
        urgency: 'normal',
        triageColor: 'green',
        confidence: 0.96,
        summary: 'Pediatric care team recommended for child specialist evaluation.',
        disclaimer: 'Operational triage suggestion only. Always consult a certified medical practitioner.',
      );
    }

    return TriageResponse(
      department: 'General Medicine',
      departmentCode: 'GEN',
      urgency: 'normal',
      triageColor: 'green',
      confidence: 0.88,
      summary: 'General physician consultation recommended based on reported symptoms.',
      disclaimer: 'Operational triage suggestion only. Always consult a certified medical practitioner.',
    );
  }
}

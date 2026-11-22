import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Hospital Command & Executive Analytics Endpoint
class AnalyticsEndpoint extends Endpoint {
  /// Overall hospital OPD overview stats
  Future<Map<String, dynamic>> getHospitalOverview(Session session) async {
    final tokens = await QueueEntry.db.find(session);
    final waiting = tokens.where((t) => t.status == 'waiting').length;
    final inConsultation = tokens.where((t) => t.status == 'in_consultation').length;
    final completed = tokens.where((t) => t.status == 'completed').length;
    final skipped = tokens.where((t) => t.status == 'skipped').length;
    final emergency = tokens.where((t) => t.priorityScore >= 100).length;

    final doctors = await Doctor.db.find(session);
    final activeDoctors = doctors.where((d) => d.isAvailable).length;

    return {
      'totalTokensToday': tokens.length,
      'waitingCount': waiting,
      'inConsultationCount': inConsultation,
      'completedCount': completed,
      'skippedCount': skipped,
      'emergencyCases': emergency,
      'activeDoctorsCount': activeDoctors,
      'averageWaitTimeMinutes': 14,
      'benchmarkTargetMinutes': 20,
    };
  }
}

import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Clinical Diagnostics & Pathology/Radiology Laboratory Endpoint
class LaboratoryEndpoint extends Endpoint {
  /// Fetch all laboratory test requests (optional status/category filter)
  Future<List<LabTest>> getTests(
    Session session, {
    String? status,
    String? category,
  }) async {
    final list = await LabTest.db.find(
      session,
      where: (t) =>
          (status != null && status != 'All' ? t.status.equals(status) : Constant.bool(true)) &
          (category != null && category != 'All' ? t.testCategory.equals(category) : Constant.bool(true)),
      orderBy: (t) => t.createdAt,
    );
    return list.reversed.toList();
  }

  /// Create a new lab test order
  Future<LabTest> createTest(
    Session session,
    int patientId,
    int doctorId,
    String testName, {
    int? consultationId,
    String? testCategory = 'Hematology',
    String? priority = 'routine',
  }) async {
    final requestId = 'LAB-${DateTime.now().millisecondsSinceEpoch}';
    final test = LabTest(
      testRequestId: requestId,
      consultationId: consultationId,
      patientId: patientId,
      doctorId: doctorId,
      testName: testName,
      testCategory: testCategory ?? 'Hematology',
      priority: priority ?? 'routine',
      status: 'requested',
      createdAt: DateTime.now(),
    );
    return await LabTest.db.insertRow(session, test);
  }

  /// Update laboratory test status (e.g. sample_collected, in_progress, completed)
  Future<LabTest> updateTestStatus(
    Session session,
    int testId,
    String status, {
    String? resultSummary,
    String? reportUrl,
  }) async {
    final test = await LabTest.db.findById(session, testId);
    if (test == null) throw Exception('Lab test record not found');

    test.status = status;
    if (status == 'sample_collected') {
      test.sampleCollectedAt = DateTime.now();
    } else if (status == 'completed') {
      test.completedAt = DateTime.now();
    }
    if (resultSummary != null) test.resultSummary = resultSummary;
    if (reportUrl != null) test.reportUrl = reportUrl;

    return await LabTest.db.updateRow(session, test);
  }
}

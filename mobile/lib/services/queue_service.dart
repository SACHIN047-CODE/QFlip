import '../core/constants/api_endpoints.dart';
import '../core/network/api_client.dart';
import '../models/token_model.dart';

class QueueService {
  static Future<TokenModel> createToken({
    required String patientName,
    required String phone,
    required int age,
    required String gender,
    String? abhaId,
    required String department,
    List<String> symptoms = const [],
    String priority = 'Normal',
    String? doctorId,
  }) async {
    final body = {
      'patientName': patientName,
      'phone': phone,
      'age': age,
      'gender': gender,
      'abhaId': abhaId,
      'department': department,
      'symptoms': symptoms,
      'priority': priority,
      'doctorId': doctorId,
    };

    final response = await ApiClient.post(ApiEndpoints.queueTokens, body: body);
    return TokenModel.fromJson(response);
  }

  static Future<TokenModel?> getMyActiveToken() async {
    try {
      final response = await ApiClient.get(ApiEndpoints.myToken);
      if (response == null) return null;
      return TokenModel.fromJson(response);
    } catch (_) {
      return null;
    }
  }

  static Future<List<TokenModel>> getDepartmentQueue(String departmentId) async {
    final response = await ApiClient.get(ApiEndpoints.departmentQueue(departmentId));
    if (response is List) {
      return response.map((item) => TokenModel.fromJson(item)).toList();
    }
    return [];
  }

  static Future<void> updateStatus(String queueId, String status) async {
    await ApiClient.put(
      ApiEndpoints.updateQueueStatus(queueId),
      body: {'status': status},
    );
  }

  static Future<List<TokenModel>> getSkippedQueue() async {
    final response = await ApiClient.get(ApiEndpoints.skippedQueue);
    if (response is List) {
      return response.map((item) => TokenModel.fromJson(item)).toList();
    }
    return [];
  }
}

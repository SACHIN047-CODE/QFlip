import 'dart:convert';
import 'package:http/http.dart' as http;
import 'api_client.dart';

/// Serverpod Backend Bridge for Flutter
/// Enables the Flutter app to communicate directly with the CareFlow Serverpod server.
class ServerpodBridge {
  static String serverpodUrl = const String.fromEnvironment(
    'SERVERPOD_URL',
    defaultValue: 'http://localhost:8080',
  );

  /// Invoke a Serverpod endpoint method via Serverpod's RPC protocol
  static Future<dynamic> callEndpoint(
    String endpoint,
    String method,
    Map<String, dynamic> params,
  ) async {
    final uri = Uri.parse('$serverpodUrl/$endpoint');
    final token = await ApiClient.getToken();

    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      if (token != null && token.isNotEmpty) 'Authorization': 'Bearer $token',
    };

    final payload = {
      'method': method,
      'params': params,
    };

    final response = await http.post(
      uri,
      headers: headers,
      body: jsonEncode(payload),
    );

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return jsonDecode(response.body);
    } else {
      throw ApiException(
        'Serverpod call failed: ${response.body}',
        response.statusCode,
      );
    }
  }

  /// Create OPD Token via Serverpod
  static Future<Map<String, dynamic>> createToken({
    required String department,
    required String patientName,
    required String patientId,
    String? patientPhone,
    String? symptoms,
    String? priority,
  }) async {
    final result = await callEndpoint('queue', 'createToken', {
      'department': department,
      'patientName': patientName,
      'patientId': patientId,
      'patientPhone': patientPhone,
      'symptoms': symptoms,
      'priority': priority ?? 'NORMAL',
    });
    return result as Map<String, dynamic>;
  }

  /// Single Prompt Voice Booking via Serverpod & Gemini
  static Future<Map<String, dynamic>> singlePromptVoiceBooking({
    required String voicePrompt,
    required String patientId,
    required String patientName,
    String? patientPhone,
  }) async {
    final result = await callEndpoint('triage', 'singlePromptBookOpd', {
      'voicePrompt': voicePrompt,
      'patientId': patientId,
      'patientName': patientName,
      'patientPhone': patientPhone,
    });
    return result as Map<String, dynamic>;
  }
}

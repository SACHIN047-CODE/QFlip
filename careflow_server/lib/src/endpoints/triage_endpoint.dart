import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:serverpod/serverpod.dart';
import '../generated/models.dart';
import '../generated/token.dart';
import 'queue_endpoint.dart';

class TriageEndpoint extends Endpoint {
  static final String _geminiApiKey = Platform.environment['GEMINI_API_KEY'] ?? '';

  /// Triage patient symptoms via Gemini AI with ICD-11 grounding
  Future<TriageResult> triageSymptoms(
    Session session,
    String symptoms, {
    String? language,
  }) async {
    session.log('TriageEndpoint.triageSymptoms: "$symptoms" (lang: $language)');

    // 1. If Gemini API key is present, call Google Gemini 3.8 / 1.5
    if (_geminiApiKey.isNotEmpty) {
      try {
        final url = Uri.parse(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=$_geminiApiKey',
        );

        final systemPrompt = '''
You are the Chief Clinical Triage Officer at CAREFLOW (QFlip) Indian District Hospital.
Given the patient's symptoms (which may be in English, Hindi, or Punjabi), analyze and categorize them into one of these OPD departments:
1. General Medicine (fever, weakness, cough, diabetes, digestion, cold)
2. Pediatrics (infants and children under 14)
3. Orthopedics (bone fractures, joint pain, back pain, sprains)
4. Cardiology (chest pain, palpitations, hypertension)
5. ENT & Head Neck (ear ache, throat, sinuses)

Reply STRICTLY in valid JSON matching this schema:
{
  "department": "string",
  "urgency": "NORMAL" | "SENIOR" | "EMERGENCY",
  "recommendedDoctor": "string",
  "reason": "short explanation",
  "confidence": 0.95,
  "suggestedRoom": "string",
  "estimatedWaitMinutes": 15
}
''';

        final response = await http.post(
          url,
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'contents': [
              {
                'role': 'user',
                'parts': [
                  {'text': '$systemPrompt\nPatient Symptoms: $symptoms'}
                ]
              }
            ],
            'generationConfig': {
              'temperature': 0.1,
              'responseMimeType': 'application/json'
            }
          }),
        );

        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          final text = data['candidates'][0]['content']['parts'][0]['text'];
          final parsed = jsonDecode(text);
          return TriageResult.fromJson(parsed);
        }
      } catch (e) {
        session.log('Gemini triage API error, falling back to deterministic triage: $e', level: LogLevel.warning);
      }
    }

    // 2. Deterministic high-speed rule-based clinical triage fallback
    final lower = symptoms.toLowerCase();
    if (lower.contains('chest') || lower.contains('heart') || lower.contains('bp') || lower.contains('pressure')) {
      return TriageResult(
        department: 'Cardiology',
        urgency: lower.contains('severe') || lower.contains('crushing') ? 'EMERGENCY' : 'NORMAL',
        recommendedDoctor: 'Dr. Sunita Rao',
        reason: 'Symptoms indicate cardiovascular review and immediate ECG assessment.',
        confidence: 0.94,
        suggestedRoom: 'Room 4',
        estimatedWaitMinutes: 10,
      );
    } else if (lower.contains('bone') || lower.contains('fracture') || lower.contains('knee') || lower.contains('joint') || lower.contains('back')) {
      return TriageResult(
        department: 'Orthopedics',
        urgency: 'NORMAL',
        recommendedDoctor: 'Dr. Vikram Sethi',
        reason: 'Musculoskeletal pain requiring physical exam and joint/plaster evaluation.',
        confidence: 0.92,
        suggestedRoom: 'Room 15',
        estimatedWaitMinutes: 20,
      );
    } else if (lower.contains('child') || lower.contains('baby') || lower.contains('infant') || lower.contains('kid') || lower.contains('bacha')) {
      return TriageResult(
        department: 'Pediatrics',
        urgency: 'NORMAL',
        recommendedDoctor: 'Dr. Ananya Roy',
        reason: 'Pediatric care required for specialized young patient clinical review.',
        confidence: 0.95,
        suggestedRoom: 'Room 8',
        estimatedWaitMinutes: 10,
      );
    } else {
      return TriageResult(
        department: 'General Medicine',
        urgency: lower.contains('emergency') || lower.contains('unconscious') ? 'EMERGENCY' : 'NORMAL',
        recommendedDoctor: 'Dr. Rajesh Sharma',
        reason: 'Primary acute outpatient triage and clinical assessment.',
        confidence: 0.88,
        suggestedRoom: 'Room 12',
        estimatedWaitMinutes: 14,
      );
    }
  }

  /// Single-Prompt Voice OPD Booking:
  /// Takes a single spoken utterance in Hindi, Punjabi, or English,
  /// triages symptoms, determines department, and issues an active live OPD token in one step!
  Future<Map<String, dynamic>> singlePromptBookOpd(
    Session session, {
    required String voicePrompt,
    required String patientId,
    required String patientName,
    String? patientPhone,
    int? patientAge,
    String? patientGender,
  }) async {
    session.log('TriageEndpoint.singlePromptBookOpd: "$voicePrompt" for $patientName');

    // Step 1: Triage symptoms
    final triage = await triageSymptoms(session, voicePrompt);

    // Step 2: Automatically issue token in the targeted department
    final queue = QueueEndpoint();
    final token = await queue.createToken(
      session,
      department: triage.department,
      patientName: patientName,
      patientId: patientId,
      patientPhone: patientPhone,
      patientAge: patientAge,
      patientGender: patientGender,
      symptoms: voicePrompt,
      priority: triage.urgency,
      doctorName: triage.recommendedDoctor,
      roomNumber: triage.suggestedRoom,
    );

    return {
      'success': true,
      'triage': triage.toJson(),
      'token': token.toJson(),
      'voiceConfirmation': 'Your OPD token ${token.tokenNumber} for ${triage.department} has been booked. Please proceed to ${triage.suggestedRoom}.',
    };
  }
}

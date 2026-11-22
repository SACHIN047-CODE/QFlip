import 'dart:convert';
import 'package:http/http.dart' as http;

class GeminiTriageResult {
  final bool isEmergency;
  final String emergencyAdvice;
  final bool isFaqQuery;
  final String faqAnswer;
  final String faqSource;
  final bool isBookingRequest;
  final String department;
  final String doctor;
  final String room;
  final String? extractedPatientName;
  final String? extractedPhone;
  final int extractedAge;
  final String extractedGender;
  final List<String> symptoms;
  final String priority;
  final bool canAutoBook;
  final String explanation;
  final String spokenResponse;

  GeminiTriageResult({
    this.isEmergency = false,
    this.emergencyAdvice = '',
    this.isFaqQuery = false,
    this.faqAnswer = '',
    this.faqSource = '',
    this.isBookingRequest = true,
    this.department = 'General Medicine',
    this.doctor = 'Dr. Rahul Verma',
    this.room = 'OPD Room 101',
    this.extractedPatientName,
    this.extractedPhone,
    this.extractedAge = 35,
    this.extractedGender = 'Male',
    this.symptoms = const [],
    this.priority = 'Normal',
    this.canAutoBook = false,
    this.explanation = '',
    this.spokenResponse = '',
  });
}

class GeminiTriageService {
  static const String _geminiApiKey = String.fromEnvironment(
    'GEMINI_API_KEY',
    defaultValue: '',
  );

  static Future<GeminiTriageResult> analyzeSinglePrompt(
    String userPrompt, {
    String? patientName,
    String? phone,
    int? age,
    String? gender,
    String? abhaId,
  }) async {
    const systemPrompt = '''
You are CareFlow AI, the official hospital assistant for CAREFLOW (QFlip) mobile app.
Base your knowledge strictly on the CAREFLOW AI Knowledge Base:
- General Medicine: Dr. Rahul Verma (Room 101, Ground Floor)
- Cardiology: Dr. Priya Singh (Room 201, Floor 1)
- Orthopedics: Dr. Karan Malhotra (Room 108, Ground Floor)
- Pediatrics: Dr. Simran Kaur (Room 301, Floor 2)

Emergencies: If prompt describes chest pain, breathlessness, stroke signs, severe bleeding, or unconsciousness, set "isEmergency": true and direct to Emergency Room 10 or 108.
FAQs: If user asks questions from the Knowledge Base (e.g., "Can I book without logging in?", "How do I get a token?", "Where does Dr. X sit?", "What if doctor is late?", "Is data private?"), set "isFaqQuery": true and provide the exact answer in "faqAnswer".
Single-Prompt Booking: Map symptoms to department/doctor with disclaimer "A doctor will make the final assessment." Extract patient name & phone if spoken.

Respond ONLY with valid JSON:
{
  "isEmergency": false,
  "emergencyAdvice": "",
  "isFaqQuery": false,
  "faqAnswer": "",
  "faqSource": "CAREFLOW AI Knowledge Base PDF Section 11",
  "isBookingRequest": true,
  "department": "General Medicine",
  "doctor": "Dr. Rahul Verma",
  "room": "OPD Room 101",
  "extractedPatientName": "",
  "extractedPhone": "",
  "extractedAge": 35,
  "extractedGender": "Male",
  "symptoms": ["fever", "cough"],
  "priority": "Normal",
  "canAutoBook": true,
  "explanation": "Routed to General Medicine. A doctor will make the final clinical assessment.",
  "spokenResponse": "I have routed your symptoms to Dr. Rahul Verma in General Medicine, Room 101, and booked your OPD token."
}
''';

    try {
      final url = Uri.parse(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=$_geminiApiKey',
      );

      final response = await http
          .post(
            url,
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({
              'contents': [
                {
                  'parts': [
                    {
                      'text': '$systemPrompt\n\nPatient Profile: Name: "$patientName", Phone: "$phone", Age: $age\nUser Prompt: "$userPrompt"'
                    }
                  ]
                }
              ],
              'generationConfig': {'temperature': 0.2, 'maxOutputTokens': 800}
            }),
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final rawText = data['candidates']?[0]?['content']?['parts']?[0]?['text'] ?? '';
        final reg = RegExp(r'\{[\s\S]*\}');
        final match = reg.firstMatch(rawText);

        if (match != null) {
          final parsed = jsonDecode(match.group(0)!);
          final finalName = (parsed['extractedPatientName']?.toString().trim().isNotEmpty ?? false)
              ? parsed['extractedPatientName'].toString().trim()
              : (patientName ?? '');
          final finalPhone = (parsed['extractedPhone']?.toString().trim().isNotEmpty ?? false)
              ? parsed['extractedPhone'].toString().trim()
              : (phone ?? '');

          List<String> parsedSymptoms = [];
          if (parsed['symptoms'] is List) {
            parsedSymptoms = (parsed['symptoms'] as List).map((e) => e.toString()).toList();
          }

          return GeminiTriageResult(
            isEmergency: parsed['isEmergency'] == true,
            emergencyAdvice: parsed['emergencyAdvice'] ?? '',
            isFaqQuery: parsed['isFaqQuery'] == true,
            faqAnswer: parsed['faqAnswer'] ?? '',
            faqSource: parsed['faqSource'] ?? 'CAREFLOW AI Agent Knowledge Base',
            isBookingRequest: parsed['isBookingRequest'] != false,
            department: parsed['department'] ?? 'General Medicine',
            doctor: parsed['doctor'] ?? 'Dr. Rahul Verma',
            room: parsed['room'] ?? 'OPD Room 101',
            extractedPatientName: finalName,
            extractedPhone: finalPhone,
            extractedAge: parsed['extractedAge'] is int ? parsed['extractedAge'] : (age ?? 35),
            extractedGender: parsed['extractedGender'] ?? (gender ?? 'Male'),
            symptoms: parsedSymptoms.isNotEmpty ? parsedSymptoms : [userPrompt],
            priority: parsed['priority'] ?? 'Normal',
            canAutoBook: finalName.isNotEmpty && finalPhone.isNotEmpty,
            explanation: parsed['explanation'] ?? 'Doctor consultation scheduled.',
            spokenResponse: parsed['spokenResponse'] ?? 'OPD appointment routed to ${parsed['doctor']}.',
          );
        }
      }
    } catch (_) {}

    // Fallback Offline Rule Engine
    return _fallbackRule(userPrompt, patientName, phone, age, gender);
  }

  static GeminiTriageResult _fallbackRule(
    String prompt,
    String? patientName,
    String? phone,
    int? age,
    String? gender,
  ) {
    final lower = prompt.toLowerCase();
    final isEmerg = lower.contains('chest pain') ||
        lower.contains('heart attack') ||
        lower.contains('unconscious') ||
        lower.contains('stroke') ||
        lower.contains('severe bleeding');

    if (isEmerg) {
      return GeminiTriageResult(
        isEmergency: true,
        emergencyAdvice: 'Rush immediately to Civil Hospital Emergency Casualty (Room 10) or dial 108.',
        spokenResponse: 'Emergency symptoms detected. Please proceed immediately to Emergency Room 10 or dial 108.',
      );
    }

    String dept = 'General Medicine';
    String doc = 'Dr. Rahul Verma';
    String room = 'OPD Room 101';
    String pri = 'Normal';

    if (lower.contains('cardio') || lower.contains('heart') || lower.contains('bp') || lower.contains('palpitation')) {
      dept = 'Cardiology';
      doc = 'Dr. Priya Singh';
      room = 'Room 201';
    } else if (lower.contains('ortho') || lower.contains('bone') || lower.contains('knee') || lower.contains('joint') || lower.contains('fracture')) {
      dept = 'Orthopedics';
      doc = 'Dr. Karan Malhotra';
      room = 'Room 108';
    } else if (lower.contains('child') || lower.contains('baby') || lower.contains('pediatric')) {
      dept = 'Pediatrics';
      doc = 'Dr. Simran Kaur';
      room = 'Room 301';
      pri = 'Pediatric';
    }

    final hasUser = (patientName != null && patientName.isNotEmpty) && (phone != null && phone.isNotEmpty);

    return GeminiTriageResult(
      isEmergency: false,
      isBookingRequest: true,
      department: dept,
      doctor: doc,
      room: room,
      extractedPatientName: patientName,
      extractedPhone: phone,
      extractedAge: age ?? 35,
      extractedGender: gender ?? 'Male',
      symptoms: [prompt],
      priority: pri,
      canAutoBook: hasUser,
      explanation: 'Matched symptoms to $dept ($doc). A doctor will make the final clinical assessment.',
      spokenResponse: 'I have routed your appointment to $doc in $dept, $room.',
    );
  }
}

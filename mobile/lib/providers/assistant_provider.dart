import 'package:flutter/material.dart';
import '../models/token_model.dart';
import '../models/user_model.dart';
import '../services/gemini_triage_service.dart';
import '../services/queue_service.dart';

class AssistantMessage {
  final String id;
  final String sender; // 'assistant' | 'user' | 'system'
  final String text;
  final String timestamp;
  final String? source;
  final TokenModel? createdToken;
  final List<String> quickReplies;
  final String? actionType; // 'call_108' | 'view_tracker' | 'helpdesk'

  AssistantMessage({
    required this.id,
    required this.sender,
    required this.text,
    required this.timestamp,
    this.source,
    this.createdToken,
    this.quickReplies = const [],
    this.actionType,
  });
}

class AssistantProvider extends ChangeNotifier {
  final List<AssistantMessage> _messages = [];
  bool _isProcessing = false;
  TokenModel? _lastBookedToken;

  List<AssistantMessage> get messages => _messages;
  bool get isProcessing => _isProcessing;
  TokenModel? get lastBookedToken => _lastBookedToken;

  AssistantProvider() {
    resetConversation();
  }

  void resetConversation() {
    _messages.clear();
    _messages.add(
      AssistantMessage(
        id: 'msg-welcome',
        sender: 'assistant',
        text: 'Hello! I am your CareFlow AI OPD Assistant powered by Google Gemini.\n\n✨ **Single-Prompt OPD Booking Active:** Just describe your problem (e.g., *"I have severe fever and headache, please book an appointment"*) and I will match you with the right doctor and book your live OPD token instantly.\n\nYou can also ask me any questions about hospital policies, doctor availability, room locations, or queue tokens based on our official Knowledge Base.',
        timestamp: _currentTime(),
        quickReplies: [
          '🤒 High fever & body ache',
          '🫀 Chest discomfort or palpitations',
          '🦴 Severe knee / joint pain',
          '❓ Can I book without logging in?',
          '🎫 How do I get a token?',
          '⏰ Hospital Timings & Fasting Rules',
        ],
      ),
    );
    notifyListeners();
  }

  Future<void> sendMessage(String text, UserModel? currentUser) async {
    if (text.trim().isEmpty || _isProcessing) return;

    // 1. Add user message
    _messages.add(
      AssistantMessage(
        id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
        sender: 'user',
        text: text.trim(),
        timestamp: _currentTime(),
      ),
    );
    _isProcessing = true;
    notifyListeners();

    try {
      // 2. Call Gemini Triage Service
      final triage = await GeminiTriageService.analyzeSinglePrompt(
        text,
        patientName: currentUser?.name,
        phone: currentUser?.phone,
        age: currentUser?.age ?? 35,
        gender: currentUser?.gender ?? 'Male',
        abhaId: currentUser?.abhaId,
      );

      // 3. Emergency escalation
      if (triage.isEmergency) {
        _messages.add(
          AssistantMessage(
            id: 'ast-${DateTime.now().millisecondsSinceEpoch}',
            sender: 'assistant',
            text: '🚨 **EMERGENCY ALERT**: ${triage.emergencyAdvice.isNotEmpty ? triage.emergencyAdvice : "Please rush immediately to Civil Hospital 24/7 Trauma Emergency (Ground Floor, Room 10) or dial 108 for an ambulance."}',
            timestamp: _currentTime(),
            actionType: 'call_108',
            quickReplies: ['Call 108 Ambulance', 'Hospital Helpdesk'],
          ),
        );
        return;
      }

      // 4. FAQ Answer from PDF Knowledge Base
      if (triage.isFaqQuery && triage.faqAnswer.isNotEmpty) {
        _messages.add(
          AssistantMessage(
            id: 'ast-${DateTime.now().millisecondsSinceEpoch}',
            sender: 'assistant',
            text: triage.faqAnswer,
            timestamp: _currentTime(),
            source: triage.faqSource,
            quickReplies: [
              'Can I book without logging in?',
              'How do I get a token?',
              'Where do I pick up medicines?',
              '📅 Book an Appointment',
            ],
          ),
        );
        return;
      }

      // 5. Single-Prompt Direct Booking
      final patientName = triage.extractedPatientName?.isNotEmpty == true
          ? triage.extractedPatientName!
          : (currentUser?.name ?? '');
      final phone = triage.extractedPhone?.isNotEmpty == true
          ? triage.extractedPhone!
          : (currentUser?.phone ?? '');

      if (patientName.isNotEmpty && phone.isNotEmpty) {
        try {
          final token = await QueueService.createToken(
            patientName: patientName,
            phone: phone,
            age: triage.extractedAge,
            gender: triage.extractedGender,
            abhaId: currentUser?.abhaId,
            department: triage.department,
            symptoms: triage.symptoms,
            priority: triage.priority,
          );

          _lastBookedToken = token;

          _messages.add(
            AssistantMessage(
              id: 'ast-${DateTime.now().millisecondsSinceEpoch}',
              sender: 'assistant',
              text: '🎉 **OPD Appointment Confirmed in 1 Prompt!**\n\n${triage.explanation}\n\n• **Token Number:** **${token.tokenNumber}**\n• **Doctor:** **${triage.doctor}** (${triage.room})\n• **Department:** ${triage.department}\n• **Patient:** $patientName ($phone)\n• **Estimated Wait:** ~${token.estimatedWaitMinutes} mins\n\nPlease arrive 15 minutes before your consultation and present this Token # at ${triage.room}.',
              timestamp: _currentTime(),
              createdToken: token,
              actionType: 'view_tracker',
              quickReplies: [
                'Track My Token Live',
                'Book Another Appointment',
                'Hospital Timings',
              ],
            ),
          );
          return;
        } catch (e) {
          _messages.add(
            AssistantMessage(
              id: 'ast-${DateTime.now().millisecondsSinceEpoch}',
              sender: 'assistant',
              text: 'I matched your symptoms to ${triage.doctor} in ${triage.department}, but automatic token booking encountered a delay: $e. Would you like to try again?',
              timestamp: _currentTime(),
              quickReplies: ['Retry Booking', 'Helpdesk'],
            ),
          );
          return;
        }
      } else {
        // Collect patient details if guest
        _messages.add(
          AssistantMessage(
            id: 'ast-${DateTime.now().millisecondsSinceEpoch}',
            sender: 'assistant',
            text: 'I have matched your symptoms to **${triage.doctor}** in **${triage.department}** (${triage.room}).\n\nPlease reply with the **Patient\'s Full Name** and **10-digit Mobile Number** to confirm and generate your live OPD Token.',
            timestamp: _currentTime(),
            quickReplies: ['Rohan Kumar, 9876543210', 'Sunita Devi, 9812345678'],
          ),
        );
      }
    } catch (e) {
      _messages.add(
        AssistantMessage(
          id: 'err-${DateTime.now().millisecondsSinceEpoch}',
          sender: 'system',
          text: 'Error processing request: $e',
          timestamp: _currentTime(),
        ),
      );
    } finally {
      _isProcessing = false;
      notifyListeners();
    }
  }

  String _currentTime() {
    final now = DateTime.now();
    final hour = now.hour > 12 ? now.hour - 12 : (now.hour == 0 ? 12 : now.hour);
    final period = now.hour >= 12 ? 'PM' : 'AM';
    final minute = now.minute.toString().padLeft(2, '0');
    return '$hour:$minute $period';
  }
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/assistant_provider.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/token_card.dart';
import '../patient/smart_queue_tracker_screen.dart';

class VoiceChatAssistantSheet extends StatefulWidget {
  const VoiceChatAssistantSheet({Key? key}) : super(key: key);

  @override
  State<VoiceChatAssistantSheet> createState() => _VoiceChatAssistantSheetState();
}

class _VoiceChatAssistantSheetState extends State<VoiceChatAssistantSheet> {
  final _inputController = TextEditingController();
  final _scrollController = ScrollController();
  bool _isListening = false;

  @override
  void dispose() {
    _inputController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _sendMessage([String? customText]) {
    final text = customText ?? _inputController.text;
    if (text.trim().isEmpty) return;

    _inputController.clear();
    final auth = Provider.of<AuthProvider>(context, listen: false);
    final assistant = Provider.of<AssistantProvider>(context, listen: false);

    assistant.sendMessage(text, auth.currentUser);
    _scrollToBottom();
  }

  void _toggleMockVoiceInput() {
    setState(() => _isListening = !_isListening);
    if (_isListening) {
      // Provide immediate voice prompt simulation for rapid testing
      Future.delayed(const Duration(seconds: 1), () {
        if (mounted && _isListening) {
          setState(() => _isListening = false);
          _sendMessage('I have severe fever and bad headache since yesterday, please book an appointment');
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final assistant = Provider.of<AssistantProvider>(context);

    return Container(
      height: MediaQuery.of(context).size.height * 0.9,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: Column(
        children: [
          // Drag handle
          const SizedBox(height: 12),
          Container(
            width: 44,
            height: 4,
            decoration: BoxDecoration(
              color: AppColors.border,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 12),

          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.support_agent, color: Colors.white, size: 22),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Text(
                            'CareFlow AI Assistant',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.primarySoft,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: const Text(
                              'Gemini 3.8',
                              style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.primary),
                            ),
                          ),
                        ],
                      ),
                      const Text(
                        'Civil Hospital Ambala • 1-Prompt OPD Booking',
                        style: TextStyle(fontSize: 11, color: AppColors.textSecondary),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.refresh_rounded, size: 20),
                  onPressed: () => assistant.resetConversation(),
                ),
                IconButton(
                  icon: const Icon(Icons.close_rounded, size: 20),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
          const Divider(height: 16, color: AppColors.border),

          // Safety Disclaimer Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(0xFFFEF3C7),
            child: const Row(
              children: [
                Icon(Icons.verified_user_outlined, size: 14, color: Color(0xFFB45309)),
                SizedBox(width: 6),
                Expanded(
                  child: Text(
                    'Grounded in official Knowledge Base PDF. Not a clinical diagnosis. Emergency: 108',
                    style: TextStyle(fontSize: 10, color: Color(0xFF92400E)),
                  ),
                ),
              ],
            ),
          ),

          // Message Stream
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: assistant.messages.length,
              itemBuilder: (context, index) {
                final msg = assistant.messages[index];
                final isUser = msg.sender == 'user';

                return Padding(
                  padding: const EdgeInsets.only(bottom: 14),
                  child: Column(
                    crossAxisAlignment: isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                    children: [
                      Container(
                        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: BoxDecoration(
                          color: isUser ? AppColors.medicalBlue : Colors.white,
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(
                            color: isUser ? AppColors.medicalBlue : AppColors.border,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.02),
                              blurRadius: 4,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              msg.text,
                              style: TextStyle(
                                fontSize: 13,
                                height: 1.4,
                                color: isUser ? Colors.white : AppColors.textPrimary,
                              ),
                            ),
                            if (msg.source != null) ...[
                              const SizedBox(height: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: AppColors.primarySoft,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  '📄 ${msg.source}',
                                  style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.primary),
                                ),
                              ),
                            ],
                            if (msg.createdToken != null) ...[
                              const SizedBox(height: 12),
                              TokenCard(
                                token: msg.createdToken!,
                                onTapTrack: () {
                                  Navigator.pop(context);
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (_) => SmartQueueTrackerScreen(token: msg.createdToken!),
                                    ),
                                  );
                                },
                              ),
                            ],
                            const SizedBox(height: 4),
                            Align(
                              alignment: Alignment.bottomRight,
                              child: Text(
                                msg.timestamp,
                                style: TextStyle(
                                  fontSize: 9,
                                  color: isUser ? Colors.white70 : AppColors.textMuted,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (msg.quickReplies.isNotEmpty) ...[
                        const SizedBox(height: 8),
                        Wrap(
                          spacing: 6,
                          runSpacing: 6,
                          children: msg.quickReplies.map((reply) {
                            return ActionChip(
                              label: Text(reply, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600)),
                              backgroundColor: Colors.white,
                              side: const BorderSide(color: AppColors.border),
                              onPressed: () => _sendMessage(reply),
                            );
                          }).toList(),
                        ),
                      ],
                    ],
                  ),
                );
              },
            ),
          ),

          // Processing Indicator
          if (assistant.isProcessing)
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 6),
              child: Row(
                children: [
                  SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2)),
                  SizedBox(width: 8),
                  Text('CareFlow AI is thinking & routing...', style: TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                ],
              ),
            ),

          // Input Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: AppColors.border)),
            ),
            child: Row(
              children: [
                GestureDetector(
                  onTap: _toggleMockVoiceInput,
                  child: Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: _isListening ? AppColors.danger : AppColors.primarySoft,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      _isListening ? Icons.mic : Icons.mic_none,
                      color: _isListening ? Colors.white : AppColors.primary,
                      size: 22,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: TextField(
                    controller: _inputController,
                    decoration: InputDecoration(
                      hintText: _isListening ? 'Listening to speech...' : 'Describe symptoms or ask question...',
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                        borderSide: const BorderSide(color: AppColors.border),
                      ),
                    ),
                    onSubmitted: (val) => _sendMessage(),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send_rounded, color: AppColors.primary),
                  onPressed: () => _sendMessage(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/queue_provider.dart';
import '../../widgets/token_card.dart';
import 'smart_queue_tracker_screen.dart';
import 'book_appointment_screen.dart';
import '../assistant/voice_chat_assistant_sheet.dart';

class PatientDashboardScreen extends StatefulWidget {
  const PatientDashboardScreen({Key? key}) : super(key: key);

  @override
  State<PatientDashboardScreen> createState() => _PatientDashboardScreenState();
}

class _PatientDashboardScreenState extends State<PatientDashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<QueueProvider>(context, listen: false).fetchActiveToken();
    });
  }

  void _openVoiceAssistant() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => const VoiceChatAssistantSheet(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final queue = Provider.of<QueueProvider>(context);
    final user = auth.currentUser;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Hello, ${user?.name.split(" ").first ?? "Patient"}',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const Text(
              'Civil Hospital Ambala OPD',
              style: TextStyle(fontSize: 11, color: AppColors.textSecondary),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.logout_rounded),
            onPressed: () => auth.logout(),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _openVoiceAssistant,
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.mic, color: Colors.white),
        label: const Text('Voice OPD', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
      body: RefreshIndicator(
        onRefresh: () => queue.fetchActiveToken(),
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // AI Voice OPD Banner
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF0F766E), Color(0xFF14B8A6)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primary.withOpacity(0.2),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Text(
                              '✨ Gemini AI Single-Prompt',
                              style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                            ),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Book OPD in One Voice Prompt',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Speak symptoms in English, Hindi or Punjabi to book your token instantly.',
                            style: TextStyle(color: Colors.white.withOpacity(0.85), fontSize: 11),
                          ),
                          const SizedBox(height: 12),
                          ElevatedButton.icon(
                            onPressed: _openVoiceAssistant,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              foregroundColor: AppColors.primary,
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                            ),
                            icon: const Icon(Icons.mic, size: 16),
                            label: const Text('Open Voice Assistant', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      width: 52,
                      height: 52,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.support_agent, color: Colors.white, size: 30),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Active Token Section
              const Text(
                'My Active Token',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
              ),
              const SizedBox(height: 12),
              if (queue.activeToken != null)
                TokenCard(
                  token: queue.activeToken!,
                  onTapTrack: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => SmartQueueTrackerScreen(token: queue.activeToken!),
                      ),
                    );
                  },
                )
              else
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: Column(
                    children: [
                      Icon(Icons.confirmation_number_outlined, size: 40, color: AppColors.textMuted),
                      const SizedBox(height: 12),
                      const Text(
                        'No Active Queue Token',
                        style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Book an OPD appointment to get a live queue token and real-time wait estimation.',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton.icon(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => const BookAppointmentScreen()),
                          );
                        },
                        icon: const Icon(Icons.add, size: 18),
                        label: const Text('Book OPD Appointment'),
                      ),
                    ],
                  ),
                ),
              const SizedBox(height: 24),

              // Quick Actions Grid
              const Text(
                'Hospital Services',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
              ),
              const SizedBox(height: 12),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 1.4,
                children: [
                  _buildServiceCard(
                    icon: Icons.calendar_month_rounded,
                    title: 'Book OPD',
                    subtitle: 'Doctor slots',
                    color: AppColors.primary,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => const BookAppointmentScreen()),
                      );
                    },
                  ),
                  _buildServiceCard(
                    icon: Icons.access_time_rounded,
                    title: 'Queue Tracker',
                    subtitle: 'Live positions',
                    color: AppColors.medicalBlue,
                    onTap: () {
                      if (queue.activeToken != null) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => SmartQueueTrackerScreen(token: queue.activeToken!),
                          ),
                        );
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Please book a token to track live queue position.')),
                        );
                      }
                    },
                  ),
                  _buildServiceCard(
                    icon: Icons.medication_outlined,
                    title: 'Prescriptions',
                    subtitle: 'Digital slips',
                    color: AppColors.success,
                    onTap: () {},
                  ),
                  _buildServiceCard(
                    icon: Icons.science_outlined,
                    title: 'Lab Reports',
                    subtitle: 'Diagnostics & tests',
                    color: AppColors.warning,
                    onTap: () {},
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildServiceCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 22),
            ),
            const SizedBox(height: 10),
            Text(
              title,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            Text(
              subtitle,
              style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
            ),
          ],
        ),
      ),
    );
  }
}

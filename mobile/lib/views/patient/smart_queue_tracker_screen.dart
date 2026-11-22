import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../models/token_model.dart';

class SmartQueueTrackerScreen extends StatelessWidget {
  final TokenModel token;

  const SmartQueueTrackerScreen({Key? key, required this.token}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Live Smart Queue Tracker'),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            // Big Token Banner
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0F766E), Color(0xFF134E4A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withOpacity(0.3),
                    blurRadius: 16,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          token.department,
                          style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.primaryLight,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          token.status,
                          style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Text(
                    token.tokenNumber,
                    style: const TextStyle(
                      fontSize: 38,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      letterSpacing: -1,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    '${token.patientName} (${token.gender}, ${token.age} yrs)',
                    style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 14),
                  ),
                  const SizedBox(height: 20),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Column(
                          children: [
                            const Text('Room Number', style: TextStyle(color: Colors.white70, fontSize: 11)),
                            const SizedBox(height: 4),
                            Text(
                              token.roomNumber ?? 'Room 101',
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                          ],
                        ),
                        Container(width: 1, height: 28, color: Colors.white24),
                        Column(
                          children: [
                            const Text('Estimated Wait', style: TextStyle(color: Colors.white70, fontSize: 11)),
                            const SizedBox(height: 4),
                            Text(
                              '~${token.estimatedWaitMinutes} mins',
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Live Progress Tracker
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Queue Progression',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                  ),
                  const SizedBox(height: 20),
                  _buildStep(
                    icon: Icons.check_circle,
                    title: 'Token Generated & Checked-in',
                    subtitle: 'Your position has been registered in the live hospital queue.',
                    isDone: true,
                  ),
                  _buildStep(
                    icon: token.status == 'WAITING' || token.status == 'CALLED' || token.status == 'IN_CONSULTATION'
                        ? Icons.hourglass_top_rounded
                        : Icons.radio_button_unchecked,
                    title: 'In Waiting Area',
                    subtitle: 'Please wait near ${token.roomNumber ?? "OPD Room 101"} on Ground Floor.',
                    isDone: token.status != 'WAITING',
                    isActive: token.status == 'WAITING',
                  ),
                  _buildStep(
                    icon: token.status == 'CALLED' || token.status == 'IN_CONSULTATION'
                        ? Icons.campaign_rounded
                        : Icons.radio_button_unchecked,
                    title: 'Called to Cabin',
                    subtitle: 'Doctor bell active. Proceed inside when your token sounds on screen.',
                    isDone: token.status == 'IN_CONSULTATION' || token.status == 'COMPLETED',
                    isActive: token.status == 'CALLED',
                  ),
                  _buildStep(
                    icon: token.status == 'IN_CONSULTATION'
                        ? Icons.medical_services_rounded
                        : (token.status == 'COMPLETED' ? Icons.check_circle : Icons.radio_button_unchecked),
                    title: 'In Consultation',
                    subtitle: 'Clinical examination with ${token.assignedDoctorName ?? "Consultant Doctor"}.',
                    isDone: token.status == 'COMPLETED',
                    isActive: token.status == 'IN_CONSULTATION',
                    isLast: true,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStep({
    required IconData icon,
    required String title,
    required String subtitle,
    bool isDone = false,
    bool isActive = false,
    bool isLast = false,
  }) {
    final color = isDone
        ? AppColors.primary
        : (isActive ? AppColors.warning : AppColors.textMuted);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Icon(icon, color: color, size: 22),
            if (!isLast)
              Container(
                width: 2,
                height: 40,
                color: isDone ? AppColors.primary : AppColors.border,
              ),
          ],
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: isDone || isActive ? AppColors.textPrimary : AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 18),
            ],
          ),
        ),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';
import '../models/token_model.dart';

class TokenCard extends StatelessWidget {
  final TokenModel token;
  final VoidCallback? onTapTrack;

  const TokenCard({
    Key? key,
    required this.token,
    this.onTapTrack,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.Border.all(color: AppColors.border),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.primarySoft,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  token.department,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
              ),
              _buildStatusBadge(token.status),
            ],
          ),
          const SizedBox(height: 14),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                token.tokenNumber,
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w900,
                  letterSpacing: -0.5,
                  color: AppColors.textPrimary,
                ),
              ),
              const Spacer(),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text(
                    'Est. Wait',
                    style: TextStyle(fontSize: 11, color: AppColors.textSecondary),
                  ),
                  Text(
                    '~${token.estimatedWaitMinutes} mins',
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const Divider(height: 24, color: AppColors.border),
          Row(
            children: [
              const Icon(Icons.person_outline, size: 16, color: AppColors.textSecondary),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  '${token.patientName} (${token.gender}, ${token.age}y)',
                  style: const TextStyle(fontSize: 13, color: AppColors.textSecondary),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              const Icon(Icons.medical_services_outlined, size: 16, color: AppColors.primary),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  '${token.assignedDoctorName ?? "Consultant Doctor"} • ${token.roomNumber ?? "OPD Room 101"}',
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
              ),
            ],
          ),
          if (onTapTrack != null) ...[
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: onTapTrack,
                icon: const Icon(Icons.timeline, size: 18),
                label: const Text('Track Live Queue Status'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
    Color bg = AppColors.primarySoft;
    Color text = AppColors.primary;

    if (status == 'IN_CONSULTATION') {
      bg = AppColors.warningLight;
      text = AppColors.warning;
    } else if (status == 'COMPLETED') {
      bg = AppColors.successLight;
      text = AppColors.success;
    } else if (status == 'CANCELLED') {
      bg = AppColors.dangerLight;
      text = AppColors.danger;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        status.replaceAll('_', ' '),
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          color: text,
        ),
      ),
    );
  }
}

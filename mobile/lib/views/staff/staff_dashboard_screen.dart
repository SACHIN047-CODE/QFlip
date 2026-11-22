import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../services/queue_service.dart';

class StaffDashboardScreen extends StatefulWidget {
  const StaffDashboardScreen({Key? key}) : super(key: key);

  @override
  State<StaffDashboardScreen> createState() => _StaffDashboardScreenState();
}

class _StaffDashboardScreenState extends State<StaffDashboardScreen> {
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _ageController = TextEditingController(text: '32');
  String _department = 'General Medicine';
  bool _isIssuing = false;

  void _issueWalkInToken() async {
    final name = _nameController.text.trim();
    final phone = _phoneController.text.trim();
    final age = int.tryParse(_ageController.text) ?? 32;

    if (name.isEmpty || phone.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter patient name and mobile number.')),
      );
      return;
    }

    setState(() => _isIssuing = true);
    try {
      final token = await QueueService.createToken(
        patientName: name,
        phone: phone,
        age: age,
        gender: 'Male',
        department: _department,
        symptoms: ['Walk-in Counter Registration'],
      );

      _nameController.clear();
      _phoneController.clear();

      if (mounted) {
        showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text('🎉 Token Issued!'),
            content: Text(
              'Token #${token.tokenNumber}\nRoom: ${token.roomNumber}\nEstimated wait: ~${token.estimatedWaitMinutes} mins',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('OK'),
              ),
            ],
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppColors.danger),
        );
      }
    } finally {
      if (mounted) setState(() => _isIssuing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Front Desk Registration & Triage'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_rounded),
            onPressed: () => auth.logout(),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
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
                    'Walk-In Patient Registration',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _nameController,
                    decoration: const InputDecoration(labelText: 'Patient Full Name *'),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _phoneController,
                    keyboardType: TextInputType.phone,
                    decoration: const InputDecoration(labelText: '10-digit Phone *'),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _ageController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(labelText: 'Age'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: DropdownButtonFormField<String>(
                          value: _department,
                          decoration: const InputDecoration(labelText: 'Department'),
                          items: const [
                            DropdownMenuItem(value: 'General Medicine', child: Text('Gen Medicine')),
                            DropdownMenuItem(value: 'Cardiology', child: Text('Cardiology')),
                            DropdownMenuItem(value: 'Orthopedics', child: Text('Orthopedics')),
                            DropdownMenuItem(value: 'Pediatrics', child: Text('Pediatrics')),
                          ],
                          onChanged: (val) => setState(() => _department = val ?? 'General Medicine'),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton.icon(
                      onPressed: _isIssuing ? null : _issueWalkInToken,
                      icon: const Icon(Icons.print_rounded, size: 20),
                      label: _isIssuing
                          ? const CircularProgressIndicator(color: Colors.white)
                          : const Text('Issue Live OPD Token Slip', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

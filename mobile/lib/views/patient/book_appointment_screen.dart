import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../models/department_model.dart';
import '../../models/doctor_model.dart';
import '../../providers/auth_provider.dart';
import '../../providers/queue_provider.dart';
import '../../services/department_service.dart';

class BookAppointmentScreen extends StatefulWidget {
  const BookAppointmentScreen({Key? key}) : super(key: key);

  @override
  State<BookAppointmentScreen> createState() => _BookAppointmentScreenState();
}

class _BookAppointmentScreenState extends State<BookAppointmentScreen> {
  List<DepartmentModel> _departments = [];
  List<DoctorModel> _doctors = [];
  DepartmentModel? _selectedDept;
  DoctorModel? _selectedDoc;
  final _symptomsController = TextEditingController();
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  void _loadData() async {
    final depts = await DepartmentService.getDepartments();
    final docs = await DoctorService.getDoctors();
    if (mounted) {
      setState(() {
        _departments = depts;
        _doctors = docs;
        if (depts.isNotEmpty) _selectedDept = depts.first;
        if (docs.isNotEmpty) _selectedDoc = docs.first;
        _isLoading = false;
      });
    }
  }

  @override
  void dispose() {
    _symptomsController.dispose();
    super.dispose();
  }

  void _submitBooking() async {
    if (_selectedDept == null) return;

    final auth = Provider.of<AuthProvider>(context, listen: false);
    final queue = Provider.of<QueueProvider>(context, listen: false);
    final user = auth.currentUser;

    final token = await queue.bookToken(
      patientName: user?.name ?? 'Walk-in Patient',
      phone: user?.phone ?? '9876543100',
      age: user?.age ?? 35,
      gender: user?.gender ?? 'Male',
      abhaId: user?.abhaId,
      department: _selectedDept!.name,
      symptoms: _symptomsController.text.isNotEmpty ? [_symptomsController.text] : ['Routine OPD consultation'],
      doctorId: _selectedDoc?.id,
    );

    if (token != null && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('🎉 Token ${token.tokenNumber} issued successfully!'),
          backgroundColor: AppColors.success,
        ),
      );
      Navigator.pop(context);
    } else if (mounted && queue.errorMessage != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(queue.errorMessage!),
          backgroundColor: AppColors.danger,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final queue = Provider.of<QueueProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Book OPD Appointment'),
        elevation: 0,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Department Dropdown
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
                          '1. Select Department',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                        ),
                        const SizedBox(height: 12),
                        DropdownButtonFormField<DepartmentModel>(
                          value: _selectedDept,
                          decoration: const InputDecoration(
                            prefixIcon: Icon(Icons.apartment_rounded, size: 20),
                          ),
                          items: _departments.map((d) {
                            return DropdownMenuItem(
                              value: d,
                              child: Text('${d.name} (${d.floor})'),
                            );
                          }).toList(),
                          onChanged: (val) => setState(() => _selectedDept = val),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Doctor Dropdown
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
                          '2. Consultant Doctor',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                        ),
                        const SizedBox(height: 12),
                        DropdownButtonFormField<DoctorModel>(
                          value: _selectedDoc,
                          decoration: const InputDecoration(
                            prefixIcon: Icon(Icons.person_outline, size: 20),
                          ),
                          items: _doctors.map((doc) {
                            return DropdownMenuItem(
                              value: doc,
                              child: Text('${doc.name} • ${doc.room}'),
                            );
                          }).toList(),
                          onChanged: (val) => setState(() => _selectedDoc = val),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Symptoms Text Field
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
                          '3. Health Symptoms / Complaint',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                        ),
                        const SizedBox(height: 12),
                        TextField(
                          controller: _symptomsController,
                          maxLines: 3,
                          decoration: const InputDecoration(
                            hintText: 'e.g. Mild fever, dry cough, severe knee pain...',
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Submit Button
                  SizedBox(
                    height: 52,
                    child: ElevatedButton(
                      onPressed: queue.isLoading ? null : _submitBooking,
                      child: queue.isLoading
                          ? const CircularProgressIndicator(color: Colors.white)
                          : const Text('Confirm & Generate Live Queue Token', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}

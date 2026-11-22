import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../common/navigation_shell.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _abhaController = TextEditingController();
  final _ageController = TextEditingController(text: '28');
  String _selectedGender = 'Male';

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _abhaController.dispose();
    _ageController.dispose();
    super.dispose();
  }

  void _submitRegister() async {
    final name = _nameController.text.trim();
    final email = _emailController.text.trim();
    final phone = _phoneController.text.trim();
    final password = _passwordController.text;
    final abhaId = _abhaController.text.trim();
    final age = int.tryParse(_ageController.text) ?? 28;

    if (name.isEmpty || email.isEmpty || phone.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all mandatory fields')),
      );
      return;
    }

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.register(
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: 'patient',
      abhaId: abhaId.isNotEmpty ? abhaId : null,
      age: age,
      gender: _selectedGender,
    );

    if (success && mounted) {
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const NavigationShell()),
        (route) => false,
      );
    } else if (mounted && authProvider.errorMessage != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(authProvider.errorMessage!),
          backgroundColor: AppColors.danger,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Create Patient Profile'),
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
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
                  children: [
                    TextField(
                      controller: _nameController,
                      decoration: const InputDecoration(
                        labelText: 'Full Name *',
                        prefixIcon: Icon(Icons.person_outline, size: 20),
                      ),
                    ),
                    const SizedBox(height: 14),
                    TextField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: const InputDecoration(
                        labelText: 'Email Address *',
                        prefixIcon: Icon(Icons.email_outlined, size: 20),
                      ),
                    ),
                    const SizedBox(height: 14),
                    TextField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      decoration: const InputDecoration(
                        labelText: '10-digit Phone Number *',
                        prefixIcon: Icon(Icons.phone_outlined, size: 20),
                      ),
                    ),
                    const SizedBox(height: 14),
                    TextField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: const InputDecoration(
                        labelText: 'Password *',
                        prefixIcon: Icon(Icons.lock_outline, size: 20),
                      ),
                    ),
                    const SizedBox(height: 14),
                    TextField(
                      controller: _abhaController,
                      decoration: const InputDecoration(
                        labelText: 'ABHA Health ID (Optional)',
                        prefixIcon: Icon(Icons.badge_outlined, size: 20),
                      ),
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _ageController,
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              labelText: 'Age',
                              prefixIcon: Icon(Icons.calendar_today_outlined, size: 18),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            value: _selectedGender,
                            decoration: const InputDecoration(labelText: 'Gender'),
                            items: const [
                              DropdownMenuItem(value: 'Male', child: Text('Male')),
                              DropdownMenuItem(value: 'Female', child: Text('Female')),
                              DropdownMenuItem(value: 'Other', child: Text('Other')),
                            ],
                            onChanged: (val) => setState(() => _selectedGender = val ?? 'Male'),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: auth.isLoading ? null : _submitRegister,
                        child: auth.isLoading
                            ? const CircularProgressIndicator(color: Colors.white)
                            : const Text('Complete Registration', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

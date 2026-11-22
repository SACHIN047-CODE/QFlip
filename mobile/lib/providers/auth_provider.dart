import 'package:flutter/material.dart';
import '../models/user_model.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isLoading = true;
  String? _errorMessage;

  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _currentUser != null;
  String? get errorMessage => _errorMessage;

  String get role => _currentUser?.role ?? 'patient';

  AuthProvider() {
    checkAuth();
  }

  Future<void> checkAuth() async {
    _isLoading = true;
    notifyListeners();
    try {
      _currentUser = await AuthService.getCurrentUser();
    } catch (_) {
      _currentUser = null;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      _currentUser = await AuthService.login(email, password);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register({
    required String name,
    required String email,
    required String password,
    required String phone,
    String? role = 'patient',
    String? abhaId,
    int? age,
    String? gender,
    String? doctorPasskey,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      _currentUser = await AuthService.register(
        name: name,
        email: email,
        password: password,
        phone: phone,
        role: role,
        abhaId: abhaId,
        age: age,
        gender: gender,
        doctorPasskey: doctorPasskey,
      );
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    await AuthService.logout();
    _currentUser = null;
    notifyListeners();
  }
}

import 'package:flutter/material.dart';
import '../models/token_model.dart';
import '../services/queue_service.dart';

class QueueProvider extends ChangeNotifier {
  TokenModel? _activeToken;
  List<TokenModel> _departmentQueue = [];
  bool _isLoading = false;
  String? _errorMessage;

  TokenModel? get activeToken => _activeToken;
  List<TokenModel> get departmentQueue => _departmentQueue;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> fetchActiveToken() async {
    _isLoading = true;
    notifyListeners();
    try {
      _activeToken = await QueueService.getMyActiveToken();
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchDepartmentQueue(String departmentId) async {
    _isLoading = true;
    notifyListeners();
    try {
      _departmentQueue = await QueueService.getDepartmentQueue(departmentId);
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<TokenModel?> bookToken({
    required String patientName,
    required String phone,
    required int age,
    required String gender,
    String? abhaId,
    required String department,
    List<String> symptoms = const [],
    String priority = 'Normal',
    String? doctorId,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      final token = await QueueService.createToken(
        patientName: patientName,
        phone: phone,
        age: age,
        gender: gender,
        abhaId: abhaId,
        department: department,
        symptoms: symptoms,
        priority: priority,
        doctorId: doctorId,
      );
      _activeToken = token;
      _isLoading = false;
      notifyListeners();
      return token;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return null;
    }
  }

  void setActiveToken(TokenModel token) {
    _activeToken = token;
    notifyListeners();
  }
}

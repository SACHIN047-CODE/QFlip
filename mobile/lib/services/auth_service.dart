import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/constants/api_endpoints.dart';
import '../core/network/api_client.dart';
import '../models/user_model.dart';

class AuthService {
  static const String userKey = 'careflow_cached_user';

  static Future<UserModel> login(String email, String password) async {
    final response = await ApiClient.post(
      ApiEndpoints.login,
      body: {'email': email.trim(), 'password': password},
    );

    // Backend returns { token: "...", user: { ... } }
    final token = response['token'] ?? '';
    final userJson = response['user'] ?? response;

    if (token.isNotEmpty) {
      await ApiClient.saveToken(token);
    }

    final user = UserModel.fromJson(userJson);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(userKey, jsonEncode(user.toJson()));

    return user;
  }

  static Future<UserModel> register({
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
    final body = {
      'name': name.trim(),
      'email': email.trim(),
      'password': password,
      'phone': phone.trim(),
      'role': role,
      'abhaId': abhaId,
      'age': age ?? 30,
      'gender': gender ?? 'Male',
    };
    if (doctorPasskey != null && doctorPasskey.isNotEmpty) {
      body['doctorPasskey'] = doctorPasskey;
    }

    final response = await ApiClient.post(ApiEndpoints.register, body: body);
    final token = response['token'] ?? '';
    final userJson = response['user'] ?? response;

    if (token.isNotEmpty) {
      await ApiClient.saveToken(token);
    }

    final user = UserModel.fromJson(userJson);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(userKey, jsonEncode(user.toJson()));

    return user;
  }

  static Future<UserModel?> getCurrentUser() async {
    try {
      final token = await ApiClient.getToken();
      if (token == null || token.isEmpty) return null;

      final response = await ApiClient.get(ApiEndpoints.me);
      final user = UserModel.fromJson(response);

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(userKey, jsonEncode(user.toJson()));
      return user;
    } catch (_) {
      // Return cached user if offline
      final prefs = await SharedPreferences.getInstance();
      final cached = prefs.getString(userKey);
      if (cached != null) {
        return UserModel.fromJson(jsonDecode(cached));
      }
      return null;
    }
  }

  static Future<void> logout() async {
    await ApiClient.clearToken();
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(userKey);
  }
}

import 'package:serverpod/serverpod.dart';
import 'token.dart';
import 'models.dart';

class Protocol extends SerializationManagerServer {
  static final Protocol instance = Protocol();

  @override
  Map<String, constructor> get constructors => {
        'Token': (Map<String, dynamic> json) => Token.fromJson(json, this),
        'User': (Map<String, dynamic> json) => User.fromJson(json, this),
        'Department': (Map<String, dynamic> json) => Department.fromJson(json, this),
        'Doctor': (Map<String, dynamic> json) => Doctor.fromJson(json, this),
        'TriageResult': (Map<String, dynamic> json) => TriageResult.fromJson(json, this),
      };

  @override
  Map<String, String> get tableForType => {
        'Token': 'careflow_tokens',
        'User': 'careflow_users',
        'Department': 'careflow_departments',
        'Doctor': 'careflow_doctors',
      };

  @override
  T deserialize<T>(dynamic data, [Type? t]) {
    t ??= T;
    if (constructors.containsKey(t.toString())) {
      return constructors[t.toString()]!(data as Map<String, dynamic>) as T;
    }
    return super.deserialize<T>(data, t);
  }
}

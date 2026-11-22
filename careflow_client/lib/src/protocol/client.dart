import 'dart:async';
import 'package:serverpod_client/serverpod_client.dart';
import 'protocol.dart';

class EndpointAuth extends EndpointRef {
  EndpointAuth(EndpointCaller caller) : super(caller);

  @override
  String get name => 'auth';

  Future<Map<String, dynamic>> login(String email, String password) async {
    return caller.callServerEndpoint<Map<String, dynamic>>(
      'auth',
      'login',
      {'email': email, 'password': password},
    );
  }

  Future<Map<String, dynamic>> loginWithAbha(String abhaId) async {
    return caller.callServerEndpoint<Map<String, dynamic>>(
      'auth',
      'loginWithAbha',
      {'abhaId': abhaId},
    );
  }
}

class EndpointQueue extends EndpointRef {
  EndpointQueue(EndpointCaller caller) : super(caller);

  @override
  String get name => 'queue';

  Future<List<Token>> getTokens({String? department, String? status}) async {
    return caller.callServerEndpoint<List<Token>>(
      'queue',
      'getTokens',
      {'department': department, 'status': status},
    );
  }

  Future<Token> createToken({
    required String department,
    required String patientName,
    required String patientId,
    String? patientPhone,
    int? patientAge,
    String? patientGender,
    String? symptoms,
    String? priority,
    String? doctorName,
    String? roomNumber,
  }) async {
    return caller.callServerEndpoint<Token>(
      'queue',
      'createToken',
      {
        'department': department,
        'patientName': patientName,
        'patientId': patientId,
        'patientPhone': patientPhone,
        'patientAge': patientAge,
        'patientGender': patientGender,
        'symptoms': symptoms,
        'priority': priority,
        'doctorName': doctorName,
        'roomNumber': roomNumber,
      },
    );
  }

  Future<Token?> callNext({
    required String department,
    required String doctorName,
  }) async {
    return caller.callServerEndpoint<Token?>(
      'queue',
      'callNext',
      {'department': department, 'doctorName': doctorName},
    );
  }

  Future<bool> completeConsultation(String tokenNumber) async {
    return caller.callServerEndpoint<bool>(
      'queue',
      'completeConsultation',
      {'tokenNumber': tokenNumber},
    );
  }

  Future<bool> skipToken(String tokenNumber) async {
    return caller.callServerEndpoint<bool>(
      'queue',
      'skipToken',
      {'tokenNumber': tokenNumber},
    );
  }
}

class EndpointTriage extends EndpointRef {
  EndpointTriage(EndpointCaller caller) : super(caller);

  @override
  String get name => 'triage';

  Future<TriageResult> triageSymptoms(String symptoms, {String? language}) async {
    return caller.callServerEndpoint<TriageResult>(
      'triage',
      'triageSymptoms',
      {'symptoms': symptoms, 'language': language},
    );
  }

  Future<Map<String, dynamic>> singlePromptBookOpd({
    required String voicePrompt,
    required String patientId,
    required String patientName,
    String? patientPhone,
    int? patientAge,
    String? patientGender,
  }) async {
    return caller.callServerEndpoint<Map<String, dynamic>>(
      'triage',
      'singlePromptBookOpd',
      {
        'voicePrompt': voicePrompt,
        'patientId': patientId,
        'patientName': patientName,
        'patientPhone': patientPhone,
        'patientAge': patientAge,
        'patientGender': patientGender,
      },
    );
  }
}

class Client extends ServerpodClient {
  late final EndpointAuth auth;
  late final EndpointQueue queue;
  late final EndpointTriage triage;

  Client(
    String host, {
    SecurityContext? context,
    ServerpodClientErrorCallback? errorHandler,
    AuthenticationKeyManager? authenticationKeyManager,
  }) : super(
          host,
          Protocol(),
          securityContext: context,
          errorHandler: errorHandler,
          authenticationKeyManager: authenticationKeyManager,
        ) {
    auth = EndpointAuth(this);
    queue = EndpointQueue(this);
    triage = EndpointTriage(this);
  }

  @override
  Map<String, EndpointRef> get endpointRefLookup => {
        'auth': auth,
        'queue': queue,
        'triage': triage,
      };
}

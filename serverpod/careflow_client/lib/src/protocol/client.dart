/* AUTOMATICALLY GENERATED CODE DO NOT MODIFY */
/*   To generate run: "serverpod generate"    */

// ignore_for_file: implementation_imports
// ignore_for_file: library_private_types_in_public_api
// ignore_for_file: non_constant_identifier_names
// ignore_for_file: public_member_api_docs
// ignore_for_file: type_literal_in_constant_pattern
// ignore_for_file: use_super_parameters
// ignore_for_file: invalid_use_of_internal_member

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'dart:async' as _ida;
import 'package:careflow_client/src/protocol/app_notification.dart'
    as _iq6m8chv;
import 'package:careflow_client/src/protocol/appointment.dart' as _i8r8tmrd;
import 'package:careflow_client/src/protocol/auth_response.dart' as _imy9z9a5;
import 'package:careflow_client/src/protocol/consultation.dart' as _ipmvdjgv;
import 'package:careflow_client/src/protocol/crowd_forecast.dart' as _i6zyqkpk;
import 'package:careflow_client/src/protocol/department.dart' as _imuk960z;
import 'package:careflow_client/src/protocol/digital_twin_result.dart'
    as _i7u5brv0;
import 'package:careflow_client/src/protocol/doctor.dart' as _inlv8cw0;
import 'package:careflow_client/src/protocol/doctor_capacity.dart' as _i91lt1r1;
import 'package:careflow_client/src/protocol/feedback_entry.dart' as _i4mo3s1g;
import 'package:careflow_client/src/protocol/greetings/greeting.dart'
    as _i496uthb;
import 'package:careflow_client/src/protocol/hospital_resource.dart'
    as _i1rtht9p;
import 'package:careflow_client/src/protocol/lab_test.dart' as _ikkvx3xq;
import 'package:careflow_client/src/protocol/patient.dart' as _ipgm6jop;
import 'package:careflow_client/src/protocol/pharmacy_order.dart' as _iqy1pqxu;
import 'package:careflow_client/src/protocol/prescription.dart' as _iw0f4dv9;
import 'package:careflow_client/src/protocol/prescription_item.dart'
    as _izfgdvfm;
import 'package:careflow_client/src/protocol/queue_entry.dart' as _ird1jsbp;
import 'package:careflow_client/src/protocol/triage_response.dart' as _igqqr7s4;
import 'package:careflow_client/src/protocol/user.dart' as _igy10un9;
import 'package:http/http.dart' as _i85jenna;
import 'package:serverpod_auth_core_client/serverpod_auth_core_client.dart'
    as _iacc;
import 'package:serverpod_auth_idp_client/serverpod_auth_idp_client.dart'
    as _iaic;
import 'package:serverpod_client/serverpod_client.dart' as _isc;
import 'protocol.dart' as _il2as5qe;

/// By extending [EmailOtpIdpBaseEndpoint], the email identity provider
/// endpoints, including the passwordless sign-in with one-time passwords, are
/// made available on the server and enable the corresponding sign-in widget on
/// the client.
///
/// Extend [EmailIdpBaseEndpoint] instead for the password based sign-in only.
/// {@category Endpoint}
class EndpointEmailIdp extends _iaic.EndpointEmailOtpIdpBase {
  EndpointEmailIdp(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'emailIdp';

  /// Starts a passwordless login by sending a one-time password to [email].
  ///
  /// The code is sent whether or not an account is registered for the email.
  /// If none is, verifying the code lets the user create a new account.
  ///
  /// Always returns a login request ID, which must be passed to
  /// [verifyOtpLoginCode] together with the one-time password.
  ///
  /// Throws an [EmailAccountRequestException] in case of errors, with reason:
  /// - [EmailAccountRequestExceptionReason.policyViolation] if the email is
  ///   not valid.
  /// - [EmailAccountRequestExceptionReason.tooManyAttempts] if too many
  ///   one-time passwords have been requested for the email.
  @override
  _ida.Future<_isc.UuidValue> startOtpLogin({required String email}) =>
      caller.callServerEndpoint<_isc.UuidValue>(
        'emailIdp',
        'startOtpLogin',
        {'email': email},
      );

  /// Verifies a one-time password and returns a token to complete the login.
  ///
  /// If [EmailAccountOtpVerificationResult.accountExists] is `true`, pass the
  /// token to [finishOtpLogin] to sign in. Otherwise, have the user accept the
  /// terms (and optionally set a password if
  /// [EmailAccountOtpVerificationResult.allowPassword] is `true`) and pass it
  /// to [finishOtpRegistration] to create the account.
  ///
  /// Throws an [EmailAccountRequestException] in case of errors, with reason:
  /// - [EmailAccountRequestExceptionReason.expired] if the login request has
  ///   already expired.
  /// - [EmailAccountRequestExceptionReason.tooManyAttempts] if the user has
  ///   made too many attempts to verify the code.
  /// - [EmailAccountRequestExceptionReason.invalid] if no request exists for
  ///   the given [otpLoginRequestId] or [verificationCode] is invalid.
  @override
  _ida.Future<_iaic.EmailAccountOtpVerificationResult> verifyOtpLoginCode({
    required _isc.UuidValue otpLoginRequestId,
    required String verificationCode,
  }) => caller.callServerEndpoint<_iaic.EmailAccountOtpVerificationResult>(
    'emailIdp',
    'verifyOtpLoginCode',
    {
      'otpLoginRequestId': otpLoginRequestId,
      'verificationCode': verificationCode,
    },
  );

  /// Completes a passwordless login for an existing account and returns a new
  /// session.
  ///
  /// Throws an [EmailAccountRequestException] in case of errors, with reason:
  /// - [EmailAccountRequestExceptionReason.expired] if the login request has
  ///   already expired.
  /// - [EmailAccountRequestExceptionReason.invalid] if the [otpLoginToken] is
  ///   invalid or no account exists for the email.
  ///
  /// Throws an [AuthUserBlockedException] if the auth user is blocked.
  @override
  _ida.Future<_iacc.AuthSuccess> finishOtpLogin({
    required String otpLoginToken,
  }) => caller.callServerEndpoint<_iacc.AuthSuccess>(
    'emailIdp',
    'finishOtpLogin',
    {'otpLoginToken': otpLoginToken},
  );

  /// Completes a passwordless login for an email without an account, by
  /// creating a new auth user with a profile and attaching the verified email
  /// to it.
  ///
  /// Must only be called after the user accepted the terms. The [password] is
  /// optional, and may only be set if
  /// [EmailAccountOtpVerificationResult.allowPassword] was `true`.
  ///
  /// Throws an [EmailAccountRequestException] in case of errors, with reason:
  /// - [EmailAccountRequestExceptionReason.expired] if the login request has
  ///   already expired.
  /// - [EmailAccountRequestExceptionReason.policyViolation] if a password is
  ///   given but not allowed, or it does not comply with the password policy.
  /// - [EmailAccountRequestExceptionReason.invalid] if the [otpLoginToken] is
  ///   invalid or an account already exists for the email.
  ///
  /// Returns a session for the newly created user.
  @override
  _ida.Future<_iacc.AuthSuccess> finishOtpRegistration({
    required String otpLoginToken,
    String? password,
  }) => caller.callServerEndpoint<_iacc.AuthSuccess>(
    'emailIdp',
    'finishOtpRegistration',
    {
      'otpLoginToken': otpLoginToken,
      'password': password,
    },
  );

  /// Logs in the user and returns a new session.
  ///
  /// Throws an [EmailAccountLoginException] in case of errors, with reason:
  /// - [EmailAccountLoginExceptionReason.invalidCredentials] if the email or
  ///   password is incorrect.
  /// - [EmailAccountLoginExceptionReason.tooManyAttempts] if there have been
  ///   too many failed login attempts.
  ///
  /// Throws an [AuthUserBlockedException] if the auth user is blocked.
  @override
  _ida.Future<_iacc.AuthSuccess> login({
    required String email,
    required String password,
  }) => caller.callServerEndpoint<_iacc.AuthSuccess>(
    'emailIdp',
    'login',
    {
      'email': email,
      'password': password,
    },
  );

  /// Starts the registration for a new user account with an email-based login
  /// associated to it.
  ///
  /// Upon successful completion of this method, an email will have been
  /// sent to [email] with a verification link, which the user must open to
  /// complete the registration.
  ///
  /// Always returns a account request ID, which can be used to complete the
  /// registration. If the email is already registered, the returned ID will not
  /// be valid.
  @override
  _ida.Future<_isc.UuidValue> startRegistration({required String email}) =>
      caller.callServerEndpoint<_isc.UuidValue>(
        'emailIdp',
        'startRegistration',
        {'email': email},
      );

  /// Verifies an account request code and returns a token
  /// that can be used to complete the account creation.
  ///
  /// Throws an [EmailAccountRequestException] in case of errors, with reason:
  /// - [EmailAccountRequestExceptionReason.expired] if the account request has
  ///   already expired.
  /// - [EmailAccountRequestExceptionReason.policyViolation] if the password
  ///   does not comply with the password policy.
  /// - [EmailAccountRequestExceptionReason.invalid] if no request exists
  ///   for the given [accountRequestId] or [verificationCode] is invalid.
  @override
  _ida.Future<String> verifyRegistrationCode({
    required _isc.UuidValue accountRequestId,
    required String verificationCode,
  }) => caller.callServerEndpoint<String>(
    'emailIdp',
    'verifyRegistrationCode',
    {
      'accountRequestId': accountRequestId,
      'verificationCode': verificationCode,
    },
  );

  /// Completes a new account registration, creating a new auth user with a
  /// profile and attaching the given email account to it.
  ///
  /// Throws an [EmailAccountRequestException] in case of errors, with reason:
  /// - [EmailAccountRequestExceptionReason.expired] if the account request has
  ///   already expired.
  /// - [EmailAccountRequestExceptionReason.policyViolation] if the password
  ///   does not comply with the password policy.
  /// - [EmailAccountRequestExceptionReason.invalid] if the [registrationToken]
  ///   is invalid.
  ///
  /// Throws an [AuthUserBlockedException] if the auth user is blocked.
  ///
  /// Returns a session for the newly created user.
  @override
  _ida.Future<_iacc.AuthSuccess> finishRegistration({
    required String registrationToken,
    required String password,
  }) => caller.callServerEndpoint<_iacc.AuthSuccess>(
    'emailIdp',
    'finishRegistration',
    {
      'registrationToken': registrationToken,
      'password': password,
    },
  );

  /// Requests a password reset for [email].
  ///
  /// If the email address is registered, an email with reset instructions will
  /// be send out. If the email is unknown, this method will have no effect.
  ///
  /// Always returns a password reset request ID, which can be used to complete
  /// the reset. If the email is not registered, the returned ID will not be
  /// valid.
  ///
  /// Throws an [EmailAccountPasswordResetException] in case of errors, with reason:
  /// - [EmailAccountPasswordResetExceptionReason.tooManyAttempts] if the user has
  ///   made too many attempts trying to request a password reset.
  ///
  @override
  _ida.Future<_isc.UuidValue> startPasswordReset({required String email}) =>
      caller.callServerEndpoint<_isc.UuidValue>(
        'emailIdp',
        'startPasswordReset',
        {'email': email},
      );

  /// Verifies a password reset code and returns a finishPasswordResetToken
  /// that can be used to finish the password reset.
  ///
  /// Throws an [EmailAccountPasswordResetException] in case of errors, with reason:
  /// - [EmailAccountPasswordResetExceptionReason.expired] if the password reset
  ///   request has already expired.
  /// - [EmailAccountPasswordResetExceptionReason.tooManyAttempts] if the user has
  ///   made too many attempts trying to verify the password reset.
  /// - [EmailAccountPasswordResetExceptionReason.invalid] if no request exists
  ///   for the given [passwordResetRequestId] or [verificationCode] is invalid.
  ///
  /// If multiple steps are required to complete the password reset, this endpoint
  /// should be overridden to return credentials for the next step instead
  /// of the credentials for setting the password.
  @override
  _ida.Future<String> verifyPasswordResetCode({
    required _isc.UuidValue passwordResetRequestId,
    required String verificationCode,
  }) => caller.callServerEndpoint<String>(
    'emailIdp',
    'verifyPasswordResetCode',
    {
      'passwordResetRequestId': passwordResetRequestId,
      'verificationCode': verificationCode,
    },
  );

  /// Completes a password reset request by setting a new password.
  ///
  /// The [verificationCode] returned from [verifyPasswordResetCode] is used to
  /// validate the password reset request.
  ///
  /// Throws an [EmailAccountPasswordResetException] in case of errors, with reason:
  /// - [EmailAccountPasswordResetExceptionReason.expired] if the password reset
  ///   request has already expired.
  /// - [EmailAccountPasswordResetExceptionReason.policyViolation] if the new
  ///   password does not comply with the password policy.
  /// - [EmailAccountPasswordResetExceptionReason.invalid] if no request exists
  ///   for the given [passwordResetRequestId] or [verificationCode] is invalid.
  ///
  /// Throws an [AuthUserBlockedException] if the auth user is blocked.
  @override
  _ida.Future<void> finishPasswordReset({
    required String finishPasswordResetToken,
    required String newPassword,
  }) => caller.callServerEndpoint<void>(
    'emailIdp',
    'finishPasswordReset',
    {
      'finishPasswordResetToken': finishPasswordResetToken,
      'newPassword': newPassword,
    },
  );

  @override
  _ida.Future<bool> hasAccount() => caller.callServerEndpoint<bool>(
    'emailIdp',
    'hasAccount',
    {},
  );
}

/// By extending [RefreshJwtTokensEndpoint], the JWT token refresh endpoint
/// is made available on the server and enables automatic token refresh on the client.
/// {@category Endpoint}
class EndpointJwtRefresh extends _iacc.EndpointRefreshJwtTokens {
  EndpointJwtRefresh(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'jwtRefresh';

  /// Creates a new token pair for the given [refreshToken].
  ///
  /// If [refreshToken] is omitted, cookie-mode web clients fall back to the
  /// configured HttpOnly refresh cookie. When neither source is present this
  /// throws [RefreshTokenNotFoundException], the same public "no usable refresh
  /// credential" exception used for unknown refresh tokens.
  ///
  /// Can throw the following exceptions:
  /// -[RefreshTokenMalformedException]: refresh token is malformed and could
  ///   not be parsed. Not expected to happen for tokens issued by the server.
  /// -[RefreshTokenNotFoundException]: refresh token is unknown to the server.
  ///   Either the token was deleted or generated by a different server.
  /// -[RefreshTokenExpiredException]: refresh token has expired. Will happen
  ///   only if it has not been used within configured `refreshTokenLifetime`.
  /// -[RefreshTokenInvalidSecretException]: refresh token is incorrect, meaning
  ///   it does not refer to the current secret refresh token. This indicates
  ///   either a malfunctioning client or a malicious attempt by someone who has
  ///   obtained the refresh token. In this case the underlying refresh token
  ///   will be deleted, and access to it will expire fully when the last access
  ///   token is elapsed.
  ///
  /// This endpoint is unauthenticated, meaning the client won't include any
  /// authentication information with the call.
  @override
  _ida.Future<_iacc.AuthSuccess> refreshAccessToken({String? refreshToken}) =>
      caller.callServerEndpoint<_iacc.AuthSuccess>(
        'jwtRefresh',
        'refreshAccessToken',
        {'refreshToken': refreshToken},
        authenticated: false,
      );
}

/// Neural Crowd Forecasting, Digital Twin Simulation & AI Triage Endpoint
/// {@category Endpoint}
class EndpointAi extends _isc.EndpointRef {
  EndpointAi(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'ai';

  /// Hourly crowd forecast for OPD crowd management
  _ida.Future<List<_i6zyqkpk.CrowdForecast>> getCrowdForecast() =>
      caller.callServerEndpoint<List<_i6zyqkpk.CrowdForecast>>(
        'ai',
        'getCrowdForecast',
        {},
      );

  /// Digital Twin OPD simulation engine
  _ida.Future<_i7u5brv0.DigitalTwinResult> simulateDigitalTwin(
    double arrivalMultiplier,
    double doctorRatio,
    double triageEfficiency,
    double pharmacyThroughput,
  ) => caller.callServerEndpoint<_i7u5brv0.DigitalTwinResult>(
    'ai',
    'simulateDigitalTwin',
    {
      'arrivalMultiplier': arrivalMultiplier,
      'doctorRatio': doctorRatio,
      'triageEfficiency': triageEfficiency,
      'pharmacyThroughput': pharmacyThroughput,
    },
  );

  /// Multi-lingual symptom triage heuristic engine
  _ida.Future<_igqqr7s4.TriageResponse> triageSymptoms(
    String symptoms,
    String language,
  ) => caller.callServerEndpoint<_igqqr7s4.TriageResponse>(
    'ai',
    'triageSymptoms',
    {
      'symptoms': symptoms,
      'language': language,
    },
  );
}

/// Hospital Command & Executive Analytics Endpoint
/// {@category Endpoint}
class EndpointAnalytics extends _isc.EndpointRef {
  EndpointAnalytics(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'analytics';

  /// Overall hospital OPD overview stats
  _ida.Future<Map<String, dynamic>> getHospitalOverview() =>
      caller.callServerEndpoint<Map<String, dynamic>>(
        'analytics',
        'getHospitalOverview',
        {},
      );
}

/// Outpatient Appointments Scheduling Endpoint
/// {@category Endpoint}
class EndpointAppointment extends _isc.EndpointRef {
  EndpointAppointment(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'appointment';

  /// Book a new OPD appointment
  _ida.Future<_i8r8tmrd.Appointment> bookAppointment(
    int patientId,
    int departmentId,
    DateTime appointmentDate,
    String timeSlot, {
    int? doctorId,
    String? reason,
    String? symptoms,
  }) => caller.callServerEndpoint<_i8r8tmrd.Appointment>(
    'appointment',
    'bookAppointment',
    {
      'patientId': patientId,
      'departmentId': departmentId,
      'appointmentDate': appointmentDate,
      'timeSlot': timeSlot,
      'doctorId': doctorId,
      'reason': reason,
      'symptoms': symptoms,
    },
  );

  /// List appointments (optional patient or department filter)
  _ida.Future<List<_i8r8tmrd.Appointment>> getAppointments({
    int? patientId,
    int? departmentId,
  }) => caller.callServerEndpoint<List<_i8r8tmrd.Appointment>>(
    'appointment',
    'getAppointments',
    {
      'patientId': patientId,
      'departmentId': departmentId,
    },
  );

  /// Update appointment status (checked_in, completed, cancelled)
  _ida.Future<_i8r8tmrd.Appointment> updateStatus(
    int appointmentId,
    String status,
  ) => caller.callServerEndpoint<_i8r8tmrd.Appointment>(
    'appointment',
    'updateStatus',
    {
      'appointmentId': appointmentId,
      'status': status,
    },
  );
}

/// Doctor Consultation, Prescriptions & Cross-Role Sync Endpoint
/// {@category Endpoint}
class EndpointConsultation extends _isc.EndpointRef {
  EndpointConsultation(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'consultation';

  /// Record consultation note with automated cross-role sync to Pharmacy & Laboratory
  _ida.Future<_ipmvdjgv.Consultation> createConsultation(
    int patientId,
    int doctorId,
    int departmentId,
    String chiefComplaints,
    String diagnosis, {
    int? queueId,
    String? clinicalObservations,
    String? bp,
    String? pulse,
    String? temperature,
    String? spO2,
    String? weight,
    String? clinicalNotes,
    DateTime? followUpDate,
    List<String>? prescribedMedicines,
    List<String>? orderedLabTests,
  }) => caller.callServerEndpoint<_ipmvdjgv.Consultation>(
    'consultation',
    'createConsultation',
    {
      'patientId': patientId,
      'doctorId': doctorId,
      'departmentId': departmentId,
      'chiefComplaints': chiefComplaints,
      'diagnosis': diagnosis,
      'queueId': queueId,
      'clinicalObservations': clinicalObservations,
      'bp': bp,
      'pulse': pulse,
      'temperature': temperature,
      'spO2': spO2,
      'weight': weight,
      'clinicalNotes': clinicalNotes,
      'followUpDate': followUpDate,
      'prescribedMedicines': prescribedMedicines,
      'orderedLabTests': orderedLabTests,
    },
  );

  /// Get consultation history
  _ida.Future<List<_ipmvdjgv.Consultation>> getConsultations({
    int? patientId,
    int? doctorId,
  }) => caller.callServerEndpoint<List<_ipmvdjgv.Consultation>>(
    'consultation',
    'getConsultations',
    {
      'patientId': patientId,
      'doctorId': doctorId,
    },
  );
}

/// Clinical Departments Management Endpoint
/// {@category Endpoint}
class EndpointDepartment extends _isc.EndpointRef {
  EndpointDepartment(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'department';

  /// List all active clinical departments
  _ida.Future<List<_imuk960z.Department>> getDepartments() =>
      caller.callServerEndpoint<List<_imuk960z.Department>>(
        'department',
        'getDepartments',
        {},
      );

  /// Get specific department by ID
  _ida.Future<_imuk960z.Department?> getDepartmentById(int id) =>
      caller.callServerEndpoint<_imuk960z.Department?>(
        'department',
        'getDepartmentById',
        {'id': id},
      );

  /// Create a new department
  _ida.Future<_imuk960z.Department> createDepartment(
    String name,
    String code, {
    String? description,
    String? floor,
    int? maxDailyCapacity,
  }) => caller.callServerEndpoint<_imuk960z.Department>(
    'department',
    'createDepartment',
    {
      'name': name,
      'code': code,
      'description': description,
      'floor': floor,
      'maxDailyCapacity': maxDailyCapacity,
    },
  );
}

/// Doctor Directory, Roster & Availability Endpoint
/// {@category Endpoint}
class EndpointDoctor extends _isc.EndpointRef {
  EndpointDoctor(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'doctor';

  /// List all active doctors (optional department filter)
  _ida.Future<List<_inlv8cw0.Doctor>> getDoctors({int? departmentId}) =>
      caller.callServerEndpoint<List<_inlv8cw0.Doctor>>(
        'doctor',
        'getDoctors',
        {'departmentId': departmentId},
      );

  /// Get specific doctor by ID
  _ida.Future<_inlv8cw0.Doctor?> getDoctorById(int id) =>
      caller.callServerEndpoint<_inlv8cw0.Doctor?>(
        'doctor',
        'getDoctorById',
        {'id': id},
      );

  /// Update doctor availability (e.g. in consultation, on break, shift ended)
  _ida.Future<_inlv8cw0.Doctor> updateAvailability(
    int doctorId,
    bool isAvailable,
  ) => caller.callServerEndpoint<_inlv8cw0.Doctor>(
    'doctor',
    'updateAvailability',
    {
      'doctorId': doctorId,
      'isAvailable': isAvailable,
    },
  );
}

/// Patient Voice & Grievance Redressal Endpoint
/// {@category Endpoint}
class EndpointFeedback extends _isc.EndpointRef {
  EndpointFeedback(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'feedback';

  /// Submit patient feedback or grievance ticket
  _ida.Future<_i4mo3s1g.FeedbackEntry> submitFeedback(
    int rating,
    String category,
    String comments, {
    int? patientId,
    int? departmentId,
    int? doctorId,
    required bool isAnonymous,
  }) => caller.callServerEndpoint<_i4mo3s1g.FeedbackEntry>(
    'feedback',
    'submitFeedback',
    {
      'rating': rating,
      'category': category,
      'comments': comments,
      'patientId': patientId,
      'departmentId': departmentId,
      'doctorId': doctorId,
      'isAnonymous': isAnonymous,
    },
  );

  /// Track a grievance ticket by tracking ID
  _ida.Future<_i4mo3s1g.FeedbackEntry?> trackTicket(String ticketId) =>
      caller.callServerEndpoint<_i4mo3s1g.FeedbackEntry?>(
        'feedback',
        'trackTicket',
        {'ticketId': ticketId},
      );

  /// List all feedback records for hospital command admin
  _ida.Future<List<_i4mo3s1g.FeedbackEntry>> getAllFeedback() =>
      caller.callServerEndpoint<List<_i4mo3s1g.FeedbackEntry>>(
        'feedback',
        'getAllFeedback',
        {},
      );
}

/// Clinical Diagnostics & Pathology/Radiology Laboratory Endpoint
/// {@category Endpoint}
class EndpointLaboratory extends _isc.EndpointRef {
  EndpointLaboratory(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'laboratory';

  /// Fetch all laboratory test requests (optional status/category filter)
  _ida.Future<List<_ikkvx3xq.LabTest>> getTests({
    String? status,
    String? category,
  }) => caller.callServerEndpoint<List<_ikkvx3xq.LabTest>>(
    'laboratory',
    'getTests',
    {
      'status': status,
      'category': category,
    },
  );

  /// Create a new lab test order
  _ida.Future<_ikkvx3xq.LabTest> createTest(
    int patientId,
    int doctorId,
    String testName, {
    int? consultationId,
    String? testCategory,
    String? priority,
  }) => caller.callServerEndpoint<_ikkvx3xq.LabTest>(
    'laboratory',
    'createTest',
    {
      'patientId': patientId,
      'doctorId': doctorId,
      'testName': testName,
      'consultationId': consultationId,
      'testCategory': testCategory,
      'priority': priority,
    },
  );

  /// Update laboratory test status (e.g. sample_collected, in_progress, completed)
  _ida.Future<_ikkvx3xq.LabTest> updateTestStatus(
    int testId,
    String status, {
    String? resultSummary,
    String? reportUrl,
  }) => caller.callServerEndpoint<_ikkvx3xq.LabTest>(
    'laboratory',
    'updateTestStatus',
    {
      'testId': testId,
      'status': status,
      'resultSummary': resultSummary,
      'reportUrl': reportUrl,
    },
  );
}

/// System Alerts & Push Notifications Endpoint
/// {@category Endpoint}
class EndpointNotification extends _isc.EndpointRef {
  EndpointNotification(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'notification';

  /// Fetch notifications for an authenticated user
  _ida.Future<List<_iq6m8chv.AppNotification>> getNotifications(int userId) =>
      caller.callServerEndpoint<List<_iq6m8chv.AppNotification>>(
        'notification',
        'getNotifications',
        {'userId': userId},
      );

  /// Send a notification to a specific user
  _ida.Future<_iq6m8chv.AppNotification> sendNotification(
    int recipientUserId,
    String title,
    String message, {
    String? type,
    String? tokenNumber,
    String? department,
    String? urgency,
  }) => caller.callServerEndpoint<_iq6m8chv.AppNotification>(
    'notification',
    'sendNotification',
    {
      'recipientUserId': recipientUserId,
      'title': title,
      'message': message,
      'type': type,
      'tokenNumber': tokenNumber,
      'department': department,
      'urgency': urgency,
    },
  );

  /// Mark single notification as read
  _ida.Future<_iq6m8chv.AppNotification> markAsRead(int notificationId) =>
      caller.callServerEndpoint<_iq6m8chv.AppNotification>(
        'notification',
        'markAsRead',
        {'notificationId': notificationId},
      );
}

/// Patient Records & Medical Profile Endpoint
/// {@category Endpoint}
class EndpointPatient extends _isc.EndpointRef {
  EndpointPatient(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'patient';

  /// Search or list registered patients
  _ida.Future<List<_ipgm6jop.Patient>> getPatients({String? search}) =>
      caller.callServerEndpoint<List<_ipgm6jop.Patient>>(
        'patient',
        'getPatients',
        {'search': search},
      );

  /// Get patient by ID
  _ida.Future<_ipgm6jop.Patient?> getPatientById(int id) =>
      caller.callServerEndpoint<_ipgm6jop.Patient?>(
        'patient',
        'getPatientById',
        {'id': id},
      );

  /// Get patient by patientId string (e.g. "PT-10001")
  _ida.Future<_ipgm6jop.Patient?> getPatientByPatientId(String patientId) =>
      caller.callServerEndpoint<_ipgm6jop.Patient?>(
        'patient',
        'getPatientByPatientId',
        {'patientId': patientId},
      );

  /// Register patient profile
  _ida.Future<_ipgm6jop.Patient> createPatient(
    int userId,
    String patientId, {
    int? age,
    String? gender,
    String? bloodGroup,
    String? abhaId,
    String? emergencyContactName,
    String? emergencyContactPhone,
    String? address,
  }) => caller.callServerEndpoint<_ipgm6jop.Patient>(
    'patient',
    'createPatient',
    {
      'userId': userId,
      'patientId': patientId,
      'age': age,
      'gender': gender,
      'bloodGroup': bloodGroup,
      'abhaId': abhaId,
      'emergencyContactName': emergencyContactName,
      'emergencyContactPhone': emergencyContactPhone,
      'address': address,
    },
  );
}

/// Jan Aushadhi Pharmacy Counter & Dispensary Endpoint
/// {@category Endpoint}
class EndpointPharmacy extends _isc.EndpointRef {
  EndpointPharmacy(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'pharmacy';

  /// Fetch all pharmacy dispensing orders
  _ida.Future<List<_iqy1pqxu.PharmacyOrder>> getOrders({String? status}) =>
      caller.callServerEndpoint<List<_iqy1pqxu.PharmacyOrder>>(
        'pharmacy',
        'getOrders',
        {'status': status},
      );

  /// Update pharmacy order status (e.g. processing, dispensed)
  _ida.Future<_iqy1pqxu.PharmacyOrder> updateOrderStatus(
    int orderId,
    String status,
  ) => caller.callServerEndpoint<_iqy1pqxu.PharmacyOrder>(
    'pharmacy',
    'updateOrderStatus',
    {
      'orderId': orderId,
      'status': status,
    },
  );
}

/// Digital Prescriptions & Jan Aushadhi Dispensing Endpoint
/// {@category Endpoint}
class EndpointPrescription extends _isc.EndpointRef {
  EndpointPrescription(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'prescription';

  /// Fetch prescriptions (optional patient or status filter)
  _ida.Future<List<_iw0f4dv9.Prescription>> getPrescriptions({
    int? patientId,
    String? status,
  }) => caller.callServerEndpoint<List<_iw0f4dv9.Prescription>>(
    'prescription',
    'getPrescriptions',
    {
      'patientId': patientId,
      'status': status,
    },
  );

  /// Get prescription items for a prescription
  _ida.Future<List<_izfgdvfm.PrescriptionItem>> getPrescriptionItems(
    int prescriptionId,
  ) => caller.callServerEndpoint<List<_izfgdvfm.PrescriptionItem>>(
    'prescription',
    'getPrescriptionItems',
    {'prescriptionId': prescriptionId},
  );

  /// Update prescription status (pending_pharmacy, dispensed, etc.)
  _ida.Future<_iw0f4dv9.Prescription> updateStatus(
    int prescriptionId,
    String status,
  ) => caller.callServerEndpoint<_iw0f4dv9.Prescription>(
    'prescription',
    'updateStatus',
    {
      'prescriptionId': prescriptionId,
      'status': status,
    },
  );
}

/// OPD Queue Management, Token Generation & Reception Re-entry Endpoint
/// {@category Endpoint}
class EndpointQueue extends _isc.EndpointRef {
  EndpointQueue(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'queue';

  /// Fetch all active queue tokens (optional department/status filter)
  _ida.Future<List<_ird1jsbp.QueueEntry>> getTokens({
    String? department,
    String? status,
  }) => caller.callServerEndpoint<List<_ird1jsbp.QueueEntry>>(
    'queue',
    'getTokens',
    {
      'department': department,
      'status': status,
    },
  );

  /// Get specific token by token number e.g. "OPD-104"
  _ida.Future<_ird1jsbp.QueueEntry?> getTokenByNumber(String tokenNumber) =>
      caller.callServerEndpoint<_ird1jsbp.QueueEntry?>(
        'queue',
        'getTokenByNumber',
        {'tokenNumber': tokenNumber},
      );

  /// Check live doctor capacity, remaining OPD time, and buffer limits
  _ida.Future<_i91lt1r1.DoctorCapacity> checkDoctorCapacity(int doctorId) =>
      caller.callServerEndpoint<_i91lt1r1.DoctorCapacity>(
        'queue',
        'checkDoctorCapacity',
        {'doctorId': doctorId},
      );

  /// Generate a digital OPD queue token
  _ida.Future<_ird1jsbp.QueueEntry> generateToken(
    int patientId,
    int departmentId, {
    int? doctorId,
    String? triageLevel,
    String? symptoms,
    String? priority,
  }) => caller.callServerEndpoint<_ird1jsbp.QueueEntry>(
    'queue',
    'generateToken',
    {
      'patientId': patientId,
      'departmentId': departmentId,
      'doctorId': doctorId,
      'triageLevel': triageLevel,
      'symptoms': symptoms,
      'priority': priority,
    },
  );

  /// Call next patient into consultation room (Emergency > Senior > Normal)
  _ida.Future<_ird1jsbp.QueueEntry?> callNext(
    int departmentId, {
    int? doctorId,
  }) => caller.callServerEndpoint<_ird1jsbp.QueueEntry?>(
    'queue',
    'callNext',
    {
      'departmentId': departmentId,
      'doctorId': doctorId,
    },
  );

  /// Skip a patient (moves them to separate Skipped queue)
  _ida.Future<_ird1jsbp.QueueEntry> skipPatient(
    int queueId, {
    String? reason,
  }) => caller.callServerEndpoint<_ird1jsbp.QueueEntry>(
    'queue',
    'skipPatient',
    {
      'queueId': queueId,
      'reason': reason,
    },
  );

  /// Reception Physical Re-entry with THREE-PLACE PENALTY
  _ida.Future<_ird1jsbp.QueueEntry> rejoinPatient(
    String tokenNumber, {
    int? staffId,
  }) => caller.callServerEndpoint<_ird1jsbp.QueueEntry>(
    'queue',
    'rejoinPatient',
    {
      'tokenNumber': tokenNumber,
      'staffId': staffId,
    },
  );

  /// Get all skipped patients awaiting reception check-in
  _ida.Future<List<_ird1jsbp.QueueEntry>> getSkippedTokens({
    int? departmentId,
  }) => caller.callServerEndpoint<List<_ird1jsbp.QueueEntry>>(
    'queue',
    'getSkippedTokens',
    {'departmentId': departmentId},
  );

  /// Update general queue token status
  _ida.Future<_ird1jsbp.QueueEntry> updateStatus(
    int queueId,
    String status,
  ) => caller.callServerEndpoint<_ird1jsbp.QueueEntry>(
    'queue',
    'updateStatus',
    {
      'queueId': queueId,
      'status': status,
    },
  );
}

/// Hospital Equipment, Beds & Critical Resources Endpoint
/// {@category Endpoint}
class EndpointResource extends _isc.EndpointRef {
  EndpointResource(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'resource';

  /// List hospital resources (e.g. beds, ventilators, wheelchairs, oxygen)
  _ida.Future<List<_i1rtht9p.HospitalResource>> getResources({String? type}) =>
      caller.callServerEndpoint<List<_i1rtht9p.HospitalResource>>(
        'resource',
        'getResources',
        {'type': type},
      );

  /// Update resource operational status (available, occupied, maintenance)
  _ida.Future<_i1rtht9p.HospitalResource> updateStatus(
    int resourceId,
    String status,
  ) => caller.callServerEndpoint<_i1rtht9p.HospitalResource>(
    'resource',
    'updateStatus',
    {
      'resourceId': resourceId,
      'status': status,
    },
  );
}

/// User Authentication & Role-Based Access Endpoint
/// {@category Endpoint}
class EndpointUserAuth extends _isc.EndpointRef {
  EndpointUserAuth(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'userAuth';

  /// Standard user login verifying credentials against database
  _ida.Future<_imy9z9a5.AuthResponse> login(
    String email,
    String password,
  ) => caller.callServerEndpoint<_imy9z9a5.AuthResponse>(
    'userAuth',
    'login',
    {
      'email': email,
      'password': password,
    },
  );

  /// Patient & User Registration
  _ida.Future<_imy9z9a5.AuthResponse> register(
    String name,
    String email,
    String phone,
    String password,
    String role, {
    String? abhaId,
    int? age,
    String? gender,
  }) => caller.callServerEndpoint<_imy9z9a5.AuthResponse>(
    'userAuth',
    'register',
    {
      'name': name,
      'email': email,
      'phone': phone,
      'password': password,
      'role': role,
      'abhaId': abhaId,
      'age': age,
      'gender': gender,
    },
  );

  /// Doctor clearance PIN verification (Hospital standard: 7788)
  _ida.Future<bool> verifyDoctorPin(String pin) =>
      caller.callServerEndpoint<bool>(
        'userAuth',
        'verifyDoctorPin',
        {'pin': pin},
      );

  /// Get current user profile
  _ida.Future<_igy10un9.User?> getCurrentUser(int userId) =>
      caller.callServerEndpoint<_igy10un9.User?>(
        'userAuth',
        'getCurrentUser',
        {'userId': userId},
      );

  /// Request password reset
  _ida.Future<bool> forgotPassword(String email) =>
      caller.callServerEndpoint<bool>(
        'userAuth',
        'forgotPassword',
        {'email': email},
      );
}

/// This is an example endpoint that returns a greeting message through
/// its [hello] method.
/// {@category Endpoint}
class EndpointGreeting extends _isc.EndpointRef {
  EndpointGreeting(_isc.EndpointCaller caller) : super(caller);

  @override
  String get name => 'greeting';

  /// Returns a personalized greeting message: "Hello {name}".
  _ida.Future<_i496uthb.Greeting> hello(String name) =>
      caller.callServerEndpoint<_i496uthb.Greeting>(
        'greeting',
        'hello',
        {'name': name},
      );
}

class Modules {
  Modules(Client client) {
    serverpod_auth_idp = _iaic.Caller(client);
    serverpod_auth_core = _iacc.Caller(client);
  }

  late final _iaic.Caller serverpod_auth_idp;

  late final _iacc.Caller serverpod_auth_core;
}

class Client extends _isc.ServerpodClientShared {
  Client(
    String host, {
    dynamic securityContext,
    Duration? streamingConnectionTimeout,
    Duration? connectionTimeout,
    Function(
      _isc.MethodCallContext,
      Object,
      StackTrace,
    )?
    onFailedCall,
    Function(_isc.MethodCallContext)? onSucceededCall,
    bool? disconnectStreamsOnLostInternetConnection,
    _i85jenna.Client? httpClientOverride,
  }) : super(
         host,
         _il2as5qe.Protocol(),
         securityContext: securityContext,
         streamingConnectionTimeout: streamingConnectionTimeout,
         connectionTimeout: connectionTimeout,
         onFailedCall: onFailedCall,
         onSucceededCall: onSucceededCall,
         disconnectStreamsOnLostInternetConnection:
             disconnectStreamsOnLostInternetConnection,
         httpClientOverride: httpClientOverride,
       ) {
    emailIdp = EndpointEmailIdp(this);
    jwtRefresh = EndpointJwtRefresh(this);
    ai = EndpointAi(this);
    analytics = EndpointAnalytics(this);
    appointment = EndpointAppointment(this);
    consultation = EndpointConsultation(this);
    department = EndpointDepartment(this);
    doctor = EndpointDoctor(this);
    feedback = EndpointFeedback(this);
    laboratory = EndpointLaboratory(this);
    notification = EndpointNotification(this);
    patient = EndpointPatient(this);
    pharmacy = EndpointPharmacy(this);
    prescription = EndpointPrescription(this);
    queue = EndpointQueue(this);
    resource = EndpointResource(this);
    userAuth = EndpointUserAuth(this);
    greeting = EndpointGreeting(this);
    modules = Modules(this);
  }

  late final EndpointEmailIdp emailIdp;

  late final EndpointJwtRefresh jwtRefresh;

  late final EndpointAi ai;

  late final EndpointAnalytics analytics;

  late final EndpointAppointment appointment;

  late final EndpointConsultation consultation;

  late final EndpointDepartment department;

  late final EndpointDoctor doctor;

  late final EndpointFeedback feedback;

  late final EndpointLaboratory laboratory;

  late final EndpointNotification notification;

  late final EndpointPatient patient;

  late final EndpointPharmacy pharmacy;

  late final EndpointPrescription prescription;

  late final EndpointQueue queue;

  late final EndpointResource resource;

  late final EndpointUserAuth userAuth;

  late final EndpointGreeting greeting;

  late final Modules modules;

  @override
  Map<String, _isc.EndpointRef> get endpointRefLookup => {
    'emailIdp': emailIdp,
    'jwtRefresh': jwtRefresh,
    'ai': ai,
    'analytics': analytics,
    'appointment': appointment,
    'consultation': consultation,
    'department': department,
    'doctor': doctor,
    'feedback': feedback,
    'laboratory': laboratory,
    'notification': notification,
    'patient': patient,
    'pharmacy': pharmacy,
    'prescription': prescription,
    'queue': queue,
    'resource': resource,
    'userAuth': userAuth,
    'greeting': greeting,
  };

  @override
  Map<String, _isc.ModuleEndpointCaller> get moduleLookup => {
    'serverpod_auth_idp': modules.serverpod_auth_idp,
    'serverpod_auth_core': modules.serverpod_auth_core,
  };
}

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
import 'package:serverpod/serverpod.dart' as _is;
import 'package:serverpod_auth_core_server/serverpod_auth_core_server.dart'
    as _iacs;
import 'package:serverpod_auth_idp_server/serverpod_auth_idp_server.dart'
    as _iais;
import '../auth/email_idp_endpoint.dart' as _iuc1hd5t;
import '../auth/jwt_refresh_endpoint.dart' as _inwq3ztq;
import '../endpoints/ai_endpoint.dart' as _igsjf4zh;
import '../endpoints/analytics_endpoint.dart' as _ibbhv9ku;
import '../endpoints/appointment_endpoint.dart' as _ivwn3vsl;
import '../endpoints/consultation_endpoint.dart' as _islc93r6;
import '../endpoints/department_endpoint.dart' as _il7z9g4u;
import '../endpoints/doctor_endpoint.dart' as _igqfxzjr;
import '../endpoints/feedback_endpoint.dart' as _iebcplle;
import '../endpoints/laboratory_endpoint.dart' as _ig853fd2;
import '../endpoints/notification_endpoint.dart' as _ihb11yhk;
import '../endpoints/patient_endpoint.dart' as _iq9ib001;
import '../endpoints/pharmacy_endpoint.dart' as _iaijkc9d;
import '../endpoints/prescription_endpoint.dart' as _ir96hk1b;
import '../endpoints/queue_endpoint.dart' as _iu1irfsk;
import '../endpoints/resource_endpoint.dart' as _i7u1ocs5;
import '../endpoints/user_auth_endpoint.dart' as _iaac3hit;
import '../greetings/greeting_endpoint.dart' as _il624ik7;

class Endpoints extends _is.EndpointDispatch {
  @override
  void initializeEndpoints(_is.Server server) {
    initializeOwnEndpoints(server);
    modules['serverpod_auth_idp'] = _iais.Endpoints()
      ..initializeOwnEndpoints(server);
    modules['serverpod_auth_core'] = _iacs.Endpoints()
      ..initializeOwnEndpoints(server);
  }

  @override
  void initializeOwnEndpoints(_is.Server server) {
    var endpoints = <String, _is.Endpoint>{
      'emailIdp': _iuc1hd5t.EmailIdpEndpoint()
        ..initialize(
          server,
          'emailIdp',
          null,
        ),
      'jwtRefresh': _inwq3ztq.JwtRefreshEndpoint()
        ..initialize(
          server,
          'jwtRefresh',
          null,
        ),
      'ai': _igsjf4zh.AiEndpoint()
        ..initialize(
          server,
          'ai',
          null,
        ),
      'analytics': _ibbhv9ku.AnalyticsEndpoint()
        ..initialize(
          server,
          'analytics',
          null,
        ),
      'appointment': _ivwn3vsl.AppointmentEndpoint()
        ..initialize(
          server,
          'appointment',
          null,
        ),
      'consultation': _islc93r6.ConsultationEndpoint()
        ..initialize(
          server,
          'consultation',
          null,
        ),
      'department': _il7z9g4u.DepartmentEndpoint()
        ..initialize(
          server,
          'department',
          null,
        ),
      'doctor': _igqfxzjr.DoctorEndpoint()
        ..initialize(
          server,
          'doctor',
          null,
        ),
      'feedback': _iebcplle.FeedbackEndpoint()
        ..initialize(
          server,
          'feedback',
          null,
        ),
      'laboratory': _ig853fd2.LaboratoryEndpoint()
        ..initialize(
          server,
          'laboratory',
          null,
        ),
      'notification': _ihb11yhk.NotificationEndpoint()
        ..initialize(
          server,
          'notification',
          null,
        ),
      'patient': _iq9ib001.PatientEndpoint()
        ..initialize(
          server,
          'patient',
          null,
        ),
      'pharmacy': _iaijkc9d.PharmacyEndpoint()
        ..initialize(
          server,
          'pharmacy',
          null,
        ),
      'prescription': _ir96hk1b.PrescriptionEndpoint()
        ..initialize(
          server,
          'prescription',
          null,
        ),
      'queue': _iu1irfsk.QueueEndpoint()
        ..initialize(
          server,
          'queue',
          null,
        ),
      'resource': _i7u1ocs5.ResourceEndpoint()
        ..initialize(
          server,
          'resource',
          null,
        ),
      'userAuth': _iaac3hit.UserAuthEndpoint()
        ..initialize(
          server,
          'userAuth',
          null,
        ),
      'greeting': _il624ik7.GreetingEndpoint()
        ..initialize(
          server,
          'greeting',
          null,
        ),
    };
    connectors['emailIdp'] = _is.EndpointConnector(
      name: 'emailIdp',
      endpoint: endpoints['emailIdp']!,
      methodConnectors: {
        'startOtpLogin': _is.MethodConnector(
          name: 'startOtpLogin',
          params: {
            'email': _is.ParameterDescription(
              name: 'email',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .startOtpLogin(
                    session,
                    email: params['email'],
                  ),
        ),
        'verifyOtpLoginCode': _is.MethodConnector(
          name: 'verifyOtpLoginCode',
          params: {
            'otpLoginRequestId': _is.ParameterDescription(
              name: 'otpLoginRequestId',
              type: _is.getType<_is.UuidValue>(),
              nullable: false,
            ),
            'verificationCode': _is.ParameterDescription(
              name: 'verificationCode',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .verifyOtpLoginCode(
                    session,
                    otpLoginRequestId: params['otpLoginRequestId'],
                    verificationCode: params['verificationCode'],
                  ),
        ),
        'finishOtpLogin': _is.MethodConnector(
          name: 'finishOtpLogin',
          params: {
            'otpLoginToken': _is.ParameterDescription(
              name: 'otpLoginToken',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .finishOtpLogin(
                    session,
                    otpLoginToken: params['otpLoginToken'],
                  ),
        ),
        'finishOtpRegistration': _is.MethodConnector(
          name: 'finishOtpRegistration',
          params: {
            'otpLoginToken': _is.ParameterDescription(
              name: 'otpLoginToken',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'password': _is.ParameterDescription(
              name: 'password',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .finishOtpRegistration(
                    session,
                    otpLoginToken: params['otpLoginToken'],
                    password: params['password'],
                  ),
        ),
        'login': _is.MethodConnector(
          name: 'login',
          params: {
            'email': _is.ParameterDescription(
              name: 'email',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'password': _is.ParameterDescription(
              name: 'password',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint).login(
                    session,
                    email: params['email'],
                    password: params['password'],
                  ),
        ),
        'startRegistration': _is.MethodConnector(
          name: 'startRegistration',
          params: {
            'email': _is.ParameterDescription(
              name: 'email',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .startRegistration(
                    session,
                    email: params['email'],
                  ),
        ),
        'verifyRegistrationCode': _is.MethodConnector(
          name: 'verifyRegistrationCode',
          params: {
            'accountRequestId': _is.ParameterDescription(
              name: 'accountRequestId',
              type: _is.getType<_is.UuidValue>(),
              nullable: false,
            ),
            'verificationCode': _is.ParameterDescription(
              name: 'verificationCode',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .verifyRegistrationCode(
                    session,
                    accountRequestId: params['accountRequestId'],
                    verificationCode: params['verificationCode'],
                  ),
        ),
        'finishRegistration': _is.MethodConnector(
          name: 'finishRegistration',
          params: {
            'registrationToken': _is.ParameterDescription(
              name: 'registrationToken',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'password': _is.ParameterDescription(
              name: 'password',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .finishRegistration(
                    session,
                    registrationToken: params['registrationToken'],
                    password: params['password'],
                  ),
        ),
        'startPasswordReset': _is.MethodConnector(
          name: 'startPasswordReset',
          params: {
            'email': _is.ParameterDescription(
              name: 'email',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .startPasswordReset(
                    session,
                    email: params['email'],
                  ),
        ),
        'verifyPasswordResetCode': _is.MethodConnector(
          name: 'verifyPasswordResetCode',
          params: {
            'passwordResetRequestId': _is.ParameterDescription(
              name: 'passwordResetRequestId',
              type: _is.getType<_is.UuidValue>(),
              nullable: false,
            ),
            'verificationCode': _is.ParameterDescription(
              name: 'verificationCode',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .verifyPasswordResetCode(
                    session,
                    passwordResetRequestId: params['passwordResetRequestId'],
                    verificationCode: params['verificationCode'],
                  ),
        ),
        'finishPasswordReset': _is.MethodConnector(
          name: 'finishPasswordReset',
          params: {
            'finishPasswordResetToken': _is.ParameterDescription(
              name: 'finishPasswordResetToken',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'newPassword': _is.ParameterDescription(
              name: 'newPassword',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .finishPasswordReset(
                    session,
                    finishPasswordResetToken:
                        params['finishPasswordResetToken'],
                    newPassword: params['newPassword'],
                  ),
        ),
        'hasAccount': _is.MethodConnector(
          name: 'hasAccount',
          params: {},
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['emailIdp'] as _iuc1hd5t.EmailIdpEndpoint)
                  .hasAccount(session),
        ),
      },
    );
    connectors['jwtRefresh'] = _is.EndpointConnector(
      name: 'jwtRefresh',
      endpoint: endpoints['jwtRefresh']!,
      methodConnectors: {
        'refreshAccessToken': _is.MethodConnector(
          name: 'refreshAccessToken',
          params: {
            'refreshToken': _is.ParameterDescription(
              name: 'refreshToken',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['jwtRefresh'] as _inwq3ztq.JwtRefreshEndpoint)
                      .refreshAccessToken(
                        session,
                        refreshToken: params['refreshToken'],
                      ),
        ),
      },
    );
    connectors['ai'] = _is.EndpointConnector(
      name: 'ai',
      endpoint: endpoints['ai']!,
      methodConnectors: {
        'getCrowdForecast': _is.MethodConnector(
          name: 'getCrowdForecast',
          params: {},
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['ai'] as _igsjf4zh.AiEndpoint)
                  .getCrowdForecast(session),
        ),
        'simulateDigitalTwin': _is.MethodConnector(
          name: 'simulateDigitalTwin',
          params: {
            'arrivalMultiplier': _is.ParameterDescription(
              name: 'arrivalMultiplier',
              type: _is.getType<double>(),
              nullable: false,
            ),
            'doctorRatio': _is.ParameterDescription(
              name: 'doctorRatio',
              type: _is.getType<double>(),
              nullable: false,
            ),
            'triageEfficiency': _is.ParameterDescription(
              name: 'triageEfficiency',
              type: _is.getType<double>(),
              nullable: false,
            ),
            'pharmacyThroughput': _is.ParameterDescription(
              name: 'pharmacyThroughput',
              type: _is.getType<double>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['ai'] as _igsjf4zh.AiEndpoint).simulateDigitalTwin(
                    session,
                    params['arrivalMultiplier'],
                    params['doctorRatio'],
                    params['triageEfficiency'],
                    params['pharmacyThroughput'],
                  ),
        ),
        'triageSymptoms': _is.MethodConnector(
          name: 'triageSymptoms',
          params: {
            'symptoms': _is.ParameterDescription(
              name: 'symptoms',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'language': _is.ParameterDescription(
              name: 'language',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['ai'] as _igsjf4zh.AiEndpoint).triageSymptoms(
                    session,
                    params['symptoms'],
                    params['language'],
                  ),
        ),
      },
    );
    connectors['analytics'] = _is.EndpointConnector(
      name: 'analytics',
      endpoint: endpoints['analytics']!,
      methodConnectors: {
        'getHospitalOverview': _is.MethodConnector(
          name: 'getHospitalOverview',
          params: {},
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['analytics'] as _ibbhv9ku.AnalyticsEndpoint)
                  .getHospitalOverview(session),
        ),
      },
    );
    connectors['appointment'] = _is.EndpointConnector(
      name: 'appointment',
      endpoint: endpoints['appointment']!,
      methodConnectors: {
        'bookAppointment': _is.MethodConnector(
          name: 'bookAppointment',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'appointmentDate': _is.ParameterDescription(
              name: 'appointmentDate',
              type: _is.getType<DateTime>(),
              nullable: false,
            ),
            'timeSlot': _is.ParameterDescription(
              name: 'timeSlot',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'reason': _is.ParameterDescription(
              name: 'reason',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'symptoms': _is.ParameterDescription(
              name: 'symptoms',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['appointment'] as _ivwn3vsl.AppointmentEndpoint)
                      .bookAppointment(
                        session,
                        params['patientId'],
                        params['departmentId'],
                        params['appointmentDate'],
                        params['timeSlot'],
                        doctorId: params['doctorId'],
                        reason: params['reason'],
                        symptoms: params['symptoms'],
                      ),
        ),
        'getAppointments': _is.MethodConnector(
          name: 'getAppointments',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['appointment'] as _ivwn3vsl.AppointmentEndpoint)
                      .getAppointments(
                        session,
                        patientId: params['patientId'],
                        departmentId: params['departmentId'],
                      ),
        ),
        'updateStatus': _is.MethodConnector(
          name: 'updateStatus',
          params: {
            'appointmentId': _is.ParameterDescription(
              name: 'appointmentId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['appointment'] as _ivwn3vsl.AppointmentEndpoint)
                      .updateStatus(
                        session,
                        params['appointmentId'],
                        params['status'],
                      ),
        ),
      },
    );
    connectors['consultation'] = _is.EndpointConnector(
      name: 'consultation',
      endpoint: endpoints['consultation']!,
      methodConnectors: {
        'createConsultation': _is.MethodConnector(
          name: 'createConsultation',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'chiefComplaints': _is.ParameterDescription(
              name: 'chiefComplaints',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'diagnosis': _is.ParameterDescription(
              name: 'diagnosis',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'queueId': _is.ParameterDescription(
              name: 'queueId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'clinicalObservations': _is.ParameterDescription(
              name: 'clinicalObservations',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'bp': _is.ParameterDescription(
              name: 'bp',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'pulse': _is.ParameterDescription(
              name: 'pulse',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'temperature': _is.ParameterDescription(
              name: 'temperature',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'spO2': _is.ParameterDescription(
              name: 'spO2',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'weight': _is.ParameterDescription(
              name: 'weight',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'clinicalNotes': _is.ParameterDescription(
              name: 'clinicalNotes',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'followUpDate': _is.ParameterDescription(
              name: 'followUpDate',
              type: _is.getType<DateTime?>(),
              nullable: true,
            ),
            'prescribedMedicines': _is.ParameterDescription(
              name: 'prescribedMedicines',
              type: _is.getType<List<String>?>(),
              nullable: true,
            ),
            'orderedLabTests': _is.ParameterDescription(
              name: 'orderedLabTests',
              type: _is.getType<List<String>?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['consultation'] as _islc93r6.ConsultationEndpoint)
                      .createConsultation(
                        session,
                        params['patientId'],
                        params['doctorId'],
                        params['departmentId'],
                        params['chiefComplaints'],
                        params['diagnosis'],
                        queueId: params['queueId'],
                        clinicalObservations: params['clinicalObservations'],
                        bp: params['bp'],
                        pulse: params['pulse'],
                        temperature: params['temperature'],
                        spO2: params['spO2'],
                        weight: params['weight'],
                        clinicalNotes: params['clinicalNotes'],
                        followUpDate: params['followUpDate'],
                        prescribedMedicines: params['prescribedMedicines'],
                        orderedLabTests: params['orderedLabTests'],
                      ),
        ),
        'getConsultations': _is.MethodConnector(
          name: 'getConsultations',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['consultation'] as _islc93r6.ConsultationEndpoint)
                      .getConsultations(
                        session,
                        patientId: params['patientId'],
                        doctorId: params['doctorId'],
                      ),
        ),
      },
    );
    connectors['department'] = _is.EndpointConnector(
      name: 'department',
      endpoint: endpoints['department']!,
      methodConnectors: {
        'getDepartments': _is.MethodConnector(
          name: 'getDepartments',
          params: {},
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['department'] as _il7z9g4u.DepartmentEndpoint)
                      .getDepartments(session),
        ),
        'getDepartmentById': _is.MethodConnector(
          name: 'getDepartmentById',
          params: {
            'id': _is.ParameterDescription(
              name: 'id',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['department'] as _il7z9g4u.DepartmentEndpoint)
                      .getDepartmentById(
                        session,
                        params['id'],
                      ),
        ),
        'createDepartment': _is.MethodConnector(
          name: 'createDepartment',
          params: {
            'name': _is.ParameterDescription(
              name: 'name',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'code': _is.ParameterDescription(
              name: 'code',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'description': _is.ParameterDescription(
              name: 'description',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'floor': _is.ParameterDescription(
              name: 'floor',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'maxDailyCapacity': _is.ParameterDescription(
              name: 'maxDailyCapacity',
              type: _is.getType<int?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['department'] as _il7z9g4u.DepartmentEndpoint)
                      .createDepartment(
                        session,
                        params['name'],
                        params['code'],
                        description: params['description'],
                        floor: params['floor'],
                        maxDailyCapacity: params['maxDailyCapacity'],
                      ),
        ),
      },
    );
    connectors['doctor'] = _is.EndpointConnector(
      name: 'doctor',
      endpoint: endpoints['doctor']!,
      methodConnectors: {
        'getDoctors': _is.MethodConnector(
          name: 'getDoctors',
          params: {
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['doctor'] as _igqfxzjr.DoctorEndpoint).getDoctors(
                    session,
                    departmentId: params['departmentId'],
                  ),
        ),
        'getDoctorById': _is.MethodConnector(
          name: 'getDoctorById',
          params: {
            'id': _is.ParameterDescription(
              name: 'id',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['doctor'] as _igqfxzjr.DoctorEndpoint)
                  .getDoctorById(
                    session,
                    params['id'],
                  ),
        ),
        'updateAvailability': _is.MethodConnector(
          name: 'updateAvailability',
          params: {
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'isAvailable': _is.ParameterDescription(
              name: 'isAvailable',
              type: _is.getType<bool>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['doctor'] as _igqfxzjr.DoctorEndpoint)
                  .updateAvailability(
                    session,
                    params['doctorId'],
                    params['isAvailable'],
                  ),
        ),
      },
    );
    connectors['feedback'] = _is.EndpointConnector(
      name: 'feedback',
      endpoint: endpoints['feedback']!,
      methodConnectors: {
        'submitFeedback': _is.MethodConnector(
          name: 'submitFeedback',
          params: {
            'rating': _is.ParameterDescription(
              name: 'rating',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'category': _is.ParameterDescription(
              name: 'category',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'comments': _is.ParameterDescription(
              name: 'comments',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'isAnonymous': _is.ParameterDescription(
              name: 'isAnonymous',
              type: _is.getType<bool>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['feedback'] as _iebcplle.FeedbackEndpoint)
                  .submitFeedback(
                    session,
                    params['rating'],
                    params['category'],
                    params['comments'],
                    patientId: params['patientId'],
                    departmentId: params['departmentId'],
                    doctorId: params['doctorId'],
                    isAnonymous: params['isAnonymous'],
                  ),
        ),
        'trackTicket': _is.MethodConnector(
          name: 'trackTicket',
          params: {
            'ticketId': _is.ParameterDescription(
              name: 'ticketId',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['feedback'] as _iebcplle.FeedbackEndpoint)
                  .trackTicket(
                    session,
                    params['ticketId'],
                  ),
        ),
        'getAllFeedback': _is.MethodConnector(
          name: 'getAllFeedback',
          params: {},
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['feedback'] as _iebcplle.FeedbackEndpoint)
                  .getAllFeedback(session),
        ),
      },
    );
    connectors['laboratory'] = _is.EndpointConnector(
      name: 'laboratory',
      endpoint: endpoints['laboratory']!,
      methodConnectors: {
        'getTests': _is.MethodConnector(
          name: 'getTests',
          params: {
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'category': _is.ParameterDescription(
              name: 'category',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['laboratory'] as _ig853fd2.LaboratoryEndpoint)
                      .getTests(
                        session,
                        status: params['status'],
                        category: params['category'],
                      ),
        ),
        'createTest': _is.MethodConnector(
          name: 'createTest',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'testName': _is.ParameterDescription(
              name: 'testName',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'consultationId': _is.ParameterDescription(
              name: 'consultationId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'testCategory': _is.ParameterDescription(
              name: 'testCategory',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'priority': _is.ParameterDescription(
              name: 'priority',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['laboratory'] as _ig853fd2.LaboratoryEndpoint)
                      .createTest(
                        session,
                        params['patientId'],
                        params['doctorId'],
                        params['testName'],
                        consultationId: params['consultationId'],
                        testCategory: params['testCategory'],
                        priority: params['priority'],
                      ),
        ),
        'updateTestStatus': _is.MethodConnector(
          name: 'updateTestStatus',
          params: {
            'testId': _is.ParameterDescription(
              name: 'testId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'resultSummary': _is.ParameterDescription(
              name: 'resultSummary',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'reportUrl': _is.ParameterDescription(
              name: 'reportUrl',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['laboratory'] as _ig853fd2.LaboratoryEndpoint)
                      .updateTestStatus(
                        session,
                        params['testId'],
                        params['status'],
                        resultSummary: params['resultSummary'],
                        reportUrl: params['reportUrl'],
                      ),
        ),
      },
    );
    connectors['notification'] = _is.EndpointConnector(
      name: 'notification',
      endpoint: endpoints['notification']!,
      methodConnectors: {
        'getNotifications': _is.MethodConnector(
          name: 'getNotifications',
          params: {
            'userId': _is.ParameterDescription(
              name: 'userId',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['notification'] as _ihb11yhk.NotificationEndpoint)
                      .getNotifications(
                        session,
                        params['userId'],
                      ),
        ),
        'sendNotification': _is.MethodConnector(
          name: 'sendNotification',
          params: {
            'recipientUserId': _is.ParameterDescription(
              name: 'recipientUserId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'title': _is.ParameterDescription(
              name: 'title',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'message': _is.ParameterDescription(
              name: 'message',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'type': _is.ParameterDescription(
              name: 'type',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'tokenNumber': _is.ParameterDescription(
              name: 'tokenNumber',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'department': _is.ParameterDescription(
              name: 'department',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'urgency': _is.ParameterDescription(
              name: 'urgency',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['notification'] as _ihb11yhk.NotificationEndpoint)
                      .sendNotification(
                        session,
                        params['recipientUserId'],
                        params['title'],
                        params['message'],
                        type: params['type'],
                        tokenNumber: params['tokenNumber'],
                        department: params['department'],
                        urgency: params['urgency'],
                      ),
        ),
        'markAsRead': _is.MethodConnector(
          name: 'markAsRead',
          params: {
            'notificationId': _is.ParameterDescription(
              name: 'notificationId',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['notification'] as _ihb11yhk.NotificationEndpoint)
                      .markAsRead(
                        session,
                        params['notificationId'],
                      ),
        ),
      },
    );
    connectors['patient'] = _is.EndpointConnector(
      name: 'patient',
      endpoint: endpoints['patient']!,
      methodConnectors: {
        'getPatients': _is.MethodConnector(
          name: 'getPatients',
          params: {
            'search': _is.ParameterDescription(
              name: 'search',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['patient'] as _iq9ib001.PatientEndpoint)
                  .getPatients(
                    session,
                    search: params['search'],
                  ),
        ),
        'getPatientById': _is.MethodConnector(
          name: 'getPatientById',
          params: {
            'id': _is.ParameterDescription(
              name: 'id',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['patient'] as _iq9ib001.PatientEndpoint)
                  .getPatientById(
                    session,
                    params['id'],
                  ),
        ),
        'getPatientByPatientId': _is.MethodConnector(
          name: 'getPatientByPatientId',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['patient'] as _iq9ib001.PatientEndpoint)
                  .getPatientByPatientId(
                    session,
                    params['patientId'],
                  ),
        ),
        'createPatient': _is.MethodConnector(
          name: 'createPatient',
          params: {
            'userId': _is.ParameterDescription(
              name: 'userId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'age': _is.ParameterDescription(
              name: 'age',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'gender': _is.ParameterDescription(
              name: 'gender',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'bloodGroup': _is.ParameterDescription(
              name: 'bloodGroup',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'abhaId': _is.ParameterDescription(
              name: 'abhaId',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'emergencyContactName': _is.ParameterDescription(
              name: 'emergencyContactName',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'emergencyContactPhone': _is.ParameterDescription(
              name: 'emergencyContactPhone',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'address': _is.ParameterDescription(
              name: 'address',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['patient'] as _iq9ib001.PatientEndpoint)
                  .createPatient(
                    session,
                    params['userId'],
                    params['patientId'],
                    age: params['age'],
                    gender: params['gender'],
                    bloodGroup: params['bloodGroup'],
                    abhaId: params['abhaId'],
                    emergencyContactName: params['emergencyContactName'],
                    emergencyContactPhone: params['emergencyContactPhone'],
                    address: params['address'],
                  ),
        ),
      },
    );
    connectors['pharmacy'] = _is.EndpointConnector(
      name: 'pharmacy',
      endpoint: endpoints['pharmacy']!,
      methodConnectors: {
        'getOrders': _is.MethodConnector(
          name: 'getOrders',
          params: {
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['pharmacy'] as _iaijkc9d.PharmacyEndpoint)
                  .getOrders(
                    session,
                    status: params['status'],
                  ),
        ),
        'updateOrderStatus': _is.MethodConnector(
          name: 'updateOrderStatus',
          params: {
            'orderId': _is.ParameterDescription(
              name: 'orderId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['pharmacy'] as _iaijkc9d.PharmacyEndpoint)
                  .updateOrderStatus(
                    session,
                    params['orderId'],
                    params['status'],
                  ),
        ),
      },
    );
    connectors['prescription'] = _is.EndpointConnector(
      name: 'prescription',
      endpoint: endpoints['prescription']!,
      methodConnectors: {
        'getPrescriptions': _is.MethodConnector(
          name: 'getPrescriptions',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['prescription'] as _ir96hk1b.PrescriptionEndpoint)
                      .getPrescriptions(
                        session,
                        patientId: params['patientId'],
                        status: params['status'],
                      ),
        ),
        'getPrescriptionItems': _is.MethodConnector(
          name: 'getPrescriptionItems',
          params: {
            'prescriptionId': _is.ParameterDescription(
              name: 'prescriptionId',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['prescription'] as _ir96hk1b.PrescriptionEndpoint)
                      .getPrescriptionItems(
                        session,
                        params['prescriptionId'],
                      ),
        ),
        'updateStatus': _is.MethodConnector(
          name: 'updateStatus',
          params: {
            'prescriptionId': _is.ParameterDescription(
              name: 'prescriptionId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['prescription'] as _ir96hk1b.PrescriptionEndpoint)
                      .updateStatus(
                        session,
                        params['prescriptionId'],
                        params['status'],
                      ),
        ),
      },
    );
    connectors['queue'] = _is.EndpointConnector(
      name: 'queue',
      endpoint: endpoints['queue']!,
      methodConnectors: {
        'getTokens': _is.MethodConnector(
          name: 'getTokens',
          params: {
            'department': _is.ParameterDescription(
              name: 'department',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['queue'] as _iu1irfsk.QueueEndpoint).getTokens(
                    session,
                    department: params['department'],
                    status: params['status'],
                  ),
        ),
        'getTokenByNumber': _is.MethodConnector(
          name: 'getTokenByNumber',
          params: {
            'tokenNumber': _is.ParameterDescription(
              name: 'tokenNumber',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['queue'] as _iu1irfsk.QueueEndpoint)
                  .getTokenByNumber(
                    session,
                    params['tokenNumber'],
                  ),
        ),
        'checkDoctorCapacity': _is.MethodConnector(
          name: 'checkDoctorCapacity',
          params: {
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['queue'] as _iu1irfsk.QueueEndpoint)
                  .checkDoctorCapacity(
                    session,
                    params['doctorId'],
                  ),
        ),
        'generateToken': _is.MethodConnector(
          name: 'generateToken',
          params: {
            'patientId': _is.ParameterDescription(
              name: 'patientId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'triageLevel': _is.ParameterDescription(
              name: 'triageLevel',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'symptoms': _is.ParameterDescription(
              name: 'symptoms',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'priority': _is.ParameterDescription(
              name: 'priority',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['queue'] as _iu1irfsk.QueueEndpoint).generateToken(
                    session,
                    params['patientId'],
                    params['departmentId'],
                    doctorId: params['doctorId'],
                    triageLevel: params['triageLevel'],
                    symptoms: params['symptoms'],
                    priority: params['priority'],
                  ),
        ),
        'callNext': _is.MethodConnector(
          name: 'callNext',
          params: {
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'doctorId': _is.ParameterDescription(
              name: 'doctorId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['queue'] as _iu1irfsk.QueueEndpoint).callNext(
                    session,
                    params['departmentId'],
                    doctorId: params['doctorId'],
                  ),
        ),
        'skipPatient': _is.MethodConnector(
          name: 'skipPatient',
          params: {
            'queueId': _is.ParameterDescription(
              name: 'queueId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'reason': _is.ParameterDescription(
              name: 'reason',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['queue'] as _iu1irfsk.QueueEndpoint).skipPatient(
                    session,
                    params['queueId'],
                    reason: params['reason'],
                  ),
        ),
        'rejoinPatient': _is.MethodConnector(
          name: 'rejoinPatient',
          params: {
            'tokenNumber': _is.ParameterDescription(
              name: 'tokenNumber',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'staffId': _is.ParameterDescription(
              name: 'staffId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['queue'] as _iu1irfsk.QueueEndpoint).rejoinPatient(
                    session,
                    params['tokenNumber'],
                    staffId: params['staffId'],
                  ),
        ),
        'getSkippedTokens': _is.MethodConnector(
          name: 'getSkippedTokens',
          params: {
            'departmentId': _is.ParameterDescription(
              name: 'departmentId',
              type: _is.getType<int?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['queue'] as _iu1irfsk.QueueEndpoint)
                  .getSkippedTokens(
                    session,
                    departmentId: params['departmentId'],
                  ),
        ),
        'updateStatus': _is.MethodConnector(
          name: 'updateStatus',
          params: {
            'queueId': _is.ParameterDescription(
              name: 'queueId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['queue'] as _iu1irfsk.QueueEndpoint).updateStatus(
                    session,
                    params['queueId'],
                    params['status'],
                  ),
        ),
      },
    );
    connectors['resource'] = _is.EndpointConnector(
      name: 'resource',
      endpoint: endpoints['resource']!,
      methodConnectors: {
        'getResources': _is.MethodConnector(
          name: 'getResources',
          params: {
            'type': _is.ParameterDescription(
              name: 'type',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['resource'] as _i7u1ocs5.ResourceEndpoint)
                  .getResources(
                    session,
                    type: params['type'],
                  ),
        ),
        'updateStatus': _is.MethodConnector(
          name: 'updateStatus',
          params: {
            'resourceId': _is.ParameterDescription(
              name: 'resourceId',
              type: _is.getType<int>(),
              nullable: false,
            ),
            'status': _is.ParameterDescription(
              name: 'status',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['resource'] as _i7u1ocs5.ResourceEndpoint)
                  .updateStatus(
                    session,
                    params['resourceId'],
                    params['status'],
                  ),
        ),
      },
    );
    connectors['userAuth'] = _is.EndpointConnector(
      name: 'userAuth',
      endpoint: endpoints['userAuth']!,
      methodConnectors: {
        'login': _is.MethodConnector(
          name: 'login',
          params: {
            'email': _is.ParameterDescription(
              name: 'email',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'password': _is.ParameterDescription(
              name: 'password',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['userAuth'] as _iaac3hit.UserAuthEndpoint).login(
                    session,
                    params['email'],
                    params['password'],
                  ),
        ),
        'register': _is.MethodConnector(
          name: 'register',
          params: {
            'name': _is.ParameterDescription(
              name: 'name',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'email': _is.ParameterDescription(
              name: 'email',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'phone': _is.ParameterDescription(
              name: 'phone',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'password': _is.ParameterDescription(
              name: 'password',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'role': _is.ParameterDescription(
              name: 'role',
              type: _is.getType<String>(),
              nullable: false,
            ),
            'abhaId': _is.ParameterDescription(
              name: 'abhaId',
              type: _is.getType<String?>(),
              nullable: true,
            ),
            'age': _is.ParameterDescription(
              name: 'age',
              type: _is.getType<int?>(),
              nullable: true,
            ),
            'gender': _is.ParameterDescription(
              name: 'gender',
              type: _is.getType<String?>(),
              nullable: true,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['userAuth'] as _iaac3hit.UserAuthEndpoint)
                  .register(
                    session,
                    params['name'],
                    params['email'],
                    params['phone'],
                    params['password'],
                    params['role'],
                    abhaId: params['abhaId'],
                    age: params['age'],
                    gender: params['gender'],
                  ),
        ),
        'verifyDoctorPin': _is.MethodConnector(
          name: 'verifyDoctorPin',
          params: {
            'pin': _is.ParameterDescription(
              name: 'pin',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['userAuth'] as _iaac3hit.UserAuthEndpoint)
                  .verifyDoctorPin(
                    session,
                    params['pin'],
                  ),
        ),
        'getCurrentUser': _is.MethodConnector(
          name: 'getCurrentUser',
          params: {
            'userId': _is.ParameterDescription(
              name: 'userId',
              type: _is.getType<int>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['userAuth'] as _iaac3hit.UserAuthEndpoint)
                  .getCurrentUser(
                    session,
                    params['userId'],
                  ),
        ),
        'forgotPassword': _is.MethodConnector(
          name: 'forgotPassword',
          params: {
            'email': _is.ParameterDescription(
              name: 'email',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async => (endpoints['userAuth'] as _iaac3hit.UserAuthEndpoint)
                  .forgotPassword(
                    session,
                    params['email'],
                  ),
        ),
      },
    );
    connectors['greeting'] = _is.EndpointConnector(
      name: 'greeting',
      endpoint: endpoints['greeting']!,
      methodConnectors: {
        'hello': _is.MethodConnector(
          name: 'hello',
          params: {
            'name': _is.ParameterDescription(
              name: 'name',
              type: _is.getType<String>(),
              nullable: false,
            ),
          },
          call:
              (
                _is.Session session,
                Map<String, dynamic> params,
              ) async =>
                  (endpoints['greeting'] as _il624ik7.GreetingEndpoint).hello(
                    session,
                    params['name'],
                  ),
        ),
      },
    );
  }
}

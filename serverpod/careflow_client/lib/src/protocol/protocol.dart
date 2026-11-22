/* AUTOMATICALLY GENERATED CODE DO NOT MODIFY */
/*   To generate run: "serverpod generate"    */

// ignore_for_file: implementation_imports
// ignore_for_file: library_private_types_in_public_api
// ignore_for_file: non_constant_identifier_names
// ignore_for_file: public_member_api_docs
// ignore_for_file: type_literal_in_constant_pattern
// ignore_for_file: use_super_parameters
// ignore_for_file: invalid_use_of_internal_member
// ignore_for_file: dead_code, unnecessary_type_check

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:careflow_client/src/protocol/app_notification.dart'
    as _iq6m8chv;
import 'package:careflow_client/src/protocol/appointment.dart' as _i8r8tmrd;
import 'package:careflow_client/src/protocol/consultation.dart' as _ipmvdjgv;
import 'package:careflow_client/src/protocol/crowd_forecast.dart' as _i6zyqkpk;
import 'package:careflow_client/src/protocol/department.dart' as _imuk960z;
import 'package:careflow_client/src/protocol/doctor.dart' as _inlv8cw0;
import 'package:careflow_client/src/protocol/feedback_entry.dart' as _i4mo3s1g;
import 'package:careflow_client/src/protocol/hospital_resource.dart'
    as _i1rtht9p;
import 'package:careflow_client/src/protocol/lab_test.dart' as _ikkvx3xq;
import 'package:careflow_client/src/protocol/patient.dart' as _ipgm6jop;
import 'package:careflow_client/src/protocol/pharmacy_order.dart' as _iqy1pqxu;
import 'package:careflow_client/src/protocol/prescription.dart' as _iw0f4dv9;
import 'package:careflow_client/src/protocol/prescription_item.dart'
    as _izfgdvfm;
import 'package:careflow_client/src/protocol/queue_entry.dart' as _ird1jsbp;
import 'package:serverpod_auth_core_client/serverpod_auth_core_client.dart'
    as _iacc;
import 'package:serverpod_auth_idp_client/serverpod_auth_idp_client.dart'
    as _iaic;
import 'package:serverpod_client/serverpod_client.dart' as _isc;
import 'app_notification.dart' as _ip1vhxmg;
import 'appointment.dart' as _ihhna9u8;
import 'auth_response.dart' as _iuyz7l8a;
import 'consultation.dart' as _ict42zxy;
import 'crowd_forecast.dart' as _i3d9bte0;
import 'department.dart' as _i30690kx;
import 'digital_twin_result.dart' as _ikf3bi2z;
import 'doctor.dart' as _ilpr60tn;
import 'doctor_capacity.dart' as _i31tlqz8;
import 'feedback_entry.dart' as _i3aaegw9;
import 'greetings/greeting.dart' as _izw8z7ou;
import 'hospital_resource.dart' as _ix06fazv;
import 'lab_test.dart' as _iaadfiwb;
import 'patient.dart' as _ius4lr2t;
import 'pharmacy_order.dart' as _ime8hgwz;
import 'prescription.dart' as _it6yrmua;
import 'prescription_item.dart' as _i0s366uf;
import 'queue_entry.dart' as _irv4s1m8;
import 'triage_response.dart' as _ih6i7pa0;
import 'user.dart' as _iv73i78m;
export 'app_notification.dart';
export 'appointment.dart';
export 'auth_response.dart';
export 'consultation.dart';
export 'crowd_forecast.dart';
export 'department.dart';
export 'digital_twin_result.dart';
export 'doctor.dart';
export 'doctor_capacity.dart';
export 'feedback_entry.dart';
export 'greetings/greeting.dart';
export 'hospital_resource.dart';
export 'lab_test.dart';
export 'patient.dart';
export 'pharmacy_order.dart';
export 'prescription.dart';
export 'prescription_item.dart';
export 'queue_entry.dart';
export 'triage_response.dart';
export 'user.dart';
export 'client.dart';

class Protocol extends _isc.SerializationManager
    implements _isc.ProtocolDeserializationProvider {
  Protocol._();

  factory Protocol() => _instance;

  static final Protocol _instance = Protocol._().._registerHostProtocols();

  @override
  _isc.ProtocolDeserialization get deserializationMetadata =>
      _isc.ProtocolDeserialization.cached(
        this,
        types: const [
          _isc.getType<_ip1vhxmg.AppNotification>,
          _isc.getType<_ihhna9u8.Appointment>,
          _isc.getType<_iuyz7l8a.AuthResponse>,
          _isc.getType<_ict42zxy.Consultation>,
          _isc.getType<_i3d9bte0.CrowdForecast>,
          _isc.getType<_i30690kx.Department>,
          _isc.getType<_ikf3bi2z.DigitalTwinResult>,
          _isc.getType<_ilpr60tn.Doctor>,
          _isc.getType<_i31tlqz8.DoctorCapacity>,
          _isc.getType<_i3aaegw9.FeedbackEntry>,
          _isc.getType<_izw8z7ou.Greeting>,
          _isc.getType<_ix06fazv.HospitalResource>,
          _isc.getType<_iaadfiwb.LabTest>,
          _isc.getType<_ius4lr2t.Patient>,
          _isc.getType<_ime8hgwz.PharmacyOrder>,
          _isc.getType<_it6yrmua.Prescription>,
          _isc.getType<_i0s366uf.PrescriptionItem>,
          _isc.getType<_irv4s1m8.QueueEntry>,
          _isc.getType<_ih6i7pa0.TriageResponse>,
          _isc.getType<_iv73i78m.User>,
          _isc.getType<_ip1vhxmg.AppNotification?>,
          _isc.getType<_ihhna9u8.Appointment?>,
          _isc.getType<_iuyz7l8a.AuthResponse?>,
          _isc.getType<_ict42zxy.Consultation?>,
          _isc.getType<_i3d9bte0.CrowdForecast?>,
          _isc.getType<_i30690kx.Department?>,
          _isc.getType<_ikf3bi2z.DigitalTwinResult?>,
          _isc.getType<_ilpr60tn.Doctor?>,
          _isc.getType<_i31tlqz8.DoctorCapacity?>,
          _isc.getType<_i3aaegw9.FeedbackEntry?>,
          _isc.getType<_izw8z7ou.Greeting?>,
          _isc.getType<_ix06fazv.HospitalResource?>,
          _isc.getType<_iaadfiwb.LabTest?>,
          _isc.getType<_ius4lr2t.Patient?>,
          _isc.getType<_ime8hgwz.PharmacyOrder?>,
          _isc.getType<_it6yrmua.Prescription?>,
          _isc.getType<_i0s366uf.PrescriptionItem?>,
          _isc.getType<_irv4s1m8.QueueEntry?>,
          _isc.getType<_ih6i7pa0.TriageResponse?>,
          _isc.getType<_iv73i78m.User?>,
          _isc.getType<List<String>>,
          _isc.getType<List<String>?>,
          _isc.getType<List<_i6zyqkpk.CrowdForecast>>,
          _isc.getType<Map<String, dynamic>>,
          _isc.getType<dynamic>,
          _isc.getType<List<_i8r8tmrd.Appointment>>,
          _isc.getType<List<String>>,
          _isc.getType<List<String>?>,
          _isc.getType<List<_ipmvdjgv.Consultation>>,
          _isc.getType<List<_imuk960z.Department>>,
          _isc.getType<List<_inlv8cw0.Doctor>>,
          _isc.getType<List<_i4mo3s1g.FeedbackEntry>>,
          _isc.getType<List<_ikkvx3xq.LabTest>>,
          _isc.getType<List<_iq6m8chv.AppNotification>>,
          _isc.getType<List<_ipgm6jop.Patient>>,
          _isc.getType<List<_iqy1pqxu.PharmacyOrder>>,
          _isc.getType<List<_iw0f4dv9.Prescription>>,
          _isc.getType<List<_izfgdvfm.PrescriptionItem>>,
          _isc.getType<List<_ird1jsbp.QueueEntry>>,
          _isc.getType<List<_i1rtht9p.HospitalResource>>,
        ],
        modules: const [
          _iaic.Protocol.new,
          _iacc.Protocol.new,
        ],
        classNames: const [
          'AppNotification',
          'Appointment',
          'AuthResponse',
          'Consultation',
          'CrowdForecast',
          'Department',
          'DigitalTwinResult',
          'Doctor',
          'DoctorCapacity',
          'FeedbackEntry',
          'Greeting',
          'HospitalResource',
          'LabTest',
          'Patient',
          'PharmacyOrder',
          'Prescription',
          'PrescriptionItem',
          'QueueEntry',
          'TriageResponse',
          'User',
        ],
      );

  static String? getClassNameFromObjectJson(dynamic data) =>
      _isc.ProtocolDeserialization.readClassName(data);

  @override
  T deserialize<T>(
    dynamic data, [
    Type? t,
  ]) {
    t ??= T;
    final rawDataClassName = _isc.ProtocolDeserialization.readClassName(data);
    final dataClassName = rawDataClassName;
    if (dataClassName != null && dataClassName != getClassNameForType(t)) {
      try {
        return deserializeByClassName({
          'className': dataClassName,
          'data': data,
        });
      } on _isc.DeserializationClassNameNotFoundException catch (_) {
        // If the className is not recognized (e.g., older client receiving
        // data with a new subtype), fall back to deserializing without the
        // className, using the expected type T.
      }
    }

    if (t == _ip1vhxmg.AppNotification) {
      return _ip1vhxmg.AppNotification.fromJson(data) as T;
    }
    if (t == _ihhna9u8.Appointment) {
      return _ihhna9u8.Appointment.fromJson(data) as T;
    }
    if (t == _iuyz7l8a.AuthResponse) {
      return _iuyz7l8a.AuthResponse.fromJson(data) as T;
    }
    if (t == _ict42zxy.Consultation) {
      return _ict42zxy.Consultation.fromJson(data) as T;
    }
    if (t == _i3d9bte0.CrowdForecast) {
      return _i3d9bte0.CrowdForecast.fromJson(data) as T;
    }
    if (t == _i30690kx.Department) {
      return _i30690kx.Department.fromJson(data) as T;
    }
    if (t == _ikf3bi2z.DigitalTwinResult) {
      return _ikf3bi2z.DigitalTwinResult.fromJson(data) as T;
    }
    if (t == _ilpr60tn.Doctor) {
      return _ilpr60tn.Doctor.fromJson(data) as T;
    }
    if (t == _i31tlqz8.DoctorCapacity) {
      return _i31tlqz8.DoctorCapacity.fromJson(data) as T;
    }
    if (t == _i3aaegw9.FeedbackEntry) {
      return _i3aaegw9.FeedbackEntry.fromJson(data) as T;
    }
    if (t == _izw8z7ou.Greeting) {
      return _izw8z7ou.Greeting.fromJson(data) as T;
    }
    if (t == _ix06fazv.HospitalResource) {
      return _ix06fazv.HospitalResource.fromJson(data) as T;
    }
    if (t == _iaadfiwb.LabTest) {
      return _iaadfiwb.LabTest.fromJson(data) as T;
    }
    if (t == _ius4lr2t.Patient) {
      return _ius4lr2t.Patient.fromJson(data) as T;
    }
    if (t == _ime8hgwz.PharmacyOrder) {
      return _ime8hgwz.PharmacyOrder.fromJson(data) as T;
    }
    if (t == _it6yrmua.Prescription) {
      return _it6yrmua.Prescription.fromJson(data) as T;
    }
    if (t == _i0s366uf.PrescriptionItem) {
      return _i0s366uf.PrescriptionItem.fromJson(data) as T;
    }
    if (t == _irv4s1m8.QueueEntry) {
      return _irv4s1m8.QueueEntry.fromJson(data) as T;
    }
    if (t == _ih6i7pa0.TriageResponse) {
      return _ih6i7pa0.TriageResponse.fromJson(data) as T;
    }
    if (t == _iv73i78m.User) {
      return _iv73i78m.User.fromJson(data) as T;
    }
    if (t == _isc.getType<_ip1vhxmg.AppNotification?>()) {
      return (data != null ? _ip1vhxmg.AppNotification.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_ihhna9u8.Appointment?>()) {
      return (data != null ? _ihhna9u8.Appointment.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_iuyz7l8a.AuthResponse?>()) {
      return (data != null ? _iuyz7l8a.AuthResponse.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_ict42zxy.Consultation?>()) {
      return (data != null ? _ict42zxy.Consultation.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_i3d9bte0.CrowdForecast?>()) {
      return (data != null ? _i3d9bte0.CrowdForecast.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_i30690kx.Department?>()) {
      return (data != null ? _i30690kx.Department.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_ikf3bi2z.DigitalTwinResult?>()) {
      return (data != null ? _ikf3bi2z.DigitalTwinResult.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_ilpr60tn.Doctor?>()) {
      return (data != null ? _ilpr60tn.Doctor.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_i31tlqz8.DoctorCapacity?>()) {
      return (data != null ? _i31tlqz8.DoctorCapacity.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_i3aaegw9.FeedbackEntry?>()) {
      return (data != null ? _i3aaegw9.FeedbackEntry.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_izw8z7ou.Greeting?>()) {
      return (data != null ? _izw8z7ou.Greeting.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_ix06fazv.HospitalResource?>()) {
      return (data != null ? _ix06fazv.HospitalResource.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_iaadfiwb.LabTest?>()) {
      return (data != null ? _iaadfiwb.LabTest.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_ius4lr2t.Patient?>()) {
      return (data != null ? _ius4lr2t.Patient.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_ime8hgwz.PharmacyOrder?>()) {
      return (data != null ? _ime8hgwz.PharmacyOrder.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_it6yrmua.Prescription?>()) {
      return (data != null ? _it6yrmua.Prescription.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_i0s366uf.PrescriptionItem?>()) {
      return (data != null ? _i0s366uf.PrescriptionItem.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_irv4s1m8.QueueEntry?>()) {
      return (data != null ? _irv4s1m8.QueueEntry.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_ih6i7pa0.TriageResponse?>()) {
      return (data != null ? _ih6i7pa0.TriageResponse.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_iv73i78m.User?>()) {
      return (data != null ? _iv73i78m.User.fromJson(data) : null) as T;
    }
    if (t == List<String>) {
      return (data as List).map((e) => deserialize<String>(e)).toList() as T;
    }
    if (t == _isc.getType<List<String>?>()) {
      return (data != null
              ? (data as List).map((e) => deserialize<String>(e)).toList()
              : null)
          as T;
    }
    if (t == List<_i6zyqkpk.CrowdForecast>) {
      return (data as List)
              .map((e) => deserialize<_i6zyqkpk.CrowdForecast>(e))
              .toList()
          as T;
    }
    if (t == Map<String, dynamic>) {
      return (data as Map).map(
            (k, v) => MapEntry(deserialize<String>(k), deserialize<dynamic>(v)),
          )
          as T;
    }
    if (t == dynamic) {
      return deserializeDynamicFieldValue(data) as T;
    }
    if (t == List<_i8r8tmrd.Appointment>) {
      return (data as List)
              .map((e) => deserialize<_i8r8tmrd.Appointment>(e))
              .toList()
          as T;
    }
    if (t == List<String>) {
      return (data as List).map((e) => deserialize<String>(e)).toList() as T;
    }
    if (t == _isc.getType<List<String>?>()) {
      return (data != null
              ? (data as List).map((e) => deserialize<String>(e)).toList()
              : null)
          as T;
    }
    if (t == List<_ipmvdjgv.Consultation>) {
      return (data as List)
              .map((e) => deserialize<_ipmvdjgv.Consultation>(e))
              .toList()
          as T;
    }
    if (t == List<_imuk960z.Department>) {
      return (data as List)
              .map((e) => deserialize<_imuk960z.Department>(e))
              .toList()
          as T;
    }
    if (t == List<_inlv8cw0.Doctor>) {
      return (data as List)
              .map((e) => deserialize<_inlv8cw0.Doctor>(e))
              .toList()
          as T;
    }
    if (t == List<_i4mo3s1g.FeedbackEntry>) {
      return (data as List)
              .map((e) => deserialize<_i4mo3s1g.FeedbackEntry>(e))
              .toList()
          as T;
    }
    if (t == List<_ikkvx3xq.LabTest>) {
      return (data as List)
              .map((e) => deserialize<_ikkvx3xq.LabTest>(e))
              .toList()
          as T;
    }
    if (t == List<_iq6m8chv.AppNotification>) {
      return (data as List)
              .map((e) => deserialize<_iq6m8chv.AppNotification>(e))
              .toList()
          as T;
    }
    if (t == List<_ipgm6jop.Patient>) {
      return (data as List)
              .map((e) => deserialize<_ipgm6jop.Patient>(e))
              .toList()
          as T;
    }
    if (t == List<_iqy1pqxu.PharmacyOrder>) {
      return (data as List)
              .map((e) => deserialize<_iqy1pqxu.PharmacyOrder>(e))
              .toList()
          as T;
    }
    if (t == List<_iw0f4dv9.Prescription>) {
      return (data as List)
              .map((e) => deserialize<_iw0f4dv9.Prescription>(e))
              .toList()
          as T;
    }
    if (t == List<_izfgdvfm.PrescriptionItem>) {
      return (data as List)
              .map((e) => deserialize<_izfgdvfm.PrescriptionItem>(e))
              .toList()
          as T;
    }
    if (t == List<_ird1jsbp.QueueEntry>) {
      return (data as List)
              .map((e) => deserialize<_ird1jsbp.QueueEntry>(e))
              .toList()
          as T;
    }
    if (t == List<_i1rtht9p.HospitalResource>) {
      return (data as List)
              .map((e) => deserialize<_i1rtht9p.HospitalResource>(e))
              .toList()
          as T;
    }
    final modules = deserializationMetadata.modulesForDeserialization(
      t,
      className: rawDataClassName,
    );
    for (final module in modules) {
      try {
        return module.deserialize<T>(data, t);
      } on _isc.DeserializationTypeNotFoundException catch (_) {}
    }

    return super.deserialize<T>(data, t);
  }

  static String? getClassNameForType(Type type) {
    return switch (type) {
      _ip1vhxmg.AppNotification => 'AppNotification',
      _ihhna9u8.Appointment => 'Appointment',
      _iuyz7l8a.AuthResponse => 'AuthResponse',
      _ict42zxy.Consultation => 'Consultation',
      _i3d9bte0.CrowdForecast => 'CrowdForecast',
      _i30690kx.Department => 'Department',
      _ikf3bi2z.DigitalTwinResult => 'DigitalTwinResult',
      _ilpr60tn.Doctor => 'Doctor',
      _i31tlqz8.DoctorCapacity => 'DoctorCapacity',
      _i3aaegw9.FeedbackEntry => 'FeedbackEntry',
      _izw8z7ou.Greeting => 'Greeting',
      _ix06fazv.HospitalResource => 'HospitalResource',
      _iaadfiwb.LabTest => 'LabTest',
      _ius4lr2t.Patient => 'Patient',
      _ime8hgwz.PharmacyOrder => 'PharmacyOrder',
      _it6yrmua.Prescription => 'Prescription',
      _i0s366uf.PrescriptionItem => 'PrescriptionItem',
      _irv4s1m8.QueueEntry => 'QueueEntry',
      _ih6i7pa0.TriageResponse => 'TriageResponse',
      _iv73i78m.User => 'User',
      _ => null,
    };
  }

  @override
  String? getClassNameForObject(Object? data) {
    String? className = super.getClassNameForObject(data);
    if (className != null) return className;

    if (data is Map<String, dynamic> && data['__className__'] is String) {
      return (data['__className__'] as String).replaceFirst('careflow.', '');
    }

    switch (data) {
      case _ip1vhxmg.AppNotification():
        return 'AppNotification';
      case _ihhna9u8.Appointment():
        return 'Appointment';
      case _iuyz7l8a.AuthResponse():
        return 'AuthResponse';
      case _ict42zxy.Consultation():
        return 'Consultation';
      case _i3d9bte0.CrowdForecast():
        return 'CrowdForecast';
      case _i30690kx.Department():
        return 'Department';
      case _ikf3bi2z.DigitalTwinResult():
        return 'DigitalTwinResult';
      case _ilpr60tn.Doctor():
        return 'Doctor';
      case _i31tlqz8.DoctorCapacity():
        return 'DoctorCapacity';
      case _i3aaegw9.FeedbackEntry():
        return 'FeedbackEntry';
      case _izw8z7ou.Greeting():
        return 'Greeting';
      case _ix06fazv.HospitalResource():
        return 'HospitalResource';
      case _iaadfiwb.LabTest():
        return 'LabTest';
      case _ius4lr2t.Patient():
        return 'Patient';
      case _ime8hgwz.PharmacyOrder():
        return 'PharmacyOrder';
      case _it6yrmua.Prescription():
        return 'Prescription';
      case _i0s366uf.PrescriptionItem():
        return 'PrescriptionItem';
      case _irv4s1m8.QueueEntry():
        return 'QueueEntry';
      case _ih6i7pa0.TriageResponse():
        return 'TriageResponse';
      case _iv73i78m.User():
        return 'User';
    }
    className = _iaic.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_idp.$className';
    }
    className = _iacc.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_core.$className';
    }
    return null;
  }

  @override
  dynamic deserializeByClassName(Map<String, dynamic> data) {
    var dataClassName = data['className'];
    if (dataClassName is! String) {
      return super.deserializeByClassName(data);
    }
    if (dataClassName == 'AppNotification') {
      return deserialize<_ip1vhxmg.AppNotification>(data['data']);
    }
    if (dataClassName == 'Appointment') {
      return deserialize<_ihhna9u8.Appointment>(data['data']);
    }
    if (dataClassName == 'AuthResponse') {
      return deserialize<_iuyz7l8a.AuthResponse>(data['data']);
    }
    if (dataClassName == 'Consultation') {
      return deserialize<_ict42zxy.Consultation>(data['data']);
    }
    if (dataClassName == 'CrowdForecast') {
      return deserialize<_i3d9bte0.CrowdForecast>(data['data']);
    }
    if (dataClassName == 'Department') {
      return deserialize<_i30690kx.Department>(data['data']);
    }
    if (dataClassName == 'DigitalTwinResult') {
      return deserialize<_ikf3bi2z.DigitalTwinResult>(data['data']);
    }
    if (dataClassName == 'Doctor') {
      return deserialize<_ilpr60tn.Doctor>(data['data']);
    }
    if (dataClassName == 'DoctorCapacity') {
      return deserialize<_i31tlqz8.DoctorCapacity>(data['data']);
    }
    if (dataClassName == 'FeedbackEntry') {
      return deserialize<_i3aaegw9.FeedbackEntry>(data['data']);
    }
    if (dataClassName == 'Greeting') {
      return deserialize<_izw8z7ou.Greeting>(data['data']);
    }
    if (dataClassName == 'HospitalResource') {
      return deserialize<_ix06fazv.HospitalResource>(data['data']);
    }
    if (dataClassName == 'LabTest') {
      return deserialize<_iaadfiwb.LabTest>(data['data']);
    }
    if (dataClassName == 'Patient') {
      return deserialize<_ius4lr2t.Patient>(data['data']);
    }
    if (dataClassName == 'PharmacyOrder') {
      return deserialize<_ime8hgwz.PharmacyOrder>(data['data']);
    }
    if (dataClassName == 'Prescription') {
      return deserialize<_it6yrmua.Prescription>(data['data']);
    }
    if (dataClassName == 'PrescriptionItem') {
      return deserialize<_i0s366uf.PrescriptionItem>(data['data']);
    }
    if (dataClassName == 'QueueEntry') {
      return deserialize<_irv4s1m8.QueueEntry>(data['data']);
    }
    if (dataClassName == 'TriageResponse') {
      return deserialize<_ih6i7pa0.TriageResponse>(data['data']);
    }
    if (dataClassName == 'User') {
      return deserialize<_iv73i78m.User>(data['data']);
    }
    if (dataClassName.startsWith('serverpod_auth_idp.')) {
      return _iaic.Protocol().deserializeByClassName({
        ...data,
        'className': dataClassName.substring(19),
      });
    }
    if (dataClassName.startsWith('serverpod_auth_core.')) {
      return _iacc.Protocol().deserializeByClassName({
        ...data,
        'className': dataClassName.substring(20),
      });
    }
    return super.deserializeByClassName(data);
  }

  void _registerHostProtocols() {
    _iaic.Protocol().registerHostProtocol('careflow', this);
    _iacc.Protocol().registerHostProtocol('careflow', this);
  }

  @override
  String getModuleName() => 'careflow';

  /// Maps any `Record`s known to this [Protocol] to their JSON representation
  ///
  /// Throws in case the record type is not known.
  ///
  /// This method will return `null` (only) for `null` inputs.
  Map<String, dynamic>? mapRecordToJson(Record? record) {
    if (record == null) {
      return null;
    }
    try {
      return _iaic.Protocol().mapRecordToJson(record);
    } catch (_) {}
    try {
      return _iacc.Protocol().mapRecordToJson(record);
    } catch (_) {}
    throw Exception('Unsupported record type ${record.runtimeType}');
  }
}

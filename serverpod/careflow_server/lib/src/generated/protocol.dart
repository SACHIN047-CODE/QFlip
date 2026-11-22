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
import 'package:careflow_server/src/generated/app_notification.dart'
    as _isg7nivl;
import 'package:careflow_server/src/generated/appointment.dart' as _if56o0gl;
import 'package:careflow_server/src/generated/consultation.dart' as _isgezykx;
import 'package:careflow_server/src/generated/crowd_forecast.dart' as _iivyu0wa;
import 'package:careflow_server/src/generated/department.dart' as _iecpec7q;
import 'package:careflow_server/src/generated/doctor.dart' as _im0t7ek3;
import 'package:careflow_server/src/generated/feedback_entry.dart' as _io9tm3kf;
import 'package:careflow_server/src/generated/hospital_resource.dart'
    as _ia2vj98r;
import 'package:careflow_server/src/generated/lab_test.dart' as _i7pug6xi;
import 'package:careflow_server/src/generated/patient.dart' as _igd22o42;
import 'package:careflow_server/src/generated/pharmacy_order.dart' as _ib866nt7;
import 'package:careflow_server/src/generated/prescription.dart' as _i9yb5oa0;
import 'package:careflow_server/src/generated/prescription_item.dart'
    as _ihc2t2el;
import 'package:careflow_server/src/generated/queue_entry.dart' as _in1mm3gn;
import 'package:serverpod/protocol.dart' as _isp;
import 'package:serverpod/serverpod.dart' as _is;
import 'package:serverpod_auth_core_server/serverpod_auth_core_server.dart'
    as _iacs;
import 'package:serverpod_auth_idp_server/serverpod_auth_idp_server.dart'
    as _iais;
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

class Protocol extends _is.DatabaseSerializationManager
    implements _is.DatabaseProtocolDeserializationProvider {
  Protocol._();

  factory Protocol() => _instance;

  static final Protocol _instance = Protocol._().._registerHostProtocols();

  @override
  _is.ProtocolDeserialization get deserializationMetadata =>
      _is.ProtocolDeserialization.cached(
        this,
        types: const [
          _is.getType<_ip1vhxmg.AppNotification>,
          _is.getType<_ihhna9u8.Appointment>,
          _is.getType<_iuyz7l8a.AuthResponse>,
          _is.getType<_ict42zxy.Consultation>,
          _is.getType<_i3d9bte0.CrowdForecast>,
          _is.getType<_i30690kx.Department>,
          _is.getType<_ikf3bi2z.DigitalTwinResult>,
          _is.getType<_ilpr60tn.Doctor>,
          _is.getType<_i31tlqz8.DoctorCapacity>,
          _is.getType<_i3aaegw9.FeedbackEntry>,
          _is.getType<_izw8z7ou.Greeting>,
          _is.getType<_ix06fazv.HospitalResource>,
          _is.getType<_iaadfiwb.LabTest>,
          _is.getType<_ius4lr2t.Patient>,
          _is.getType<_ime8hgwz.PharmacyOrder>,
          _is.getType<_it6yrmua.Prescription>,
          _is.getType<_i0s366uf.PrescriptionItem>,
          _is.getType<_irv4s1m8.QueueEntry>,
          _is.getType<_ih6i7pa0.TriageResponse>,
          _is.getType<_iv73i78m.User>,
          _is.getType<_ip1vhxmg.AppNotification?>,
          _is.getType<_ihhna9u8.Appointment?>,
          _is.getType<_iuyz7l8a.AuthResponse?>,
          _is.getType<_ict42zxy.Consultation?>,
          _is.getType<_i3d9bte0.CrowdForecast?>,
          _is.getType<_i30690kx.Department?>,
          _is.getType<_ikf3bi2z.DigitalTwinResult?>,
          _is.getType<_ilpr60tn.Doctor?>,
          _is.getType<_i31tlqz8.DoctorCapacity?>,
          _is.getType<_i3aaegw9.FeedbackEntry?>,
          _is.getType<_izw8z7ou.Greeting?>,
          _is.getType<_ix06fazv.HospitalResource?>,
          _is.getType<_iaadfiwb.LabTest?>,
          _is.getType<_ius4lr2t.Patient?>,
          _is.getType<_ime8hgwz.PharmacyOrder?>,
          _is.getType<_it6yrmua.Prescription?>,
          _is.getType<_i0s366uf.PrescriptionItem?>,
          _is.getType<_irv4s1m8.QueueEntry?>,
          _is.getType<_ih6i7pa0.TriageResponse?>,
          _is.getType<_iv73i78m.User?>,
          _is.getType<List<String>>,
          _is.getType<List<String>?>,
          _is.getType<List<_iivyu0wa.CrowdForecast>>,
          _is.getType<Map<String, dynamic>>,
          _is.getType<dynamic>,
          _is.getType<List<_if56o0gl.Appointment>>,
          _is.getType<List<String>>,
          _is.getType<List<String>?>,
          _is.getType<List<_isgezykx.Consultation>>,
          _is.getType<List<_iecpec7q.Department>>,
          _is.getType<List<_im0t7ek3.Doctor>>,
          _is.getType<List<_io9tm3kf.FeedbackEntry>>,
          _is.getType<List<_i7pug6xi.LabTest>>,
          _is.getType<List<_isg7nivl.AppNotification>>,
          _is.getType<List<_igd22o42.Patient>>,
          _is.getType<List<_ib866nt7.PharmacyOrder>>,
          _is.getType<List<_i9yb5oa0.Prescription>>,
          _is.getType<List<_ihc2t2el.PrescriptionItem>>,
          _is.getType<List<_in1mm3gn.QueueEntry>>,
          _is.getType<List<_ia2vj98r.HospitalResource>>,
        ],
        modules: const [
          _iais.Protocol.new,
          _iacs.Protocol.new,
          _isp.Protocol.new,
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

  static List<_isp.TableDefinition> get targetTableDefinitions => [
    ..._ownTableDefinitions,
    ..._iais.Protocol().getOwnTableDefinitions(),
    ..._iacs.Protocol().getOwnTableDefinitions(),
    ..._isp.Protocol.targetTableDefinitions,
  ];

  static List<_isp.TableDefinition> get _ownTableDefinitions => [
    _isp.TableDefinition(
      name: 'careflow_appointments',
      dartName: 'Appointment',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'appointmentNumber',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'doctorId',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'departmentId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'appointmentDate',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: false,
          dartType: 'DateTime',
        ),
        _isp.ColumnDefinition(
          name: 'timeSlot',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'scheduled\'',
        ),
        _isp.ColumnDefinition(
          name: 'reason',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'symptoms',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'notes',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_appointments_fk_0',
          columns: ['patientId'],
          referenceTable: 'careflow_patients',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_appointments_fk_1',
          columns: ['doctorId'],
          referenceTable: 'careflow_doctors',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_appointments_fk_2',
          columns: ['departmentId'],
          referenceTable: 'careflow_departments',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_consultations',
      dartName: 'Consultation',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'consultationId',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'doctorId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'departmentId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'queueId',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'chiefComplaints',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'clinicalObservations',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'diagnosis',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'bp',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'pulse',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'temperature',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'spO2',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'weight',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'clinicalNotes',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'followUpDate',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'completed\'',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_consultations_fk_0',
          columns: ['patientId'],
          referenceTable: 'careflow_patients',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_consultations_fk_1',
          columns: ['doctorId'],
          referenceTable: 'careflow_doctors',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_consultations_fk_2',
          columns: ['departmentId'],
          referenceTable: 'careflow_departments',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_consultations_fk_3',
          columns: ['queueId'],
          referenceTable: 'careflow_queue',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_departments',
      dartName: 'Department',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'name',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'code',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'description',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'floor',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'Ground Floor\'',
        ),
        _isp.ColumnDefinition(
          name: 'roomNumbers',
          columnType: _isp.ColumnType.json,
          isNullable: true,
          dartType: 'List<String>?',
        ),
        _isp.ColumnDefinition(
          name: 'averageWaitTimeMinutes',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '20',
        ),
        _isp.ColumnDefinition(
          name: 'maxDailyCapacity',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '250',
        ),
        _isp.ColumnDefinition(
          name: 'isActive',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'true',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'department_code_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'code',
            ),
          ],
          type: 'btree',
          isUnique: true,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_doctors',
      dartName: 'Doctor',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'doctorId',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'userId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'departmentId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'specialization',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'qualification',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'MBBS, MD\'',
        ),
        _isp.ColumnDefinition(
          name: 'roomNumber',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'Room 101\'',
        ),
        _isp.ColumnDefinition(
          name: 'opdShiftStart',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'09:00 AM\'',
        ),
        _isp.ColumnDefinition(
          name: 'opdShiftEnd',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'02:00 PM\'',
        ),
        _isp.ColumnDefinition(
          name: 'isAvailable',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'true',
        ),
        _isp.ColumnDefinition(
          name: 'maxDailyPatients',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '50',
        ),
        _isp.ColumnDefinition(
          name: 'consultationFee',
          columnType: _isp.ColumnType.doublePrecision,
          isNullable: false,
          dartType: 'double',
          columnDefault: '0.0',
        ),
        _isp.ColumnDefinition(
          name: 'averageConsultationTimeMinutes',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '10',
        ),
        _isp.ColumnDefinition(
          name: 'bufferCapacityLimit',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '5',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_doctors_fk_0',
          columns: ['userId'],
          referenceTable: 'careflow_users',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_doctors_fk_1',
          columns: ['departmentId'],
          referenceTable: 'careflow_departments',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'doctor_doctor_id_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'doctorId',
            ),
          ],
          type: 'btree',
          isUnique: true,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_feedback',
      dartName: 'FeedbackEntry',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'departmentId',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'doctorId',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'rating',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'category',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'overall\'',
        ),
        _isp.ColumnDefinition(
          name: 'comments',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'ticketId',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'open\'',
        ),
        _isp.ColumnDefinition(
          name: 'resolutionNote',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'isAnonymous',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_feedback_fk_0',
          columns: ['patientId'],
          referenceTable: 'careflow_patients',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_feedback_fk_1',
          columns: ['departmentId'],
          referenceTable: 'careflow_departments',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_feedback_fk_2',
          columns: ['doctorId'],
          referenceTable: 'careflow_doctors',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_hospital_resources',
      dartName: 'HospitalResource',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'resourceType',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'resourceName',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'identifier',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'ward',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'General Ward A\'',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'available\'',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_lab_tests',
      dartName: 'LabTest',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'testRequestId',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'consultationId',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'doctorId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'testCategory',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'Hematology\'',
        ),
        _isp.ColumnDefinition(
          name: 'testName',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'priority',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'routine\'',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'requested\'',
        ),
        _isp.ColumnDefinition(
          name: 'sampleCollectedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'resultSummary',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'reportUrl',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'completedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_lab_tests_fk_0',
          columns: ['consultationId'],
          referenceTable: 'careflow_consultations',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_lab_tests_fk_1',
          columns: ['patientId'],
          referenceTable: 'careflow_patients',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_lab_tests_fk_2',
          columns: ['doctorId'],
          referenceTable: 'careflow_doctors',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_notifications',
      dartName: 'AppNotification',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'recipientUserId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'title',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'message',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'type',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'queue_update\'',
        ),
        _isp.ColumnDefinition(
          name: 'isRead',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isp.ColumnDefinition(
          name: 'tokenNumber',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'department',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'urgency',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_notifications_fk_0',
          columns: ['recipientUserId'],
          referenceTable: 'careflow_users',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_patients',
      dartName: 'Patient',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'userId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'age',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'gender',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'Male\'',
        ),
        _isp.ColumnDefinition(
          name: 'bloodGroup',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'Unknown\'',
        ),
        _isp.ColumnDefinition(
          name: 'abhaId',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'emergencyContactName',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'emergencyContactPhone',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'address',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'registrationDate',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_patients_fk_0',
          columns: ['userId'],
          referenceTable: 'careflow_users',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'patient_patient_id_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'patientId',
            ),
          ],
          type: 'btree',
          isUnique: true,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_pharmacy_orders',
      dartName: 'PharmacyOrder',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'orderNumber',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'prescriptionId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'totalAmount',
          columnType: _isp.ColumnType.doublePrecision,
          isNullable: false,
          dartType: 'double',
          columnDefault: '0.0',
        ),
        _isp.ColumnDefinition(
          name: 'paymentStatus',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'exempt_gov\'',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'received\'',
        ),
        _isp.ColumnDefinition(
          name: 'dispensedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_pharmacy_orders_fk_0',
          columns: ['prescriptionId'],
          referenceTable: 'careflow_prescriptions',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_pharmacy_orders_fk_1',
          columns: ['patientId'],
          referenceTable: 'careflow_patients',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_prescription_items',
      dartName: 'PrescriptionItem',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'prescriptionId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'medicineName',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'dosage',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'quantity',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'consumptionTiming',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'After breakfast\'',
        ),
        _isp.ColumnDefinition(
          name: 'frequency',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'Twice daily\'',
        ),
        _isp.ColumnDefinition(
          name: 'duration',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'5 days\'',
        ),
        _isp.ColumnDefinition(
          name: 'instructions',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'isDispensed',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_prescription_items_fk_0',
          columns: ['prescriptionId'],
          referenceTable: 'careflow_prescriptions',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_prescriptions',
      dartName: 'Prescription',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'prescriptionNumber',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'consultationId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'doctorId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'dietaryAdvice',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'pending_pharmacy\'',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_prescriptions_fk_0',
          columns: ['consultationId'],
          referenceTable: 'careflow_consultations',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_prescriptions_fk_1',
          columns: ['patientId'],
          referenceTable: 'careflow_patients',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_prescriptions_fk_2',
          columns: ['doctorId'],
          referenceTable: 'careflow_doctors',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_queue',
      dartName: 'QueueEntry',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'tokenNumber',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'sequenceNumber',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'patientId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'doctorId',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'departmentId',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'status',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'waiting\'',
        ),
        _isp.ColumnDefinition(
          name: 'triageLevel',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'green\'',
        ),
        _isp.ColumnDefinition(
          name: 'priorityScore',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '10',
        ),
        _isp.ColumnDefinition(
          name: 'symptoms',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'estimatedWaitTimeMinutes',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '15',
        ),
        _isp.ColumnDefinition(
          name: 'checkInTime',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'callTime',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'consultationStartTime',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'completionTime',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'delayReason',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'isBuffer',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isp.ColumnDefinition(
          name: 'entryType',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'standard\'',
        ),
        _isp.ColumnDefinition(
          name: 'skippedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'rejoinedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'reentryPenaltyApplied',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isp.ColumnDefinition(
          name: 'reentryPenaltyPositions',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '3',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_queue_fk_0',
          columns: ['patientId'],
          referenceTable: 'careflow_patients',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_queue_fk_1',
          columns: ['doctorId'],
          referenceTable: 'careflow_doctors',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
        _isp.ForeignKeyDefinition(
          constraintName: 'careflow_queue_fk_2',
          columns: ['departmentId'],
          referenceTable: 'careflow_departments',
          referenceTableSchema: 'public',
          referenceColumns: ['id'],
          onUpdate: _isp.ForeignKeyAction.noAction,
          onDelete: _isp.ForeignKeyAction.noAction,
          matchType: null,
        ),
      ],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'queue_token_number_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'tokenNumber',
            ),
          ],
          type: 'btree',
          isUnique: false,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'careflow_users',
      dartName: 'User',
      schema: 'public',
      module: 'careflow',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'name',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'email',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'phone',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'passwordHash',
          columnType: _isp.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isp.ColumnDefinition(
          name: 'role',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'isActive',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'true',
        ),
        _isp.ColumnDefinition(
          name: 'isVerified',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'true',
        ),
        _isp.ColumnDefinition(
          name: 'lastLogin',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: true,
          dartType: 'DateTime?',
        ),
      ],
      foreignKeys: [],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'user_email_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'email',
            ),
          ],
          type: 'btree',
          isUnique: true,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
  ];

  static String? getClassNameFromObjectJson(dynamic data) =>
      _is.ProtocolDeserialization.readClassName(data);

  @override
  T deserialize<T>(
    dynamic data, [
    Type? t,
  ]) {
    t ??= T;
    final rawDataClassName = _is.ProtocolDeserialization.readClassName(data);
    final dataClassName = rawDataClassName;
    if (dataClassName != null && dataClassName != getClassNameForType(t)) {
      try {
        return deserializeByClassName({
          'className': dataClassName,
          'data': data,
        });
      } on _is.DeserializationClassNameNotFoundException catch (_) {
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
    if (t == _is.getType<_ip1vhxmg.AppNotification?>()) {
      return (data != null ? _ip1vhxmg.AppNotification.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_ihhna9u8.Appointment?>()) {
      return (data != null ? _ihhna9u8.Appointment.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_iuyz7l8a.AuthResponse?>()) {
      return (data != null ? _iuyz7l8a.AuthResponse.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_ict42zxy.Consultation?>()) {
      return (data != null ? _ict42zxy.Consultation.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_i3d9bte0.CrowdForecast?>()) {
      return (data != null ? _i3d9bte0.CrowdForecast.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_i30690kx.Department?>()) {
      return (data != null ? _i30690kx.Department.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_ikf3bi2z.DigitalTwinResult?>()) {
      return (data != null ? _ikf3bi2z.DigitalTwinResult.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_ilpr60tn.Doctor?>()) {
      return (data != null ? _ilpr60tn.Doctor.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_i31tlqz8.DoctorCapacity?>()) {
      return (data != null ? _i31tlqz8.DoctorCapacity.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_i3aaegw9.FeedbackEntry?>()) {
      return (data != null ? _i3aaegw9.FeedbackEntry.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_izw8z7ou.Greeting?>()) {
      return (data != null ? _izw8z7ou.Greeting.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_ix06fazv.HospitalResource?>()) {
      return (data != null ? _ix06fazv.HospitalResource.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_iaadfiwb.LabTest?>()) {
      return (data != null ? _iaadfiwb.LabTest.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_ius4lr2t.Patient?>()) {
      return (data != null ? _ius4lr2t.Patient.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_ime8hgwz.PharmacyOrder?>()) {
      return (data != null ? _ime8hgwz.PharmacyOrder.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_it6yrmua.Prescription?>()) {
      return (data != null ? _it6yrmua.Prescription.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_i0s366uf.PrescriptionItem?>()) {
      return (data != null ? _i0s366uf.PrescriptionItem.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_irv4s1m8.QueueEntry?>()) {
      return (data != null ? _irv4s1m8.QueueEntry.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_ih6i7pa0.TriageResponse?>()) {
      return (data != null ? _ih6i7pa0.TriageResponse.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_iv73i78m.User?>()) {
      return (data != null ? _iv73i78m.User.fromJson(data) : null) as T;
    }
    if (t == List<String>) {
      return (data as List).map((e) => deserialize<String>(e)).toList() as T;
    }
    if (t == _is.getType<List<String>?>()) {
      return (data != null
              ? (data as List).map((e) => deserialize<String>(e)).toList()
              : null)
          as T;
    }
    if (t == List<_iivyu0wa.CrowdForecast>) {
      return (data as List)
              .map((e) => deserialize<_iivyu0wa.CrowdForecast>(e))
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
    if (t == List<_if56o0gl.Appointment>) {
      return (data as List)
              .map((e) => deserialize<_if56o0gl.Appointment>(e))
              .toList()
          as T;
    }
    if (t == List<String>) {
      return (data as List).map((e) => deserialize<String>(e)).toList() as T;
    }
    if (t == _is.getType<List<String>?>()) {
      return (data != null
              ? (data as List).map((e) => deserialize<String>(e)).toList()
              : null)
          as T;
    }
    if (t == List<_isgezykx.Consultation>) {
      return (data as List)
              .map((e) => deserialize<_isgezykx.Consultation>(e))
              .toList()
          as T;
    }
    if (t == List<_iecpec7q.Department>) {
      return (data as List)
              .map((e) => deserialize<_iecpec7q.Department>(e))
              .toList()
          as T;
    }
    if (t == List<_im0t7ek3.Doctor>) {
      return (data as List)
              .map((e) => deserialize<_im0t7ek3.Doctor>(e))
              .toList()
          as T;
    }
    if (t == List<_io9tm3kf.FeedbackEntry>) {
      return (data as List)
              .map((e) => deserialize<_io9tm3kf.FeedbackEntry>(e))
              .toList()
          as T;
    }
    if (t == List<_i7pug6xi.LabTest>) {
      return (data as List)
              .map((e) => deserialize<_i7pug6xi.LabTest>(e))
              .toList()
          as T;
    }
    if (t == List<_isg7nivl.AppNotification>) {
      return (data as List)
              .map((e) => deserialize<_isg7nivl.AppNotification>(e))
              .toList()
          as T;
    }
    if (t == List<_igd22o42.Patient>) {
      return (data as List)
              .map((e) => deserialize<_igd22o42.Patient>(e))
              .toList()
          as T;
    }
    if (t == List<_ib866nt7.PharmacyOrder>) {
      return (data as List)
              .map((e) => deserialize<_ib866nt7.PharmacyOrder>(e))
              .toList()
          as T;
    }
    if (t == List<_i9yb5oa0.Prescription>) {
      return (data as List)
              .map((e) => deserialize<_i9yb5oa0.Prescription>(e))
              .toList()
          as T;
    }
    if (t == List<_ihc2t2el.PrescriptionItem>) {
      return (data as List)
              .map((e) => deserialize<_ihc2t2el.PrescriptionItem>(e))
              .toList()
          as T;
    }
    if (t == List<_in1mm3gn.QueueEntry>) {
      return (data as List)
              .map((e) => deserialize<_in1mm3gn.QueueEntry>(e))
              .toList()
          as T;
    }
    if (t == List<_ia2vj98r.HospitalResource>) {
      return (data as List)
              .map((e) => deserialize<_ia2vj98r.HospitalResource>(e))
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
      } on _is.DeserializationTypeNotFoundException catch (_) {}
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
    className = _iais.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_idp.$className';
    }
    className = _iacs.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_core.$className';
    }
    className = _isp.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.') ? className : 'serverpod.$className';
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
      return _iais.Protocol().deserializeByClassName({
        ...data,
        'className': dataClassName.substring(19),
      });
    }
    if (dataClassName.startsWith('serverpod_auth_core.')) {
      return _iacs.Protocol().deserializeByClassName({
        ...data,
        'className': dataClassName.substring(20),
      });
    }
    if (dataClassName.startsWith('serverpod.')) {
      return _isp.Protocol().deserializeByClassName({
        ...data,
        'className': dataClassName.substring(10),
      });
    }
    return super.deserializeByClassName(data);
  }

  void _registerHostProtocols() {
    _iais.Protocol().registerHostProtocol('careflow', this);
    _iacs.Protocol().registerHostProtocol('careflow', this);
  }

  @override
  _is.Table? getTableForType(Type t) {
    {
      var table = _iais.Protocol().getTableForType(t);
      if (table != null) {
        return table;
      }
    }
    {
      var table = _iacs.Protocol().getTableForType(t);
      if (table != null) {
        return table;
      }
    }
    {
      var table = _isp.Protocol().getTableForType(t);
      if (table != null) {
        return table;
      }
    }
    switch (t) {
      case _ip1vhxmg.AppNotification:
        return _ip1vhxmg.AppNotification.t;
      case _ihhna9u8.Appointment:
        return _ihhna9u8.Appointment.t;
      case _ict42zxy.Consultation:
        return _ict42zxy.Consultation.t;
      case _i30690kx.Department:
        return _i30690kx.Department.t;
      case _ilpr60tn.Doctor:
        return _ilpr60tn.Doctor.t;
      case _i3aaegw9.FeedbackEntry:
        return _i3aaegw9.FeedbackEntry.t;
      case _ix06fazv.HospitalResource:
        return _ix06fazv.HospitalResource.t;
      case _iaadfiwb.LabTest:
        return _iaadfiwb.LabTest.t;
      case _ius4lr2t.Patient:
        return _ius4lr2t.Patient.t;
      case _ime8hgwz.PharmacyOrder:
        return _ime8hgwz.PharmacyOrder.t;
      case _it6yrmua.Prescription:
        return _it6yrmua.Prescription.t;
      case _i0s366uf.PrescriptionItem:
        return _i0s366uf.PrescriptionItem.t;
      case _irv4s1m8.QueueEntry:
        return _irv4s1m8.QueueEntry.t;
      case _iv73i78m.User:
        return _iv73i78m.User.t;
    }
    return null;
  }

  @override
  List<_isp.TableDefinition> getTargetTableDefinitions() =>
      targetTableDefinitions;

  @override
  List<_isp.TableDefinition> getOwnTableDefinitions() => _ownTableDefinitions;

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
      return _iais.Protocol().mapRecordToJson(record);
    } catch (_) {}
    try {
      return _iacs.Protocol().mapRecordToJson(record);
    } catch (_) {}
    throw Exception('Unsupported record type ${record.runtimeType}');
  }
}

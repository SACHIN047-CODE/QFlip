class ApiEndpoints {
  // Base API configuration
  // For Android Emulator use: http://10.0.2.2:8000/api
  // For iOS Simulator / Web / Desktop use: http://localhost:8000/api
  // For physical device over Wi-Fi, replace with your local machine IP (e.g. http://192.168.1.5:8000/api)
  static const String baseUrl = 'http://localhost:8000/api';

  // Auth
  static const String login = '$baseUrl/auth/login';
  static const String register = '$baseUrl/auth/register';
  static const String me = '$baseUrl/auth/me';
  static const String verifyDoctorPasskey = '$baseUrl/auth/verify-doctor-passkey';

  // Queue & Tokens
  static const String queueTokens = '$baseUrl/queues/token';
  static const String myToken = '$baseUrl/queues/my-token';
  static const String skippedQueue = '$baseUrl/queues/skipped';
  static String departmentQueue(String departmentId) => '$baseUrl/queues/department/$departmentId';
  static String doctorCapacity(String doctorId) => '$baseUrl/queues/doctor/$doctorId/capacity';
  static String updateQueueStatus(String queueId) => '$baseUrl/queues/$queueId/status';

  // Appointments
  static const String appointments = '$baseUrl/appointments';
  static String checkInAppointment(String id) => '$baseUrl/appointments/$id/check-in';

  // Departments & Doctors
  static const String departments = '$baseUrl/departments';
  static const String doctors = '$baseUrl/doctors';
  static const String doctorDashboard = '$baseUrl/doctors/dashboard';
  static const String toggleAvailability = '$baseUrl/doctors/availability';

  // Patients
  static const String patientProfile = '$baseUrl/patients/me';
  static const String patientRegisterStaff = '$baseUrl/patients/register';
  static const String patientSearch = '$baseUrl/patients/search';

  // AI & Triage
  static const String aiTriage = '$baseUrl/ai/triage';
  static const String crowdPrediction = '$baseUrl/ai/crowd-prediction';
  static const String digitalTwin = '$baseUrl/ai/digital-twin';
}

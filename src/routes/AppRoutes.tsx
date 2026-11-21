import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { PatientLayout } from '../layouts/PatientLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { DoctorGuard } from './DoctorGuard';
import { useAuth } from '../context/AuthContext';

// Public & Auth Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage, ForgotPasswordPage } from '../pages/public/RegisterPage';
import { FeedbackPage } from '../pages/public/FeedbackPage';

// Patient Portal Pages
import { PatientDashboard } from '../pages/patient/PatientDashboard';
import { SmartQueueTracker } from '../pages/patient/SmartQueueTracker';
import { PatientRegistration } from '../pages/patient/PatientRegistration';
import { MedicalHistoryPage } from '../pages/patient/MedicalHistoryPage';
import { DigitalPrescriptionsPage } from '../pages/patient/DigitalPrescriptionsPage';
import { LabTestsPage } from '../pages/patient/LabTestsPage';
import { PharmacyOrderPage, NotificationsPage } from '../pages/patient/PharmacyOrderPage';

// Doctor Pages
import { DoctorDashboard } from '../pages/doctor/DoctorDashboard';
import {
  PatientQueueList,
  DoctorSchedule,
  PrescriptionManager,
} from '../pages/doctor/PatientQueueList';

// Staff Pages
import { StaffDashboard } from '../pages/staff/StaffDashboard';
import { TokenManagement } from '../pages/staff/TokenManagement';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import {
  DepartmentsManagement,
  ResourceManagement,
} from '../pages/admin/DepartmentsManagement';
import { DoctorsManagement, StaffManagement } from '../pages/admin/DoctorsManagement';
import {
  AnalyticsPage,
  ReportsPage,
  ComplaintsManagement,
} from '../pages/admin/AnalyticsPage';

// Lab Pages
import { LabDashboard } from '../pages/lab/LabDashboard';

// Pharmacy Pages
import { PharmacyDashboard } from '../pages/pharmacy/PharmacyDashboard';

// AI Pages
import {
  AiDashboard,
  CrowdPrediction,
  QueueOptimization,
  DigitalTwinSimulation,
} from '../pages/ai/AiDashboard';

// Root Dispatcher Component
const RootRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'staff') return <Navigate to="/staff/dashboard" replace />;
  if (user.role === 'lab') return <Navigate to="/lab/dashboard" replace />;
  if (user.role === 'pharmacy') return <Navigate to="/pharmacy/dashboard" replace />;
  return <Navigate to="/patient/dashboard" replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root Path: Force login first */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public Auth Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Route>

      {/* Patient Portal Pages (Protected - Only Logged-in Patients & Staff/Admin) */}
      <Route element={<ProtectedRoute allowedRoles={['patient', 'staff', 'admin']} />}>
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="queue" element={<SmartQueueTracker />} />
          <Route path="registration" element={<PatientRegistration />} />
          <Route path="appointments" element={<PatientDashboard />} />
          <Route path="medical-history" element={<MedicalHistoryPage />} />
          <Route path="prescriptions" element={<DigitalPrescriptionsPage />} />
          <Route path="lab-tests" element={<LabTestsPage />} />
          <Route path="pharmacy" element={<PharmacyOrderPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      {/* Doctor Dashboard Pages (Protected - Doctors Only) */}
      <Route element={<ProtectedRoute allowedRoles={['doctor', 'admin']} />}>
        <Route element={<DoctorGuard />}>
          <Route
            path="/doctor"
            element={<DashboardLayout title="Doctor OPD Consultation Desk" subtitle="Dr. Rajesh Sharma, MD • Room 12" />}
          >
            <Route index element={<Navigate to="/doctor/dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<PatientQueueList />} />
            <Route path="consultation" element={<DoctorDashboard />} />
            <Route path="prescriptions" element={<PrescriptionManager />} />
            <Route path="schedule" element={<DoctorSchedule />} />
          </Route>
        </Route>
      </Route>

      {/* Registration Staff Dashboard Pages (Protected - Staff Only) */}
      <Route element={<ProtectedRoute allowedRoles={['staff', 'admin']} />}>
        <Route
          path="/staff"
          element={<DashboardLayout title="Front Desk Registration & Triage" subtitle="Registration Counter #02 • OPD Main Hall" />}
        >
          <Route index element={<Navigate to="/staff/dashboard" replace />} />
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="register-patient" element={<StaffDashboard />} />
          <Route path="patient-search" element={<StaffDashboard />} />
          <Route path="token-management" element={<TokenManagement />} />
        </Route>
      </Route>

      {/* Administrator Dashboard Pages (Protected - Admin Only) */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DoctorGuard />}>
          <Route
            path="/admin"
            element={<DashboardLayout title="Hospital Operations Command Admin" subtitle="Civil Hospital Ambala • Operations Center" />}
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<DoctorsManagement />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="departments" element={<DepartmentsManagement />} />
            <Route path="resources" element={<ResourceManagement />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="complaints" element={<ComplaintsManagement />} />
          </Route>
        </Route>
      </Route>

      {/* Laboratory Dashboard Pages (Protected - Lab Staff & Admin Only) */}
      <Route element={<ProtectedRoute allowedRoles={['lab', 'admin']} />}>
        <Route
          path="/lab"
          element={<DashboardLayout title="Clinical Diagnostics & Laboratory" subtitle="Pathology, Hematology & Radiology Stream" />}
        >
          <Route index element={<Navigate to="/lab/dashboard" replace />} />
          <Route path="dashboard" element={<LabDashboard />} />
          <Route path="test-requests" element={<LabDashboard />} />
          <Route path="results" element={<LabDashboard />} />
        </Route>
      </Route>

      {/* Pharmacy Dashboard Pages (Protected - Chemist / Pharmacy Staff & Admin Only) */}
      <Route element={<ProtectedRoute allowedRoles={['pharmacy', 'admin']} />}>
        <Route
          path="/pharmacy"
          element={<DashboardLayout title="Jan Aushadhi OPD Pharmacy Desk" subtitle="Dispensing Counters & Central Medicine Formulary" />}
        >
          <Route index element={<Navigate to="/pharmacy/dashboard" replace />} />
          <Route path="dashboard" element={<PharmacyDashboard />} />
          <Route path="orders" element={<PharmacyDashboard />} />
          <Route path="medicines" element={<PharmacyDashboard />} />
        </Route>
      </Route>

      {/* AI Intelligence & Digital Twin Pages (Protected - Admin & Doctor Only) */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'doctor']} />}>
        <Route
          path="/ai"
          element={<DashboardLayout title="Health Logistics AI & Digital Twin" subtitle="Neural Crowd Forecasting & Simulation Engine" />}
        >
          <Route index element={<Navigate to="/ai/dashboard" replace />} />
          <Route path="dashboard" element={<AiDashboard />} />
          <Route path="crowd-prediction" element={<CrowdPrediction />} />
          <Route path="queue-optimization" element={<QueueOptimization />} />
          <Route path="digital-twin" element={<DigitalTwinSimulation />} />
        </Route>
      </Route>

      {/* Fallback to Root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

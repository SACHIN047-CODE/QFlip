# CAREFLOW (QFlip) — Serverpod Migration Status

This document tracks the status of migrating CAREFLOW's Express backend into Serverpod 4.1.2.

---

## 1. Migration Summary

| Component | Status | Details |
|---|---|---|
| **Serverpod Project Structure** | ✅ Complete | Official Serverpod 4.1.2 layout in `serverpod/` |
| **Serverpod App Studio Compatibility** | ✅ Complete | `serverpod/careflow_server` has valid `pubspec.yaml` with `serverpod: 4.1.2` |
| **Companion Flutter App (`careflow_flutter`)** | ✅ Complete | Generated in `serverpod/careflow_flutter` with platform targets (Android, iOS, Web, Windows) |
| **Database Models & Tables** | ✅ Complete | 19 serializable models & PostgreSQL tables in `lib/src/models/` |
| **Database Migrations** | ✅ Complete | Migration generated: `20261122061645872-careflow-schema` |
| **Authentication & Roles** | ✅ Complete | `UserAuthEndpoint` with 6 roles, password check, and 4-digit Doctor PIN (`7788`) |
| **OPD Queue Management** | ✅ Complete | `QueueEndpoint` with token generation, call next, skip, rejoin with 3-position penalty, doctor buffer capacity |
| **Doctor Consultations** | ✅ Complete | `ConsultationEndpoint` with automated cross-role sync to Pharmacy and Laboratory |
| **Prescriptions & Jan Aushadhi** | ✅ Complete | `PrescriptionEndpoint` and `PharmacyEndpoint` |
| **Laboratory Diagnostics** | ✅ Complete | `LaboratoryEndpoint` with test categories and report status tracking |
| **Patient Profile & Medical History**| ✅ Complete | `PatientEndpoint` |
| **Appointments** | ✅ Complete | `AppointmentEndpoint` |
| **Hospital Resources** | ✅ Complete | `ResourceEndpoint` (beds, ventilators, wheelchairs, oxygen) |
| **Feedback & Grievances** | ✅ Complete | `FeedbackEndpoint` with tracking ticket generation |
| **AI Crowd Forecasting & Digital Twin**| ✅ Complete | `AiEndpoint` with neural forecast, digital twin simulation, and multi-lingual symptom triage |
| **Serverpod Cloud Configuration** | ✅ Complete | `scloud.yaml` configured with `projectId` and pre-deploy hooks |
| **React Frontend Verification** | ✅ Complete | React 18 build verified clean (`npm run build` exits 0) |

---

## 2. Migrated Endpoints vs Express Backend

| Express Route (`/api/...`) | Serverpod Endpoint (`lib/src/endpoints/`) | Status |
|---|---|---|
| `POST /auth/login` | `UserAuthEndpoint.login` | ✅ Migrated |
| `POST /auth/register` | `UserAuthEndpoint.register` | ✅ Migrated |
| `POST /auth/verify-doctor-pin` | `UserAuthEndpoint.verifyDoctorPin` | ✅ Migrated |
| `GET /queues/tokens` | `QueueEndpoint.getTokens` | ✅ Migrated |
| `POST /queues/tokens` | `QueueEndpoint.generateToken` | ✅ Migrated |
| `POST /queues/call-next` | `QueueEndpoint.callNext` | ✅ Migrated |
| `PUT /queues/:id/status` (skip) | `QueueEndpoint.skipPatient` | ✅ Migrated |
| `POST /queues/rejoin` | `QueueEndpoint.rejoinPatient` (3-pos penalty) | ✅ Migrated |
| `GET /queues/doctor/:id/capacity`| `QueueEndpoint.checkDoctorCapacity` | ✅ Migrated |
| `POST /consultations` | `ConsultationEndpoint.createConsultation` | ✅ Migrated |
| `GET /prescriptions` | `PrescriptionEndpoint.getPrescriptions` | ✅ Migrated |
| `GET /laboratory/tests` | `LaboratoryEndpoint.getTests` | ✅ Migrated |
| `GET /pharmacy/orders` | `PharmacyEndpoint.getOrders` | ✅ Migrated |
| `POST /feedback` | `FeedbackEndpoint.submitFeedback` | ✅ Migrated |
| `GET /resources` | `ResourceEndpoint.getResources` | ✅ Migrated |
| `GET /ai/forecast/crowd` | `AiEndpoint.getCrowdForecast` | ✅ Migrated |
| `POST /ai/digital-twin/simulate`| `AiEndpoint.simulateDigitalTwin` | ✅ Migrated |
| `POST /ai/triage` | `AiEndpoint.triageSymptoms` | ✅ Migrated |

---

## 3. Real-Time & Socket.IO Migration

- In the original Express backend, Socket.IO was used to broadcast queue token changes to `dept:<id>` rooms.
- In Serverpod, real-time messaging is handled natively by Serverpod's built-in message streaming:
  `session.messages.postMessage('dept_$departmentId', queueEntry)`
- The React frontend currently uses Axios polling / reactive intervals when reading live queues, which is fully compatible with Serverpod's HTTP endpoints.

---

## 4. Outstanding Manual Steps for Cloud Deployment

1. **Serverpod Cloud Account**: Run `scloud auth login` in PowerShell to authenticate.
2. **Cloud Deploy**: Run `scloud deploy` from `serverpod/careflow_server`.
3. **Database**: Serverpod Cloud automatically runs PostgreSQL migrations on deployment.
4. **Environment Variables**: Use `scloud variable set <KEY> <VALUE>` for any external API credentials (e.g. `GEMINI_API_KEY`).

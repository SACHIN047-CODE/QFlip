# CareFlow (QFlip) Mobile Application (Flutter)

A cross-platform Flutter (Dart) mobile application for the **CareFlow (QFlip) AI-Powered Hospital Patient-Flow & OPD Queue Management Platform**, integrated with the existing Node.js + Express backend and MongoDB database.

---

## 🏗️ Architecture & Features

### 1. Integration with Existing Node.js + Express Backend
- **Direct HTTP API Requests:** Connects seamlessly with the existing `/api` REST endpoints:
  - Auth: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
  - Queues & Tokens: `/api/queues/token`, `/api/queues/my-token`, `/api/queues/department/:id`
  - Appointments: `/api/appointments`
  - Doctors & Departments: `/api/doctors`, `/api/departments`
  - AI & Triage: `/api/ai/triage`, `/api/ai/crowd-prediction`, `/api/ai/digital-twin`
- **State & Session Persistence:** Uses `shared_preferences` for JWT authentication tokens and cached user profiles.
- **Error Handling:** Robust `ApiException` mapping with friendly user alerts and offline tolerance.

### 2. Core Modules & Workflows
- **Authentication & RBAC:**
  - One-click demo accounts for all roles (Patient, Doctor, Staff, Admin)
  - Full registration with ABHA Health ID, Age, Gender, and password hashing
- **Patient Portal:**
  - Live Active Token Card with estimated wait time countdown and room information
  - Smart Queue Tracker with visual progression steps (Checked-in -> Waiting -> Called -> In Consultation -> Completed)
  - Book OPD Appointment with department and consultant doctor dropdowns
- **AI Voice OPD Assistant (Google Gemini 3.8 Flash + RAG):**
  - Single-prompt voice/text OPD token booking
  - Full official Knowledge Base PDF Q&A grounding with section citations
  - Automatic emergency detection & 108 ambulance referral
- **Doctor Consultation Desk:**
  - Real-time patient queue list (Waiting, Completed, Skipped)
  - Call Next, Mark In Consultation, and Complete actions
  - Availability toggle (Available / Away)
- **Staff Registration Desk:**
  - Walk-in patient token generator and print slip preview
- **Admin Operations:**
  - Live queue statistics, average wait time, and digital twin system health

### 3. UI Design System
- Matches the CareFlow Web visual identity:
  - Primary: Deep Teal (`#0F766E`) and Emerald (`#14B8A6`)
  - Accent: Medical Blue (`#2563EB`)
  - Background: Clinical Slate (`#F8FAFC`)
  - Typography: Inter via `google_fonts`

---

## 🚀 How to Run the Flutter App

### Prerequisites
1. [Flutter SDK](https://flutter.dev/docs/get-started/install) installed (version >= 3.0.0).
2. Existing CareFlow backend running (`npm run server` on port 8000).

### Configuration
In `mobile/lib/core/constants/api_endpoints.dart`:
- **Android Emulator:** `http://10.0.2.2:8000/api`
- **iOS Simulator / Web / Desktop:** `http://localhost:8000/api`
- **Physical Device:** `http://<YOUR_COMPUTER_LOCAL_IP>:8000/api`

### Run Command
```bash
cd mobile
flutter pub get
flutter run
```

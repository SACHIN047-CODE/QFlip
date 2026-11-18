# QFLIP — AI-Powered Hospital Patient-Flow & Operations Management Platform

QFlip is a production-oriented, enterprise healthcare technology frontend built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed specifically for Indian Civil, District, and Sub-divisional hospitals under the **National Health Mission (NHM)** and **Ayushman Bharat Digital Mission (ABDM)**.

Implemented faithfully from the approved **Google Stitch** design system.

---

## 🚀 Live Demo & Development

### 1. Installation & Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Server runs on: http://localhost:5173

# Build for production
npm run build
```

---

## 🎨 Design System Implementation

The application strictly adopts the Google Stitch color palette, typographic hierarchy, and layout language:

- **Color Tokens**:
  - Yellow Primary Accent (`#F2D500` / `bg-accent text-on-accent`): Call-to-actions, active token badges, and priority highlights.
  - Secondary Clinical Blue (`#2585E8` / `text-secondary`): Navigation links, department badges, and interactive vectors.
  - Deep Charcoal Typography (`#343A40` / `text-light-primary`): Crisp enterprise readability.
  - Neutral Backgrounds (`#F5F6F7` / `bg-light-bg`): High contrast, hospital-grade clean surfaces (`#FFFFFF`).
  - Subtle Borders (`#DEE2E6` / `border-light-outline`).
- **Typography**:
  - Headlines & Displays: **Plus Jakarta Sans**
  - Body Text: **Rubik**
  - Monospace Identifiers & Tokens: **Spline Sans Mono**
- **Wavenet Geometric Vectors**:
  - Angled polygon hero masks and chambered contour lines faithfully recreated via Tailwind CSS and SVG paths.

---

## 🏛 Application Modules & Routes

### 1. Public Portal
- `/` — Homepage featuring Hero, Statistics, 7-Step Patient Journey, Clinical Solutions, Interactive Hospital Map, and Live OPD Telemetry.
- `/login` — Unified Hospital SSO supporting all 6 roles (Patient, Doctor, Staff, Admin, Lab, Pharmacy).
- `/register` — Ayushman Bharat (ABHA) Registration.
- `/forgot-password` — Password reset with OTP simulation.
- `/feedback` — Patient voice, 5-star experience rating, wait-time grievance submission, and ticket status tracker (`TCK-XXXX`).

### 2. Patient Experience Portal (`/patient`)
- `/patient/dashboard` — Active token badge, estimated wait countdown, doctor availability, and ABDM health locker summary.
- `/patient/queue` — **Smart Queue Tracker** featuring:
  - Your Token: `OPD-104`
  - Current Token: `OPD-098`
  - Patients Ahead: `06`
  - Estimated Waiting: `25 mins`
  - Live Browser Speech Synthesis public announcement trigger.
- `/patient/registration` — Voice-based intake supporting **Hindi**, **English**, and **Punjabi** with automated department assignment and thermal slip printing.
- `/patient/prescriptions` — Digital QR prescriptions synced directly to Jan Aushadhi Chemist counters.
- `/patient/lab-tests` — Diagnostic investigations tracker with verified PDF download.
- `/patient/pharmacy` — Medicine packaging and dispensing counter status.
- `/patient/medical-history` — ABDM Health Locker past consultations and discharge summaries.
- `/patient/notifications` — Real-time SMS and telco broadcast history.

### 3. Doctor Consultation Desk (`/doctor`)
- `/doctor/dashboard` — Live Consultation Room with:
  - Patient vital signs (BP, Pulse, SpO2, Temp).
  - Queue action controls: **Call Next**, **Skip Patient**, **Complete Consultation**, **Mark Unavailable**.
  - Digital prescription builder & ICD-10 diagnosis.
  - One-click laboratory investigation orders.
- `/doctor/patients` — Patient waiting roster with priority filters (Emergency, Senior Citizen, Pediatric).
- `/doctor/prescriptions` — Standardized clinical Rx templates.
- `/doctor/schedule` — Shift schedules, ward rounds, and on-call trauma reserves.

### 4. Registration & Counter Staff Desk (`/staff`)
- `/staff/dashboard` — High-speed counter workflow (`14.2 sec` average token issue time) with ABHA / Aadhaar scanner search and emergency triage override.
- `/staff/token-management` — Master token registry with reprint and cancellation controls.

### 5. Hospital Administrator Command Center (`/admin`)
- `/admin/dashboard` — Executive operations overview with **Recharts** visualizations:
  - Hourly patient footfall vs. wait duration curves.
  - Department volume breakdowns.
  - Active beds, stretchers, wheelchairs, and O2 cylinders tracking.
  - Real-time explainable AI recommendations with single-click approval.
- `/admin/departments` — Department-wise flow and capacity overload monitoring.
- `/admin/doctors` — Clinician roster and room assignment.
- `/admin/staff` — Counter staff performance and token issue telemetry.
- `/admin/resources` — Hospital beds and shared medical equipment management.
- `/admin/analytics` — Peak-hour rush analysis and NHM 20-min wait benchmark compliance.
- `/admin/reports` — Statutory OPD and diagnostic reports generation.
- `/admin/complaints` — Patient grievance redressal and resolution tracking.

### 6. AI Intelligence & Digital Twin Simulator (`/ai`)
- `/ai/dashboard` — Neural volume forecasting with high-risk surge alerts.
- `/ai/digital-twin` — **Interactive Digital Twin Simulation Engine**:
  - Slider controls for Patient Arrival Rush (50% – 250%), Doctor Staffing Ratio, Voice Triage Adoption, and Pharmacy Bundles.
  - Live Before-and-After operational comparisons (Wait Time, Queue Depth, Bottleneck Department, Physician Burnout Risk).
- `/ai/queue-optimization` — Explainable AI directives with auditable telemetry evidence.

### 7. Clinical Laboratory Dashboard (`/lab`)
- `/lab/dashboard` — Test request queues across Hematology, Biochemistry, and Radiology with finding inputs and critical result alerts.

### 8. Jan Aushadhi Pharmacy Dashboard (`/pharmacy`)
- `/pharmacy/dashboard` — Incoming digital Rx orders, pre-bundling kits, and live medicine inventory rack tracking.

---

## 🔌 API Integration Architecture

The frontend is built on a clean, centralized API service structure:

```
src/
├── services/
│   ├── api.ts              # Axios client with request/response interceptors & token injection
│   ├── authService.ts      # Authentication & role management
│   ├── queueService.ts     # Reactive token queue engine & state persistence
│   ├── patientService.ts   # Medical history, notifications, and feedback
│   ├── doctorService.ts    # Consultation notes, prescriptions, and duty schedule
│   ├── adminService.ts     # Departments, doctors, staff, resources, and reports
│   ├── laboratoryService.ts# Diagnostic orders & lab findings
│   ├── pharmacyService.ts  # Medication dispensing & inventory
│   ├── aiService.ts        # Digital Twin simulations & crowd forecasts
│   └── mockData.ts         # Realistic fallback data matching Indian Civil Hospitals
```

Configure the backend URL in `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK_API=true
```
When `VITE_USE_MOCK_API=false`, all services automatically query the real backend via Axios with identical interfaces.

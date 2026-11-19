# CAREFLOW (QFlip) — AI-Powered Hospital Patient-Flow & Operations Management Platform

[![Backend Deploy](https://img.shields.io/badge/Render-Backend%20Live-success?style=for-the-badge&logo=render)](https://qflip-1.onrender.com/api/health)
[![API Status](https://img.shields.io/badge/API-Online-blue?style=for-the-badge)](https://qflip-1.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socketdotio)](https://socket.io/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Triage-8E75C2?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)

---

## 📌 Important Links & Quick Access

| Resource | URL / Location | Description |
|---|---|---|
| **Live Production Backend** | [https://qflip-1.onrender.com/api](https://qflip-1.onrender.com/api) | Hosted REST API on Render |
| **API Health Check** | [https://qflip-1.onrender.com/api/health](https://qflip-1.onrender.com/api/health) | Live server & database health status |
| **Live Root Status** | [https://qflip-1.onrender.com/](https://qflip-1.onrender.com/) | Live API welcome endpoint |
| **GitHub Repository** | [https://github.com/SACHIN047-CODE/QFlip](https://github.com/SACHIN047-CODE/QFlip) | Source code repository |
| **Full API Documentation** | [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) | Endpoint specifications, payloads & response formats |
| **Local Frontend** | `http://localhost:5173` | React + Vite client |
| **Local Backend** | `http://localhost:8000/api` | Express + Socket.IO server |

---

## 💡 The Project Idea & Problem Statement

### The Problem in Indian Public Healthcare
In Indian Civil, District, and Sub-divisional hospitals operating under the **National Health Mission (NHM)**:
- **Severe OPD Overcrowding:** Over 3,000–5,000 patients arrive every morning, resulting in physical stampedes at registration counters and doctor cabins.
- **Zero Transparency & Blind Waiting:** Patients and their families wait 3–5 hours without knowing how many people are ahead of them or if their doctor has gone on emergency rounds.
- **Disconnected Downstream Departments:** When a doctor writes a paper prescription, the patient must stand in yet another unorganized line at the **Jan Aushadhi Pharmacy** and **Diagnostic Laboratory**, where paper slips are frequently misplaced.
- **Lack of Predictive Hospital Operations:** Hospital superintendents cannot forecast daily crowd surges, detect departmental bottlenecks, or dynamically allocate emergency stretchers, beds, and wheelchairs.

### The Solution: CAREFLOW (QFlip)
**CAREFLOW** is a closed-loop hospital operations platform designed to digitize the entire patient journey:
1. **Intelligent Triage & Token Generation:** Instant identification via unique Patient IDs (`CF-2026-XXXX`) and sequential department-specific daily tokens (`OPD-CARD-101`).
2. **Dynamic Waiting-Time Algorithm:** Real-time wait-time calculation based on patients ahead, average consultation duration, active doctor count, and emergency priority queuing.
3. **Closed-Loop Workflow:** Doctors create digital consultations that automatically route electronic prescriptions to the in-house **Jan Aushadhi Pharmacy** and diagnostic test orders to the **Laboratory**.
4. **Multilingual AI Assistant (Google Gemini):** Patient symptom assessment in English, Hindi, and Punjabi to guide patients to the appropriate department without medical misdirection.
5. **Hospital Digital Twin & Operations Command Center:** Real-time operational simulation for hospital administrators to test hypothetical scenarios (e.g., +150 surge patients or 2 doctors on leave) before real-world impact.

---

## 🔄 End-to-End Hospital Patient Flow (Operational Lifecycle)

CAREFLOW is built as a single, interconnected operational pipeline where every step advances the patient's state and updates the corresponding dashboard:

```
[Patient Arrival]
       │
       ▼
1. REGISTRATION & SMART TRIAGE
   ├── Walk-in Counter / Online Booking
   ├── Patient ID Generation (CF-2026-0001)
   ├── AI Multilingual Symptom Analysis (Cardiology, Ortho, etc.)
   └── Emergency Prioritization (Red/Yellow/Green)
       │
       ▼
2. REAL-TIME OPD QUEUE DISPATCH
   ├── Department Token Generated (OPD-GEN-101)
   ├── Dynamic Wait-Time Calculation (e.g., 24 mins)
   └── Socket.IO Broadcast to Patient Tracker & OPD Display
       │
       ▼
3. DOCTOR CONSULTATION CABIN
   ├── Doctor calls token via Doctor Portal (Queue: 'in_consultation')
   ├── Doctor reviews patient history & records symptoms/diagnosis
   └── Doctor writes Treatment Plan & Orders
       │
       ├───► Electronic Prescription Forwarded ──────┐
       │                                             │
       └───► Diagnostic Lab Request Dispatched ──┐   │
                                                 │   │
       ┌─────────────────────────────────────────┘   │
       ▼                                             │
4. LABORATORY DIAGNOSTICS                            │
   ├── Lab staff receives test order in real-time    │
   ├── Sample collection & token tracking            │
   └── Medical report uploaded & notified to patient │
                                                     │
       ┌─────────────────────────────────────────────┘
       ▼
5. JAN AUSHADHI PHARMACY
   ├── Order received directly from Doctor's prescription
   ├── Pharmacist verifies medicine stock availability
   └── Medicines packaged & marked 'dispensed'
       │
       ▼
6. VISIT COMPLETION & DIGITAL TWIN ANALYTICS
   ├── Queue status marked 'completed'
   ├── Doctor workload & turnaround time recorded
   ├── Patient submits star rating & feedback (AI categorized)
   └── Digital Twin updates bed/resource utilization metrics
```

---

## 🏗 System Architecture & Tech Flow

```
                     ┌──────────────────────────────────────────────┐
                     │          CAREFLOW Frontend (React)           │
                     │  Vite + TypeScript + Tailwind CSS + Lucide   │
                     │    Local: http://localhost:5173              │
                     └──────────────┬───────────────────▲───────────┘
                                    │ HTTP REST (Axios) │ WebSockets
                                    │                   │ (Socket.IO)
                     ┌──────────────▼───────────────────┴───────────┐
                     │           CAREFLOW Backend (Express)         │
                     │   Node.js (ESM) + Mongoose + JWT + Helmet    │
                     │   Local:  http://localhost:8000/api          │
                     │   Render: https://qflip-1.onrender.com/api   │
                     └──────────────┬───────────────────▲───────────┘
                                    │                   │
                     ┌──────────────▼───────────┐ ┌─────┴───────────┐
                     │    MongoDB (Atlas/Local) │ │ Google Gemini   │
                     │  15 Schemas & Indexes    │ │ AI Triage Engine│
                     └──────────────────────────┘ └─────────────────┘
```

### Technology Stack Details:
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Recharts, React Hook Form.
- **Backend:** Node.js (ES Modules), Express.js, Socket.IO for duplex events, Mongoose ODM.
- **Database:** MongoDB (Local or MongoDB Atlas) with 15 interconnected schemas & optimized indexes.
- **Security & RBAC:** JWT authentication, bcryptjs password hashing, Helmet, CORS, Express Rate Limit, Express Validator.
- **AI Engine:** Google Gemini API (`@google/generative-ai`) for multilingual clinical triage, surge forecasting, and hospital digital twin simulation.
- **Deployment:** Render (Cloud Node.js Web Service) + MongoDB Atlas.

---

## 👥 Role-Based Access Control (RBAC)

CAREFLOW features 6 dedicated user roles with isolated privileges and views:

| Role | Permitted Actions & Responsibilities | Demo Login |
|---|---|---|
| **Administrator** | Operations Command Center, Bed/Stretcher management, Department analytics, Doctor shift rosters, AI Surge forecasting, Audit logs | `admin@careflow.gov.in` |
| **Doctor** | Department OPD queue board, Call next patient, Skip token, Record clinical notes & diagnosis, Dispatch e-prescriptions & lab requisitions | `doctor@careflow.gov.in` |
| **Registration Staff** | Patient search/registration, Issue daily OPD tokens, Emergency queue prioritization override | `staff@careflow.gov.in` |
| **Laboratory Staff** | Real-time diagnostic requisition board, Test processing, Secure medical report upload | `lab@careflow.gov.in` |
| **Pharmacy Staff** | Live e-prescriptions feed, Medicine inventory check, Order preparation, Dispensing confirmation | `pharmacy@careflow.gov.in` |
| **Patient** | Live token countdown tracker, Digital prescriptions, Diagnostic lab reports, Patient feedback submission | `patient@careflow.gov.in` |

> **Password for all seeded accounts:** `Careflow@2026`

---

## ⚡ Commands to Run CAREFLOW

### 1. Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017/careflow`) or MongoDB Atlas URI

---

### 2. Installation
Install dependencies for both frontend and backend in one go:
```bash
# 1. Install root dependencies (React, Vite, concurrently)
npm install

# 2. Install backend dependencies (Express, Mongoose, Socket.IO, Gemini)
npm install --prefix backend
```

---

### 3. Database Seeding (Populate Demo Data)
Run the automated seeder to generate 7 departments, 30+ realistic patients, active doctors, queues, consultations, lab tests, and hospital resources:
```bash
npm run seed
```

---

### 4. Run Both Frontend & Backend (Single Command) 🚀
Start both the React Vite frontend and the Express backend concurrently:
```bash
npm run dev:all
```
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8000/api](http://localhost:8000/api)
- **Health Check:** [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

### 5. Running Components Separately (Optional)

#### Run Backend Only:
```bash
# Development mode with auto-reload (nodemon)
npm run server

# Production mode
npm run server:start
```

#### Run Frontend Only:
```bash
npm run dev
```

#### Run Backend Automated Tests:
```bash
npm run test:backend
```

---

## 🌐 Connecting Frontend to Live Deployed Backend

In your root `.env` file, configure your API target:

```env
# Point to the live Render deployed backend:
VITE_API_BASE_URL=https://qflip-1.onrender.com/api

# Set to false to use the live cloud backend database:
VITE_USE_MOCK_API=false

# Hospital Branding
VITE_APP_NAME=CareFlow
VITE_HOSPITAL_NAME="Civil Hospital Ambala"
```

*(If you are developing offline without internet, keep `VITE_USE_MOCK_API=true` or point `VITE_API_BASE_URL=http://localhost:8000/api`)*.

---

## ⚙️ Environment Variables Reference

### Backend (`backend/.env`):
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/careflow
JWT_SECRET=careflow_super_secure_jwt_secret_key_2026_dev
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
DOCTOR_PASSKEY=7788
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend (`.env`):
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK_API=false
VITE_APP_NAME=CareFlow
VITE_HOSPITAL_NAME="Civil Hospital Ambala"
```

---

## 📁 Repository Directory Structure

```
CareFlow/
├── backend/                       # Complete Express / Node.js Backend
│   ├── src/
│   │   ├── config/                # Database, Cloudinary, Logger, Env config
│   │   ├── controllers/           # 13 REST Controllers (Auth, Queue, Doctor, AI, etc.)
│   │   ├── middleware/            # JWT Protect, Role RBAC, Error Handler, Upload
│   │   ├── models/                # 15 Mongoose Models with Indexes & Timestamps
│   │   ├── routes/                # Express Routers mounted under /api
│   │   ├── services/              # Queue Algorithm, Gemini AI Triage, Digital Twin
│   │   ├── sockets/               # Real-Time Socket.IO Department & Alert Rooms
│   │   ├── utils/                 # ApiResponse, ApiError, ID Generators
│   │   ├── validators/            # Input validation schemas
│   │   ├── app.js                 # Express Application Setup & Security
│   │   ├── server.js              # HTTP & Socket.IO Server Listener
│   │   └── seed.js                # Database Seeder (30+ patients, departments, staff)
│   ├── tests/                     # Automated Vitest test suites
│   ├── API_DOCUMENTATION.md       # Complete REST API specifications
│   ├── .env.example               # Backend environment variable template
│   └── package.json               # Backend dependencies
│
├── src/                           # React / TypeScript Frontend
│   ├── components/                # Modals, Navbar, Sidebar, StatCards, StatusBadges
│   ├── context/                   # AuthContext, NotificationContext, QueueContext
│   ├── layouts/                   # DashboardLayout, PatientLayout, PublicLayout
│   ├── pages/                     # Admin, Doctor, Staff, Lab, Pharmacy, Patient Pages
│   ├── routes/                    # Protected Routes & Role Guards
│   ├── services/                  # Axios API services & fallback mock data
│   └── types/                     # TypeScript Interfaces & Enums
│
├── .env                           # Frontend environment configuration
├── package.json                   # Concurrently runner & scripts
└── README.md                      # Project master documentation
```

---

## 📜 Full API Documentation
For comprehensive details on all 40+ endpoints, request/response bodies, query parameters, error responses, and Socket.IO real-time events, see:  
👉 **[backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)**

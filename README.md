# CAREFLOW — AI-Powered Hospital Patient-Flow & Operations Management Platform

[![Backend Deploy](https://img.shields.io/badge/Render-Backend%20Live-success?style=for-the-badge&logo=render)](https://qflip-1.onrender.com/api/health)
[![API Status](https://img.shields.io/badge/API-Online-blue?style=for-the-badge)](https://qflip-1.onrender.com/)

> **Live Backend API**: [https://qflip-1.onrender.com/api](https://qflip-1.onrender.com/api)  
> **API Health Check**: [https://qflip-1.onrender.com/api/health](https://qflip-1.onrender.com/api/health)

CAREFLOW is a full-stack, enterprise healthcare operations management platform designed specifically for Indian Civil, District, and Sub-divisional hospitals under the **National Health Mission (NHM)** and **Ayushman Bharat Digital Mission (ABDM)**.

The platform bridges real-time patient queue flow, electronic triage, doctor consultations, Jan Aushadhi pharmacy dispensing, laboratory diagnostic requisitions, hospital resource tracking, and AI digital twin simulations.

---

## 🏗 System Architecture

```
                  ┌──────────────────────────────────────────────┐
                  │          CAREFLOW Frontend (React)           │
                  │  Vite + TypeScript + Tailwind CSS + Lucide   │
                  │           http://localhost:5173              │
                  └──────────────┬───────────────────▲───────────┘
                                 │ HTTP REST (Axios) │ WebSockets
                                 │                   │ (Socket.IO)
                  ┌──────────────▼───────────────────┴───────────┐
                  │           CAREFLOW Backend (Express)         │
                  │   Node.js (ESM) + Mongoose + JWT + Helmet    │
                  │   Local:  http://localhost:8000              │
                  │   Render: https://qflip-1.onrender.com       │
                  └──────────────┬───────────────────▲───────────┘
                                 │                   │
                  ┌──────────────▼───────────┐ ┌─────┴───────────┐
                  │    MongoDB (Local/Atlas) │ │ Google Gemini   │
                  │  15 Schemas & Indexes    │ │ AI Triage Engine│
                  └──────────────────────────┘ └─────────────────┘
```

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, React Hook Form.
- **Backend**: Node.js v24, Express.js (ES Modules), MongoDB & Mongoose ODM, Socket.IO.
- **Security**: JWT Authentication, bcryptjs password hashing, RBAC (6 Roles), Helmet, CORS, Express Rate Limit, Express Validator.
- **AI Engine**: Google Gemini API (`@google/generative-ai`) for multilingual clinical triage, crowd surge forecasting, and hospital digital twin simulation.

---

## ⚡ Quick Start (Single Command)

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **MongoDB** running locally (`mongodb://localhost:27017/careflow`) or a MongoDB Atlas URI

### 2. Install Dependencies
```bash
# Install root (frontend + concurrently runner) dependencies
npm install

# Install backend dependencies
npm install --prefix backend
```

### 3. Seed Database with Realistic Data
Populate 7 departments, 30+ realistic patients, doctors across specialties, staff, active OPD tokens, consultations, lab tests, and hospital resources:
```bash
npm run seed
```

### 4. Run Frontend and Backend Together
```bash
# Starts both Vite Frontend (port 5173) and Express Backend (port 8000) concurrently
npm run dev:all
```
- **Web App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8000/api](http://localhost:8000/api)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

## 🧪 How to Test the Backend

You can test the backend using any of the three methods below:

### Method 1: Run the Automated Test Suite (Vitest)
CAREFLOW includes automated test suites covering authentication, role protection, queue wait-time calculations, multilingual symptom triage, surge predictions, and digital twin simulations:
```bash
# Run tests directly via npm script
npm run test:backend

# Or run Vitest from backend directory
npm --prefix backend test
```
**Expected Output:**
```
 ✓ tests/queue.test.js  (4 tests)
 ✓ tests/auth.test.js   (3 tests)
 Test Files  2 passed (2)
      Tests  7 passed (7)
```

---

### Method 2: Test Endpoints via cURL or PowerShell / Postman

With the backend running (`npm run server` or `npm run dev:all`), test the live REST APIs:

#### 1. System Health Check
```bash
curl http://localhost:8000/api/health
```
**Response:**
```json
{"success":true,"status":"ONLINE","service":"CareFlow Hospital Platform Backend","version":"1.0.0"}
```

#### 2. AI Multilingual Symptom Triage (Hindi / English / Punjabi)
Evaluate acute symptoms for automated OPD department routing:
```bash
curl -X POST http://localhost:8000/api/ai/triage \
  -H "Content-Type: application/json" \
  -d "{\"symptoms\": \"छाती में तेज दर्द और सांस फूल रही है\", \"language\": \"hi\"}"
```
**Response:**
```json
{
  "success": true,
  "data": {
    "department": "Cardiology",
    "departmentCode": "CARD",
    "urgency": "urgent",
    "triageColor": "yellow",
    "confidence": 0.94,
    "summary": "Cardiovascular indicators detected. Prompt cardiac assessment advised.",
    "disclaimer": "AI operational recommendation only. Please consult a registered medical practitioner."
  }
}
```

#### 3. User Login & JWT Authentication
Authenticate using one of the pre-seeded demo accounts:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"doctor@careflow.gov.in\", \"password\": \"Careflow@2026\"}"
```
**Response:**
Returns `{ "success": true, "data": { "token": "<JWT_TOKEN>", "user": { ... } } }`.

#### 4. Fetch Live Department OPD Queue Board
Publicly view current tokens being served, called, and waiting:
```bash
# First get department list to find ID
curl http://localhost:8000/api/departments

# Then query queue for a department ID
curl http://localhost:8000/api/queues/department/<DEPARTMENT_ID>
```

#### 5. Hospital Digital Twin Operational Metrics
```bash
curl http://localhost:8000/api/ai/digital-twin
```
Returns live bed occupancy (general wards, ICU), oxygen cylinder capacity, departmental wait times, and real-time bottleneck alerts.

---

### Method 3: Test Through the React Web UI

Open [http://localhost:5173](http://localhost:5173) in your browser and log in with any of the seeded credentials:

| Role | Email | Password | What You Can Test |
|---|---|---|---|
| **Administrator** | `admin@careflow.gov.in` | `Careflow@2026` | Real-time footfall charts, bed occupancy, doctor rosters, audit logs, AI surge prediction. |
| **Doctor** | `doctor@careflow.gov.in` | `Careflow@2026` | Live OPD queue, call next patient, clinical diagnosis, electronic prescriptions, lab test orders. |
| **Registration Staff** | `staff@careflow.gov.in` | `Careflow@2026` | Rapid patient registration, sequential token generation, emergency override triage. |
| **Laboratory Staff** | `lab@careflow.gov.in` | `Careflow@2026` | Incoming diagnostic test requests, sample collection, verified result upload. |
| **Pharmacy Staff** | `pharmacy@careflow.gov.in` | `Careflow@2026` | Prescriptions sent from doctors, medicine packaging, dispensing status. |
| **Patient** | `patient@careflow.gov.in` | `Careflow@2026` | View token `OPD-GEN-104`, live wait countdown, medical history, lab results. |

---

## 📁 Repository Structure

```
CareFlow/
├── backend/                  # Complete Node.js / Express / MongoDB Backend
│   ├── src/
│   │   ├── config/           # Database, logger, Cloudinary, environment configs
│   │   ├── controllers/      # 13 REST controllers (Auth, Patient, Queue, Doctor, AI, etc.)
│   │   ├── middleware/       # JWT protect, RBAC authorizeRoles, error handler, Multer upload
│   │   ├── models/           # 15 Mongoose schemas with indexes & timestamps
│   │   ├── routes/           # Express routers mounted under /api
│   │   ├── services/         # Queue algorithm, Gemini AI triage, Digital Twin, notifications
│   │   ├── sockets/          # Socket.IO department rooms & push notifications
│   │   ├── utils/            # ApiResponse, ApiError, asyncHandler, token generators
│   │   ├── validators/       # Request validation rules
│   │   ├── app.js            # Express application setup
│   │   ├── server.js         # HTTP + Socket.IO server listener (Port 8000)
│   │   └── seed.js           # Comprehensive database seeder
│   ├── tests/                # Automated integration tests
│   ├── API_DOCUMENTATION.md  # Detailed API specifications
│   ├── .env.example          # Environment variable template
│   └── package.json          # Backend dependencies
│
├── src/                      # React / TypeScript / Vite Frontend
│   ├── components/           # Reusable UI components & layouts
│   ├── pages/                # Pages for all 8 hospital modules
│   ├── services/             # Axios API client & data services
│   └── ...
│
├── package.json              # Root package with concurrently full-stack runner
└── README.md                 # Full documentation
```

---

## 📜 Full API Documentation
Detailed request/response bodies, error codes, and Socket.IO protocol specifications are available in:
**[backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)**

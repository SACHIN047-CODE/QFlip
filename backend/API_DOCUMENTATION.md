# CAREFLOW Backend API Documentation

CAREFLOW is an AI-powered hospital patient-flow and operations management platform designed for public healthcare and government hospitals in India.

Base URL: `http://localhost:8000/api`  
Real-time Socket.IO: `ws://localhost:8000`

---

## 1. Authentication & Role Management (`/api/auth`)

### `POST /api/auth/register`
Register a new user account. Automatically creates linked role profiles (`Patient`, `Doctor`, or `Staff`).
- **Auth Required**: None (Public)
- **Request Body**:
```json
{
  "name": "Aarav Patel",
  "email": "aarav.p@example.com",
  "phone": "+91 98201 11221",
  "password": "SecurePassword@123",
  "role": "patient",
  "gender": "Male",
  "age": 34
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Account registered successfully",
  "data": {
    "user": {
      "id": "673cf1...",
      "name": "Aarav Patel",
      "email": "aarav.p@example.com",
      "phone": "+91 98201 11221",
      "role": "patient"
    },
    "profile": {
      "patientId": "CF-2026-00042",
      "age": 34,
      "gender": "Male"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### `POST /api/auth/login`
Authenticate existing user and obtain Bearer JWT.
- **Request Body**:
```json
{
  "email": "doctor@careflow.gov.in",
  "password": "Careflow@2026"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": { "id": "...", "name": "Dr. Rajesh Sharma", "role": "doctor" },
    "token": "..."
  }
}
```

### `GET /api/auth/me`
Retrieve active user session and associated role profile.
- **Headers**: `Authorization: Bearer <token>`

---

## 2. Patients & Clinical Records (`/api/patients`)

### `POST /api/patients/register`
Registration staff desk registers walk-in patient and generates unique Patient ID.
- **Role Required**: `registration_staff`, `admin`, `doctor`
- **Request Body**:
```json
{
  "name": "Sita Devi",
  "phone": "+91 98111 22334",
  "gender": "Female",
  "age": 46,
  "bloodGroup": "O+",
  "allergies": ["Sulfa drugs"],
  "address": { "street": "Lane 4, Subhash Nagar", "city": "Delhi", "pincode": "110027" }
}
```

### `GET /api/patients/search?query=CF-2026`
Instant search across patients by Patient ID, Name, or Phone.

### `GET /api/patients/:id/history`
Returns complete medical dossier: consultations, past appointments, active tokens, prescriptions, and lab test results.

---

## 3. OPD Queue Management (`/api/queues`)

### `POST /api/queues/token`
Generates sequential token for department with dynamic wait-time calculation.
- **Formula**: $\text{Estimated Wait} = \frac{\text{Patients Ahead} \times \text{Avg Consultation Time}}{\max(\text{Active Doctors}, 1)}$
- **Triage Priority**:
  - `red`: Score 100 (Immediate / Emergency bypass)
  - `yellow`: Score 50 (Urgent fast-track)
  - `green`: Score 10 (Standard sequential queue)
- **Request Body**:
```json
{
  "patientId": "673cf1...",
  "departmentId": "673cf2...",
  "triageLevel": "green",
  "symptoms": "Fever and body ache for 2 days"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "tokenNumber": "OPD-GEN-104",
    "sequenceNumber": 104,
    "status": "waiting",
    "estimatedWaitTimeMinutes": 15
  }
}
```

### `GET /api/queues/department/:departmentId`
Live public OPD waiting board for department kiosks and displays.

### `PUT /api/queues/:queueId/status`
Doctor / Counter advances status:
- Transitions: `waiting` $\rightarrow$ `called` $\rightarrow$ `in_consultation` $\rightarrow$ `completed`

---

## 4. Consultations & Digital Rx (`/api/consultations`)

### `POST /api/consultations`
Doctor completes clinical consultation. Automatically triggers:
1. `Prescription` creation & pushes order to Pharmacy
2. `LabTest` requisition & pushes order to Laboratory
3. Updates queue status to `completed`
4. Dispatches push notification to patient

- **Request Body**:
```json
{
  "queueId": "673cf3...",
  "patientId": "673cf1...",
  "chiefComplaints": "High grade fever, chills, body ache",
  "diagnosis": "Suspected Dengue / Viral Pyrexia",
  "vitalSigns": {
    "bp": "118/76 mmHg",
    "pulse": "88 bpm",
    "temperature": "101.2 °F",
    "spO2": "97%"
  },
  "prescriptions": [
    { "name": "Paracetamol 650mg", "dosage": "650mg", "frequency": "1-0-1", "duration": "3 days" }
  ],
  "labTests": [
    { "testName": "Complete Blood Count (CBC)", "testCategory": "Hematology", "priority": "urgent" }
  ]
}
```

---

## 5. Laboratory Operations (`/api/laboratory`)

- `GET /api/laboratory`: Real-time queue of ordered diagnostic tests.
- `PUT /api/laboratory/:id/status`: Update status (`sample_collected`, `completed`).
- `POST /api/laboratory/:id/upload`: Upload signed lab report document (PDF/Image).

---

## 6. Pharmacy Operations (`/api/pharmacy`)

- `GET /api/pharmacy`: Live feed of prescriptions awaiting dispensing.
- `PUT /api/pharmacy/:id/dispense`: Dispenses medications and notifies patient.

---

## 7. AI Intelligence & Digital Twin (`/api/ai`)

### `POST /api/ai/triage`
Multilingual clinical symptom triage powered by Google Gemini (English, Hindi, Punjabi).
- **Request Body**:
```json
{
  "symptoms": "छाती में तेज दर्द और सांस फूल रही है",
  "language": "hi"
}
```
- **Response (200 OK)**:
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

### `GET /api/ai/surge-prediction?dayOfWeek=Monday`
AI-modeled footfall projection and staffing recommendations.

### `GET /api/ai/digital-twin`
Real-time digital twin state of hospital: bed occupancy, oxygen status, department load ratio, and detected bottlenecks.

---

## 8. Real-Time Socket.IO Protocol

| Event Name | Direction | Room | Description |
|---|---|---|---|
| `join_department` | Client $\rightarrow$ Server | - | Join live department OPD room `dept:<id>` |
| `queue:new_token` | Server $\rightarrow$ Client | `dept:<id>` | Emitted when new token is issued |
| `queue:status_changed` | Server $\rightarrow$ Client | `dept:<id>` | Token called or completed |
| `join_user` | Client $\rightarrow$ Server | - | Join private user channel `user:<userId>` |
| `notification` | Server $\rightarrow$ Client | `user:<userId>` | Real-time push notification (lab ready, token called) |
| `pharmacy:new_order` | Server $\rightarrow$ Client | Global | Notifies pharmacy of new prescription |
| `lab:new_request` | Server $\rightarrow$ Client | Global | Notifies laboratory of test orders |

# CAREFLOW (QFlip) Backend — Technical Documentation

[![Backend Deploy](https://img.shields.io/badge/Render-Backend%20Live-success?style=for-the-badge&logo=render)](https://qflip-1.onrender.com/api/health)
[![API Status](https://img.shields.io/badge/API-Online-blue?style=for-the-badge)](https://qflip-1.onrender.com/)

> **Live Production Base URL**: [https://qflip-1.onrender.com/api](https://qflip-1.onrender.com/api)  
> **Live Health Check**: [https://qflip-1.onrender.com/api/health](https://qflip-1.onrender.com/api/health)  
> **Live Root Endpoint**: [https://qflip-1.onrender.com/](https://qflip-1.onrender.com/)

---

## 🏥 About the Backend
The **CAREFLOW Backend** is an enterprise-grade, event-driven Node.js & Express REST API powered by MongoDB and Socket.IO. It is engineered specifically for high-throughput OPD environments in Indian government and civil hospitals.

### Core Modules & Capabilities:
- **MVC Architecture (ES Modules)**: Clean layer segregation between controllers, services, models, routes, and middleware.
- **Role-Based Access Control (RBAC)**: Enforced authorization for 6 distinct roles: `patient`, `doctor`, `registration_staff`, `admin`, `lab_staff`, `pharmacy_staff`.
- **Atomic Queue Management Engine**: Generates unique sequential tokens per department per calendar day; sorts by emergency priority (Red/Yellow/Green) and recalculates estimated wait times dynamically.
- **Downstream Operations Integration**: Consultations trigger e-prescriptions directly to the Jan Aushadhi Pharmacy and diagnostic orders to the Laboratory.
- **Multilingual AI Triage (Google Gemini)**: Clinical symptom analysis supporting English, Hindi, and Punjabi with urgent triage color coding.
- **Hospital Digital Twin & Simulation**: Mathematical simulation module for hospital administrators to simulate patient arrival surges, bed utilization, and doctor absenteeism.
- **Real-Time WebSockets**: Socket.IO department rooms for OPD waiting room boards and individual user alert channels.

---

## ⚡ Quick Backend Commands

```bash
# Install dependencies
npm install

# Seed database with 30+ demo patients, doctors, departments & queues
npm run seed

# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start

# Run automated integration test suite (Vitest)
npm test
```

---

## 👥 Seeded Demo Accounts (Password: `Careflow@2026`)

| Role | Email |
|---|---|
| **Administrator** | `admin@careflow.gov.in` |
| **Doctor** | `doctor@careflow.gov.in` |
| **Registration Staff** | `staff@careflow.gov.in` |
| **Laboratory Staff** | `lab@careflow.gov.in` |
| **Pharmacy Staff** | `pharmacy@careflow.gov.in` |
| **Patient** | `patient@careflow.gov.in` |

---

## 📜 Full API Documentation
For all request payloads, query parameters, and response schemas, refer to:  
👉 **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**

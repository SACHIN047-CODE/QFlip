# CAREFLOW Backend

[![Backend Deploy](https://img.shields.io/badge/Render-Backend%20Live-success?style=for-the-badge&logo=render)](https://qflip-1.onrender.com/api/health)
[![API Status](https://img.shields.io/badge/API-Online-blue?style=for-the-badge)](https://qflip-1.onrender.com/)

> **Live Production Base URL**: [https://qflip-1.onrender.com/api](https://qflip-1.onrender.com/api)  
> **Live Health Check**: [https://qflip-1.onrender.com/api/health](https://qflip-1.onrender.com/api/health)

Production-ready backend for CAREFLOW: An AI-Powered Hospital Patient-Flow & Operations Management Platform.

## Features
- **MVC Architecture with ES Modules**: Clean separation of models, controllers, services, routes, middleware, and sockets.
- **Role-Based Access Control (RBAC)**: Support for 6 distinct roles: `patient`, `doctor`, `registration_staff`, `admin`, `lab_staff`, `pharmacy_staff`.
- **Live OPD Queue Algorithm**: Dynamic wait-time computation, atomic token sequence per department, triage color priority sorting (Red emergency, Yellow urgent, Green routine).
- **Socket.IO Real-Time Updates**: Live departmental OPD boards (`join_department`), private notifications (`join_user`), and push alerts.
- **Downstream Operations Integration**: Consultations trigger e-prescriptions sent directly to the Pharmacy, and diagnostic requisitions dispatched to the Laboratory.
- **AI Intelligence**: Multilingual symptom triage with Google Gemini (English, Hindi, Punjabi), crowd surge forecasting, and hospital digital twin simulation.
- **Centralized Security**: JWT verification, bcryptjs password hashing, Helmet, CORS, and Express Rate Limiting.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas URI)

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key variables:
- `PORT=8000`
- `MONGODB_URI=mongodb://localhost:27017/careflow`
- `JWT_SECRET=careflow_super_secure_jwt_secret_key_2026_dev`
- `GEMINI_API_KEY=your_gemini_key_here` (optional; heuristic rule-engine active by default)

### Database Seeding
To populate realistic hospital departments, doctors, staff, 30+ patients, live queues, consultations, lab tests, and hospital resources:
```bash
npm run seed
```

### Running the Backend
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

### Automated Tests
```bash
npm test
```

## Seeded Demo Credentials (Password for all: `Careflow@2026`)
- **Administrator**: `admin@careflow.gov.in`
- **Doctor**: `doctor@careflow.gov.in`
- **Registration Staff**: `staff@careflow.gov.in`
- **Laboratory Staff**: `lab@careflow.gov.in`
- **Pharmacy Staff**: `pharmacy@careflow.gov.in`
- **Patient**: `patient@careflow.gov.in`

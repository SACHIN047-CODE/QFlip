# CAREFLOW (QFlip)

## Summary

CAREFLOW is an AI-powered hospital patient-flow and operations platform. It digitizes registration, triage, department queues, doctor consultations, prescriptions, laboratory orders, pharmacy fulfillment, notifications, and hospital operations analytics in one system.

The application is designed for public and government hospitals that need transparent patient wait times, coordinated downstream services, and role-specific operational dashboards.

## Goals

- Reduce congestion and uncertainty around outpatient department queues.
- Give patients live token and estimated wait-time information.
- Connect consultations with pharmacy and laboratory workflows.
- Provide hospital staff with dashboards tailored to their responsibilities.
- Support multilingual AI-assisted symptom triage without replacing clinical judgment.
- Help administrators understand demand, bottlenecks, staffing, and resource utilization.

## Main workflows

1. A patient registers or is registered by staff.
2. The system assigns a patient identifier and department queue token.
3. Triage determines the likely department and emergency priority.
4. Queue services calculate position and estimated waiting time.
5. Doctors call patients, record consultations, and create prescriptions or lab orders.
6. Pharmacy and laboratory staff process the resulting orders.
7. Socket.IO updates patient and staff dashboards in real time.
8. Completed visits contribute to feedback and operational analytics.

## User roles

- **Patient**: registration, live queue tracking, prescriptions, laboratory reports, and feedback.
- **Doctor**: patient queues, consultations, prescriptions, and laboratory requisitions.
- **Registration staff**: patient lookup, walk-in registration, and token issuance.
- **Laboratory staff**: diagnostic order processing and report uploads.
- **Pharmacy staff**: prescription review, stock checks, and dispensing.
- **Administrator**: departments, doctors, resources, analytics, audit logs, and simulations.

## Architecture

### Frontend

The frontend is a React 18 single-page application built with TypeScript, Vite, Tailwind CSS, React Router, Axios, and Recharts.

- `src/components/`: reusable UI components and modals.
- `src/context/`: authentication, queue, and notification state.
- `src/layouts/`: public, patient, and dashboard shells.
- `src/pages/`: role- and feature-specific screens.
- `src/routes/`: route definitions and access guards.

### Backend

The backend is an ES module Node.js application using Express, Mongoose, JWT, Socket.IO, and MongoDB.

- `backend/src/controllers/`: HTTP handlers.
- `backend/src/services/`: queue, notification, prediction, and digital-twin logic.
- `backend/src/models/`: persisted domain entities.
- `backend/src/routes/`: REST route registration.
- `backend/src/middleware/`: authentication, RBAC, validation, uploads, and errors.
- `backend/src/sockets/`: real-time event and room handling.
- `backend/src/validators/`: request validation.
- `backend/tests/`: Vitest and Supertest integration tests.

The backend follows a controller, service, and model separation. REST endpoints are mounted under `/api`; the Socket.IO server handles live queue and notification events.

## Core capabilities

- JWT-based authentication with role-based authorization.
- MongoDB persistence for users, patients, queues, consultations, prescriptions, lab tests, resources, and audit records.
- Emergency-priority queue ordering and estimated wait-time calculation.
- Google Gemini integration for multilingual triage and operational predictions.
- Real-time department and user notifications through Socket.IO.
- Cloudinary-backed file handling where configured.
- Security middleware including Helmet, CORS, rate limiting, password hashing, and input validation.

## Local development

Prerequisites:

- Node.js 18 or newer.
- MongoDB locally or a MongoDB Atlas connection.
- A Gemini API key for AI features.

Install dependencies from the repository root:

```bash
npm install
npm install --prefix backend
```

Configure `.env` for the frontend and `backend/.env` for the API. Use the checked-in `.env.example` templates as the starting point, and never commit real credentials.

Start the application:

```bash
npm run dev:all
```

The default local endpoints are:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api`
- Backend health check: `http://localhost:8000/api/health`

Seed development data when the database is configured:

```bash
npm run seed
```

## Validation

Build the frontend with:

```bash
npm run build
```

Run backend tests with:

```bash
npm run test:backend
```

For endpoint details, request and response examples, and Socket.IO events, see [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md).

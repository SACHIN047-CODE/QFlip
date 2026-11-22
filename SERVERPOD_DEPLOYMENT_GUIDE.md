# CAREFLOW (QFlip) — Serverpod Cloud Deployment Guide

This guide details the complete architecture, structure, and deployment steps for deploying **CAREFLOW (QFlip)** on **Serverpod Cloud** and managing it through **Serverpod App Studio**.

---

## 1. Project Architecture

CAREFLOW utilizes a modern hybrid cloud architecture:

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT CLIENTS                       │
├──────────────────────────┬─────────────────────────────┤
│ React 18 + TS Frontend   │ Flutter App (Mobile & Web)  │
│ (c:\...\QFlip)           │ (serverpod/careflow_flutter)│
└────────────┬─────────────┴──────────────┬──────────────┘
             │                            │
             │ HTTP / JSON API            │ Serverpod Client Protocol
             ▼                            ▼
┌────────────────────────────────────────────────────────┐
│            SERVERPOD 4.1.2 BACKEND (Dart)              │
│            (serverpod/careflow_server)                 │
├────────────────────────────────────────────────────────┤
│ Endpoints:                                             │
│  - UserAuthEndpoint    - QueueEndpoint                 │
│  - PatientEndpoint     - DoctorEndpoint                │
│  - DepartmentEndpoint  - ConsultationEndpoint          │
│  - PrescriptionEndpoint- LaboratoryEndpoint            │
│  - PharmacyEndpoint    - NotificationEndpoint          │
│  - FeedbackEndpoint    - ResourceEndpoint              │
│  - AiEndpoint          - AnalyticsEndpoint             │
│  - AppointmentEndpoint                                 │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│            POSTGRESQL ON SERVERPOD CLOUD               │
│ Tables: careflow_users, careflow_patients,             │
│ careflow_doctors, careflow_departments, careflow_queue,│
│ careflow_consultations, careflow_prescriptions, etc.   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Serverpod Project Structure

The Serverpod project is located in `serverpod/`:

```
QFlip/
├── serverpod/
│   ├── careflow_server/       <-- SERVER PACKAGE (OPEN IN APP STUDIO)
│   │   ├── config/            <-- development.yaml, production.yaml, passwords.yaml
│   │   ├── lib/
│   │   │   ├── server.dart    <-- Server entry point & service wiring
│   │   │   └── src/
│   │   │       ├── models/    <-- .spy.yaml model definitions
│   │   │       ├── endpoints/ <-- Dart Serverpod Endpoints
│   │   │       └── generated/ <-- Serverpod-generated protocol & tables
│   │   ├── migrations/        <-- PostgreSQL migration SQL scripts
│   │   ├── pubspec.yaml       <-- Depends on serverpod: 4.1.2
│   │   ├── scloud.yaml        <-- Serverpod Cloud deployment configuration
│   │   └── .scloudignore      <-- Deployment exclusion rules
│   │
│   ├── careflow_client/       <-- Generated Dart client package
│   ├── careflow_flutter/      <-- Companion Flutter application
│   └── pubspec.yaml           <-- Workspace configuration
```

---

## 3. Serverpod App Studio Compatibility

### Which Folder to Open in Serverpod App Studio:
Open the **server package folder directly**:

```
c:\Users\Tejan Sharma\OneDrive\Documents\Code\24 ghante hackathon\QFlip\serverpod\careflow_server
```

> [!IMPORTANT]
> **Why?** Serverpod App Studio inspects the root `pubspec.yaml` of the opened directory for `dependencies: serverpod: 4.x`.  
> Opening `serverpod/careflow_server` directly resolves the *"Not a Serverpod project. Open a folder with a pubspec that depends on serverpod"* error because its `pubspec.yaml` contains `serverpod: 4.1.2`.

---

## 4. Local Development Commands (PowerShell)

### Prerequisites Setup in PowerShell
Add Flutter, Dart, and Serverpod CLI to your session PATH:
```powershell
$env:PATH = "C:\Users\Tejan Sharma\develop\flutter\bin;C:\Users\Tejan Sharma\AppData\Local\Dart\install\bin;" + $env:PATH
```

### Dependency Resolution & Code Generation
```powershell
# Navigate to the server package
cd "c:\Users\Tejan Sharma\OneDrive\Documents\Code\24 ghante hackathon\QFlip\serverpod\careflow_server"

# Run code generator
serverpod generate

# Run static analysis
dart analyze
```

### Start Server Locally (Docker Postgres)
```powershell
# Start local Postgres container
docker compose up -d

# Start Serverpod server
dart run bin/main.dart --apply-migrations
```

---

## 5. Serverpod Cloud Deployment Workflow

Serverpod Cloud deployment is managed via `scloud` (Serverpod Cloud CLI):

### Step 1: Authentication
```powershell
scloud auth login
```
This opens your browser to authenticate with your Serverpod Cloud account.

### Step 2: Cloud Project Launch
Run `scloud launch` from the server package directory:
```powershell
cd "c:\Users\Tejan Sharma\OneDrive\Documents\Code\24 ghante hackathon\QFlip\serverpod\careflow_server"
scloud launch
```
This guides you through selecting your cloud project and provisioning the managed PostgreSQL database.

### Step 3: Configure Cloud Environment Secrets
```powershell
# Database passwords and JWT secrets are managed automatically by Serverpod Cloud
# If external service keys are needed (e.g. Gemini API, Cloudinary):
scloud variable set GEMINI_API_KEY "your_gemini_api_key_here"
```

### Step 4: Deploy to Serverpod Cloud
```powershell
scloud deploy
```
For a preview before deployment:
```powershell
scloud deploy --show-files --wet-run
```

### Step 5: Check Deployment Status & Logs
```powershell
scloud status
scloud log
```

---

## 6. Connecting the React Frontend

The React frontend communicates with the Serverpod backend via REST/HTTP API.

In `.env` or `.env.production`:
```env
# Point to your deployed Serverpod Cloud domain:
VITE_API_BASE_URL=https://api.your-project.serverpod.cloud
VITE_USE_MOCK_API=false
VITE_HOSPITAL_NAME="Civil Hospital Ambala"
```

Build the React frontend:
```powershell
npm run build
```
Deploy the generated `dist/` directory to Vercel, Netlify, Cloudflare Pages, or host as static assets.

# CareFlow Serverpod Backend (100% Dart)

Enterprise-grade hospital queue management, OPD token triage, and ABHA registration backend built with **Serverpod (Dart)** for the CareFlow Flutter ecosystem.

---

## 🏗️ Architecture

```
CareFlow/
├── careflow_server/           # Serverpod Dart Backend Server
│   ├── bin/main.dart          # Server entrypoint
│   ├── config/                # Development, Production, and Secret configs
│   │   ├── development.yaml
│   │   ├── production.yaml
│   │   └── passwords.yaml
│   ├── lib/
│   │   ├── server.dart        # Serverpod Dispatcher
│   │   └── src/
│   │       ├── endpoints/     # RPC Endpoints (Auth, Queue, Dept, Gemini Triage)
│   │       ├── models/        # Serverpod YAML Model Schemas (*.spy.yaml)
│   │       └── generated/     # Auto-generated serialization & ORM models
│   ├── Dockerfile             # Multi-stage production container
│   ├── docker-compose.yaml    # Postgres 16 + Redis + Serverpod stack
│   └── serverpod_cloud.yaml   # Serverpod Cloud deployment manifest
├── careflow_client/           # Generated Dart client for Flutter
└── mobile/                    # Flutter Mobile Application
```

---

## 🚀 Running Locally

### Option 1: One-Click with Docker Compose (Recommended)
This starts PostgreSQL 16, Redis, and the compiled Serverpod Dart server together:

```bash
cd careflow_server
docker compose up --build
```

The server will be live on:
* **API Server (RPC & WebSockets)**: `http://localhost:8080`
* **Serverpod Insights**: `http://localhost:8081`
* **Web Server**: `http://localhost:8082`

### Option 2: Running with Dart
Ensure PostgreSQL is running locally on port 5432:

```bash
cd careflow_server
dart pub get
dart run bin/main.dart --mode development
```

---

## ☁️ Deploying to Serverpod Cloud

Serverpod provides native cloud deployment:

```bash
# 1. Install Serverpod CLI (if not already installed)
dart pub global activate serverpod_cli

# 2. Login to your Serverpod Cloud account
serverpod cloud login

# 3. Deploy CareFlow server
cd careflow_server
serverpod cloud deploy
```

---

## 🐳 Self-Hosting on Cloud (AWS, GCP, DigitalOcean, or Render)

1. Build the production Docker image:
```bash
docker build -t careflow-serverpod:latest -f Dockerfile .
```

2. Run with environment variables:
```bash
docker run -d \
  -p 8080:8080 \
  -e runmode=production \
  -e GEMINI_API_KEY="your-gemini-key" \
  careflow-serverpod:latest
```

---

## 📡 Endpoints Overview

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `auth` | `login(email, pass)` | Hospital SSO & Patient JWT authentication |
| `auth` | `loginWithAbha(abhaId)` | 10-second instant ABHA authentication |
| `queue` | `createToken(...)` | Generates next OPD token with dynamic wait estimate |
| `queue` | `callNext(dept, doctor)` | Clinician one-click call next patient |
| `queue` | `streamQueueUpdates()` | Real-time WebSocket live queue updates |
| `triage` | `triageSymptoms(...)` | Gemini AI multi-lingual symptom assessment |
| `triage` | `singlePromptBookOpd(...)` | **1-Voice-Prompt OPD booking** in Hindi/Punjabi/English |

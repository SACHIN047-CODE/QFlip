# AGENTS.md

## Project overview

QFlip (CAREFLOW) is a hospital patient-flow platform with:

- A React 18 + TypeScript + Vite frontend in `src/`.
- A Node.js + Express + MongoDB backend in `backend/`.
- Socket.IO for real-time queue and notification updates.
- JWT authentication and role-based access control.

Keep frontend and backend changes focused on their respective layers. Update the related API documentation when changing public endpoints, request payloads, response shapes, or authentication behavior.

## Repository structure

- `src/components/`: reusable frontend UI components.
- `src/pages/`: role- and feature-specific frontend screens.
- `src/context/`: shared frontend state and providers.
- `src/routes/`: frontend route configuration and guards.
- `backend/src/controllers/`: HTTP request handlers.
- `backend/src/services/`: business logic and integrations.
- `backend/src/models/`: Mongoose models.
- `backend/src/routes/`: API route definitions.
- `backend/src/middleware/`: authentication, authorization, validation, uploads, and errors.
- `backend/tests/`: backend integration tests.
- `backend/API_DOCUMENTATION.md`: backend API reference.

Do not edit `repomix-output.xml`; it is a generated, read-only repository snapshot.

## Development commands

Run from the repository root:

```bash
npm install
npm install --prefix backend
npm run dev
npm run dev:all
npm run build
npm run test:backend
npm run seed
```

Use `npm run dev` for the frontend, `npm run server` for the backend, and `npm run dev:all` to run both. The frontend defaults to `http://localhost:5173`; the backend API defaults to `http://localhost:8000/api`.

Backend-only commands, run from `backend/`, include:

```bash
npm run dev
npm start
npm test
npm run seed
```

## Implementation conventions

- Follow the existing TypeScript and React patterns in `src/`; use functional components and existing shared components/context before adding new abstractions.
- Keep frontend API calls consistent with the existing Axios setup and environment configuration.
- Keep backend modules in ES module syntax and preserve the controller → service/model separation.
- Reuse existing middleware, `ApiError`, `ApiResponse`, and `asyncHandler` utilities for API behavior and error handling.
- Enforce authentication and role authorization through the existing middleware rather than duplicating checks in controllers.
- Preserve Socket.IO event names and room semantics unless the corresponding frontend and backend consumers are updated together.
- Use the existing Tailwind CSS styling approach and project design language.
- Do not commit `.env` files, secrets, generated output, or `node_modules`.

## Validation expectations

For frontend changes, run:

```bash
npm run build
```

For backend changes, run:

```bash
npm test
```

When a change crosses the frontend/backend boundary, run both relevant checks. Add or update focused backend tests for changed API behavior, queue logic, authentication, or authorization. Verify environment variables and MongoDB availability before running seed or integration workflows.

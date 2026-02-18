# Job Portal Application — Research-Oriented Documentation

Version: snapshot (codebase state on 2026-02-18)

This repository contains a full-stack job-portal implementation intended as an experimental / prototyping platform. It is organized as a MERN-style application (React + Vite frontend, Express/Node backend, MongoDB persistence). The code implements core domain models, REST APIs, file uploads (Cloudinary), JWT-based authentication, and a SPA client with client-side filtering.

---

**Contents of this document**

- Project abstract / overview
- System architecture
- Technology stack
- Installation & setup (development)
- Configuration (`.env`) and security notes
- Usage guide (run & test)
- Folder structure and key modules
- API reference (implemented endpoints)
- Known issues, omissions, and missing documentation
- Future enhancements and research directions
- License

---

## Abstract / Overview

This repository provides a baseline implementation for an online job marketplace. It supports two primary roles: job seekers (students) and recruiters. Recruiters can register companies and post jobs; students can search, filter, view job details, upload resumes, and apply. The codebase is suitable as a research platform to evaluate retrieval, ranking, and recommendation strategies or to measure system performance under load.

Research emphasis: the implementation is a production-like baseline (REST API + SPA) that can be extended with instrumentation, ranking models, or controlled experiments (A/B tests, offline ranking evaluations).

---

## System architecture (conceptual)

- Presentation layer: React SPA built with Vite (`FrontEnd/`) that consumes REST APIs and uses Redux Toolkit for state management.
- API layer: Express.js application (`BackEnd/index.js`) exposing routes under `/api/v1/*` implemented by controllers in `BackEnd/controllers/`.
- Persistence: MongoDB (Mongoose models in `BackEnd/models/`) storing `User`, `Company`, `Job`, and `Application` documents.
- Auxiliary services: Cloudinary for file uploads; JWT for authentication; `multer` (memory storage) + `datauri` to stream to Cloudinary.
- Deployment mode (current): Single Node.js process serves both API and static frontend (production build located at `FrontEnd/dist`). CORS is configured for a specific deployed origin in the server code.

---

## Technology stack

- Frontend: React 18, Vite, Redux Toolkit, React Router, TailwindCSS, Axios
- Backend: Node.js, Express.js, Mongoose (MongoDB), JWT, bcryptjs
- File storage: Cloudinary (uploads via `cloudinary` SDK)
- Dev & tooling: nodemon, eslint, Vite, Redux Persist

---

## Installation & Setup (development)

Prerequisites

- Node.js (>=16 recommended)
- npm
- MongoDB access (Atlas or local instance)
- Cloudinary account (optional — required for image/resume upload flows)

Runner (recommended sequence from repository root on Windows):

1. Install backend dependencies and start the backend server:

```powershell
# from repo root
npm install
npm run dev
```

This runs `nodemon BackEnd/index.js` per the root `package.json` scripts.

2. Install and start the frontend dev server:

```powershell
cd "FrontEnd"
npm install
npm run dev
```

3. Open the frontend dev URL shown by Vite (typically `http://localhost:5173`).

Notes:

- The backend currently serves static files from `FrontEnd/dist` when the production build is created. To produce the production build run `npm run build` in `FrontEnd/` and ensure the server can access `FrontEnd/dist`.

---

## Configuration & environment variables

The code expects environment variables for secrets and optional Cloudinary configuration. Create a `.env` file inside the `BackEnd/` directory for local development. The following variables are referenced (explicit names used in code):

- `SECRET_KEY` — JWT signing secret (used by `BackEnd/controllers/user.controller.js` and `BackEnd/middlewares/isAuthenticated.js`).
- `CLOUD_NAME` — Cloudinary cloud name (used in `BackEnd/utils/cloudinary.js`).
- `API_KEY` — Cloudinary API key.
- `API_SECRET` — Cloudinary API secret.

Important: the repository currently contains a direct MongoDB connection string in `BackEnd/utils/db.js` (hard-coded). For safety and reproducibility replace that hard-coded URI with `process.env.MONGO_URI` and set:

- `MONGO_URI` — MongoDB connection string (recommended to use an Atlas connection or local `mongodb://...`).

Example `.env` (BackEnd/.env):

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/jobportal
SECRET_KEY=your_jwt_secret_here
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Security note: rotate and never commit secrets. Remove the hard-coded DB URI in `BackEnd/utils/db.js` before sharing the repository.

---

## Usage guide (quick)

- Backend: runs on `process.env.PORT` (default fallback logic exists in `BackEnd/index.js`), start with `npm run dev` from repo root.
- Frontend: run `npm run dev` inside `FrontEnd/`.
- The frontend consumes API endpoints configured in `FrontEnd/src/utils/constant.js`. By default these constants point at a deployed instance. For local testing, modify these constants or run the frontend and backend such that the API base URLs point to `http://localhost:<port>/api/v1/...`.

Client-side behavior and flows implemented:

- Authentication: cookie-based JWT set by `POST /api/v1/user/login` (cookie name: `token`).
- File uploads: frontend and server expect file field name `file` for multipart uploads.

---

## Folder structure (high level)

- `BackEnd/` — Express app
  - `controllers/` — request handlers (job, company, application, user)
  - `models/` — Mongoose schemas (`Job`, `User`, `Application`, `Company`)
  - `routes/` — Express route definitions mapped to controllers
  - `middlewares/` — `isAuthenticated.js` (JWT auth), `multer.js` (file handling)
  - `utils/` — `cloudinary.js`, `datauri.js`, `db.js` (DB connection)
  - `index.js` — server bootstrap and route registration

- `FrontEnd/` — React application
  - `src/components/` — UI components and pages (including `admin/` and `auth/`)
  - `src/hooks/` — custom hooks for API data fetching
  - `src/redux/` — Redux slices and store
  - `src/utils/` — constants (API endpoints)
  - `index.html`, `main.jsx`, `App.jsx` — SPA entrypoints

---

## API reference (implemented endpoints)

Note: all endpoints are prefixed with `/api/v1` in `BackEnd/index.js`.

Authentication: protected endpoints require a JWT cookie named `token`; `isAuthenticated` middleware sets `req.id` to the user id.

User

- `POST /api/v1/user/register` — register user (multipart, `file` field for profile photo)
- `POST /api/v1/user/login` — login; response sets cookie `token`
- `GET /api/v1/user/logout` — clears token cookie
- `POST /api/v1/user/profile/update` — update profile (protected, multipart `file` for resume/profile photo)

Company

- `POST /api/v1/company/register` — register a company (protected)
- `GET /api/v1/company/get` — get companies for logged-in user (protected)
- `GET /api/v1/company/get/:id` — get company details by id (protected)
- `POST /api/v1/company/update/:id` — update company (protected, multipart `file` for logo)

Job

- `POST /api/v1/job/post` — post a job (protected)
- `GET /api/v1/job/get` — list jobs; supports `keyword` query param for regex search (protected)
- `GET /api/v1/job/getadminjobs` — jobs created by current admin (protected)
- `GET /api/v1/job/get/:id` — get job by id (protected)

Application

- `GET /api/v1/application/apply/:id` — apply to job with id `:id` (protected) — note: this `apply` route uses GET in current implementation
- `GET /api/v1/application/get` — get applied jobs for current user (protected)
- `GET /api/v1/application/:id/applicants` — get applicants for job `:id` (protected)
- `POST /api/v1/application/status/:id/update` — update application status (protected)

Important implementation notes:

- File upload middleware expects the field name `file` (see `BackEnd/middlewares/multer.js`).
- Search in `getAllJobs` uses MongoDB regex on `title` and `description` (case-insensitive). No ranking or BM25-style relevance scoring is implemented.
- `apply` endpoint is implemented as an HTTP GET in `BackEnd/routes/application.route.js` — this is semantically unusual for a state-changing operation and should be converted to `POST` for clarity.

---

## Detectable omissions and issues (from code review)

- Hard-coded MongoDB connection in `BackEnd/utils/db.js`. This contains a live-looking connection string and must be replaced with `process.env.MONGO_URI` for secure, portable operation.
- CORS origin in `BackEnd/index.js` is set to a single deployed origin. Local development will require adding `http://localhost:<vite-port>` to CORS origins or using a permissive development policy.
- No benchmark, instrumentation, or logging framework is present — there are no Prometheus metrics, no request-response timing, and no test harness.
- Some endpoints use HTTP verbs that are atypical for their action (e.g., `apply` implemented as GET). Side-effecting actions should use `POST`/`PUT`/`DELETE` per REST best practices.
- Frontend `FrontEnd/src/utils/constant.js` points to a deployed host. For local development update these constants or wire them to environment variables.
- README (this file) has been rewritten to provide accurate, research-focused documentation; previously the README lacked secure setup steps and omitted notes about the hard-coded DB URL.

Unused/redundant files

- No obvious large redundant files discovered; however `FrontEnd/README.md` is generic Vite template content and does not document project-specific usage (safe to leave but non-informative).

---

## Future enhancements (recommended)

- Replace hard-coded DB URI with `MONGO_URI` env var; add `.env.example` in `BackEnd/` with placeholders.
- Convert `application.apply` endpoint to `POST /application/apply/:id` and update frontend hooks accordingly.
- Add telemetry (Prometheus exporters, structured logs) and a benchmark folder containing `k6` or `artillery` scripts plus a small seeder to create synthetic users/jobs/companies.
- Implement ranking/recommendation baselines (TF-IDF/BM25) and add offline evaluation metrics (precision@k, nDCG) and a experiments folder.
- Add unit/integration tests (Jest + Supertest) for API endpoints.

---

## License

The project contains an MIT license in the original repository. Retain or modify per your needs.

---

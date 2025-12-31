# Neurogine Full-Stack App

A simple full-stack tasks app with Spring Boot (backend) and React + Vite (frontend). Supports user registration, login (JWT), and task CRUD with search/filter.

## Stack
- Backend: Spring Boot 3 (Java 17), JPA, PostgreSQL, Security (JWT)
- Frontend: React 18 + Vite, Tailwind CSS
- DB: PostgreSQL
- API: REST over JSON

## Prerequisites
- WSL/Ubuntu or Linux/macOS
- Java 17 and Maven (or use `./mvnw` if present)
- Node.js 18+ for frontend
- Docker (optional, for quick DB + backend)

## Backend (Spring Boot)

Configure via environment variables or `application.yml`:
- `DB_URL` (default: `jdbc:postgresql://localhost:5432/neurogine`)
- `DB_USERNAME` (default: `neurogine`)
- `DB_PASSWORD` (default: `neurogine`)
- `JWT_SECRET` (required; set a strong secret)
- `JWT_EXP_SECONDS` (default: `86400`)

Run:
```bash
cd backend
./mvnw spring-boot:run
```

API endpoints:
- POST `/api/auth/register` { username, email, password }
- POST `/api/auth/login` { username, password } → { token }
- CRUD `/api/tasks` (requires `Authorization: Bearer <token>`)

## Frontend (React + Vite)

Set API base if needed:
- Create `.env` in `frontend` with `VITE_API_BASE=http://localhost:8080`

Install and run:
```bash
cd frontend
npm install
npm run dev
```

Frontend is available at http://localhost:5173.

## Docker (optional)

Use provided compose to run Postgres and backend together:
```bash
cp .env.example .env
docker compose up --build
```

## WSL/Windows Notes
- Use the WSL path `/home/mirul/neurogine` when running commands.
- Expose ports 8080 (backend) and 5173 (frontend) to Windows.

## Testing
- Backend: add tests under `backend/src/test/java` (sample tests TBD).
- Frontend: use `@testing-library/react` (optional).

## Git
Initialize and make clear commits:
```bash
git add .
git commit -m "chore: scaffold backend and frontend"
```

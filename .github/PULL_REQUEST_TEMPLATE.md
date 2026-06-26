## Description
<!-- What does this PR do? Why? Reference the issue it closes. -->

Closes #<!-- issue number -->

## Type of Change
- [ ] `feat` — New feature
- [ ] `fix` — Bug fix
- [ ] `docs` — Documentation only
- [ ] `refactor` — Code change, no feature/fix
- [ ] `test` — Adding or updating tests
- [ ] `chore` — Build process, deps, CI

## Module(s) Affected
- [ ] `backend/auth`
- [ ] `backend/users`
- [ ] `backend/tasks`
- [ ] `backend/comments`
- [ ] `backend/attachments`
- [ ] `backend/notifications`
- [ ] `backend/sockets`
- [ ] `frontend/auth`
- [ ] `frontend/admin`
- [ ] `frontend/tasks`
- [ ] `frontend/notifications`
- [ ] `.github` / CI/CD
- [ ] Documentation / SRS

## Checklist (complete before requesting review)

### Code Quality
- [ ] Code follows the existing module structure (`routes → controller → service`)
- [ ] No hardcoded secrets or credentials
- [ ] No direct SQL string concatenation — Supabase client or parameterized queries only
- [ ] Inputs validated with Joi schema (backend) and/or Zod (frontend)

### API (backend PRs only)
- [ ] `@swagger` JSDoc block added/updated for every new/changed endpoint
- [ ] HTTP status codes follow the SRS error-handling spec (`400`, `401`, `403`, `404`, `500`)
- [ ] Error thrown as `new ApiError(code, message)` — not `res.status(...)` directly in service

### Environment
- [ ] New environment variables added to `backend/.env.example` and/or `frontend/.env.example`
- [ ] No `.env` files committed

### Testing
- [ ] At least one test added/updated covering the changed logic
- [ ] `npm test` passes locally (`cd backend && npm test`)

### Documentation
- [ ] Relevant SRS section updated if requirement changed
- [ ] Module `README.md` updated (if your module has one)

## Screenshots / Demo
<!-- For frontend changes, attach a screenshot or screen recording -->

## Notes for Reviewer
<!-- Anything the reviewer should pay special attention to, trade-offs made, or follow-up tasks -->

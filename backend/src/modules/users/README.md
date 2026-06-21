# Users Module

Admin-only user management: create, list/search, update, deactivate.
All endpoints in this module require a valid login session AND the `Admin` role.

## POST /api/users

Create a new user account (admin onboarding flow).

- **Auth required:** Yes, Admin only
- **Request body:**
```json
  { "name": "string", "email": "string", "role": "Admin | Project Manager | Collaborator" }
```
- **Response (201):**
```json
  { "id": "uuid", "name": "string", "email": "string", "role": "string" }
```
  A random temporary password is generated and (currently) logged to the server console — real email delivery is not yet wired up.
- **Errors:**
  - `409` — Email already in use
  - `400` — Validation failed (missing/invalid fields)
  - `403` — Caller is not an Admin

## GET /api/users

List, search, and filter users with pagination.

- **Auth required:** Yes, Admin only
- **Query params (all optional):**
  - `search` — matches against name or email, case-insensitive
  - `role` — filter to exactly one role
  - `page` — default 1
  - `limit` — default 20
- **Response (200):**
```json
  { "data": [{ "id": "uuid", "name": "string", "email": "string", "role": "string", "is_active": true }], "total": 0 }
```
- **Errors:**
  - `403` — Caller is not an Admin

## PUT /api/users/:id

Update a user's name, role, or active status. Cannot update email through this endpoint.

- **Auth required:** Yes, Admin only
- **Request body:** at least one of:
```json
  { "name": "string", "role": "string", "is_active": true }
```
- **Response (200):** the updated user object
- **Errors:**
  - `404` — User not found
  - `400` — Validation failed
  - `403` — Caller is not an Admin

## PATCH /api/users/:id/deactivate

Soft-delete a user — they can no longer log in, but their data (tasks, comments, etc.) is preserved.

- **Auth required:** Yes, Admin only
- **Response (200):**
```json
  { "message": "User deactivated successfully" }
```
- **Errors:**
  - `404` — User not found
  - `403` — Caller is not an Admin
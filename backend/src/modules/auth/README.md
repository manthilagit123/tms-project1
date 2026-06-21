# Auth Module

Handles login and password reset.

## POST /api/auth/login

Authenticate a user and receive a JWT session cookie.

- **Auth required:** No
- **Request body:**
```json
  { "email": "user@example.com", "password": "string" }
```
- **Response (200):**
```json
  { "id": "uuid", "name": "string", "role": "Admin | Project Manager | Collaborator", "mustResetPassword": true }
```
  Also sets an `httpOnly` cookie named `token` (JWT, expires in 1 hour).
- **Errors:**
  - `401` — Invalid credentials (wrong email, wrong password, or account deactivated — same message for all three, to avoid leaking account existence)

## PUT /api/auth/reset-password

Change the logged-in user's password. Typically called after first login when `mustResetPassword` is `true`.

- **Auth required:** Yes (valid `token` cookie or `Authorization: Bearer <token>` header)
- **Request body:**
```json
  { "oldPassword": "string", "newPassword": "string" }
```
- **Response (200):**
```json
  { "message": "Password updated successfully" }
```
- **Errors:**
  - `401` — Current password incorrect
  - `400` — New password must be at least 8 characters
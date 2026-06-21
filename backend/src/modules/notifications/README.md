# Notifications Module

## Overview
Handles real-time notifications via Socket.io and REST endpoints for the Task Management System.

---

## Socket Events

### `notification:new`
Emitted live to a connected user when a new notification is created.
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "message": "Task X is due tomorrow",
  "type": "task_assigned | status_changed | comment_added | deadline_approaching",
  "is_read": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### `notification:pending`
Emitted on reconnect with all unread notifications for offline delivery.

---

## REST Endpoints

### GET /api/notifications
Get all notifications for the logged in user.
- **Auth:** Required
- **Query param:** `?unread=true` to filter unread only
- **Response:** Array of notification objects

### PATCH /api/notifications/:id/read
Mark a specific notification as read.
- **Auth:** Required
- **Response:** Updated notification object
- **Note:** Returns 404 if notification not found or belongs to another user

---

## Client-Side Socket Reference Config (for Person 5)
```js
io(url, {
  auth: { token },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});
```

---

## Notification Types
| Type | Triggered by |
|---|---|
| `task_assigned` | Person 2 — tasks.service.js |
| `status_changed` | Person 2 — tasks.service.js |
| `comment_added` | Person 2 — comments.service.js |
| `deadline_approaching` | deadlineReminder.job.js — runs daily at 8am |

---

## Integration Notes
- Person 2 calls `createNotification({ userId, message, type })` from their services
- Person 5 listens for `notification:new` and branches UI behavior on `type` field
- Person 1's `verifyToken()` is used for socket handshake authentication
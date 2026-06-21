# Notifications Module

## Socket Events

### `notification:new`
Emitted to a connected user when a new notification is created.
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "message": "Task X is due tomorrow",
  "type": "deadline_approaching",
  "is_read": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### `notification:pending`
Emitted on reconnect with all unread notifications.

---

## Client-Side Reference Config (for Person 5)
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

## REST Endpoints

### GET /api/notifications
Get all notifications for logged in user.
- Query param: `?unread=true` to filter unread only

### PATCH /api/notifications/:id/read
Mark a notification as read.
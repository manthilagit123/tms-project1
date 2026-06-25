# Notifications Module

## Components
- **NotificationBell** — unread badge; loads initial count via REST, increments live via socket.
- **NotificationPanel** — dropdown list; marks read on click. Only fetches when opened.

## Socket event contract
| Event | Payload | Used by |
|---|---|---|
| `notification:new` | `{ type, message, ... }` | NotificationBell (badge+1), TaskBoard (refetch) |
| `notification:pending` | `[{ ... }, ...]` (batch) | NotificationBell (badge += batch.length) |

## Client reconnection behavior
`socket.client.js` auto-reconnects up to 5 attempts, 1s–5s backoff.

## ⚠️ Blocking dependency
Requires Person 1 to implement `GET /api/auth/socket-token` (referenced in `notificationsApi.js`)

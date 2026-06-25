# Tasks Module

## Components
- **TaskBoard** — main Kanban view with 3 status columns (To Do / In Progress / Completed). Refetches on mount, filter change, and live socket events.
- **TaskCard** — single task display; status advances one step forward via button (no skipping to Completed). Delete shown only for PM/Admin.
- **TaskForm** — create-task modal; multi-select assignees, Zod-validated.
- **TaskFilters** — status/priority/search controls; sends the full filters object on every change.

## API
`src/api/tasksApi.js` — all task/comment/attachment REST calls, built on `axiosClient`.

## Real-time events consumed
| Event | Payload | Effect |
|---|---|---|
| `notification:new` | `{ type, ... }` | Triggers full board refetch if type is task-relevant |

## Known temporary states (remove once resolved)
- Delete confirmation uses an inline dialog — swap for Person 4's shared `Modal` once available.
- Depends on `getSocketTokenRequest` hitting a real `/api/auth/socket-token` endpoint (Person 1) — see notifications README.

# Comments Module

## Components
- **CommentSection** — list + add comment for a task, with optimistic UI update (comment appears instantly, rolled back silently if the request fails).

## API
`listCommentsRequest`, `addCommentRequest` in `src/api/tasksApi.js`.

## Not yet wired
Not mounted into any task detail view yet — exists standalone, pending a task detail screen design.

// ⚠️ TEMPORARY STUB — DO NOT MERGE TO MAIN.
// Replace with Person 4's real implementation when feature/frontend-auth-admin merges to develop.
// Contract: listUsersRequest(params) -> Promise<{ data: Array<{ id, name, email, role }> }>

import axiosClient from './axiosClient';

// Stub falls back to a hardcoded list so TaskForm's assignee picker works without a real /users endpoint.
const STUB_USERS = [
  { id: '11111111-1111-1111-1111-111111111111', name: 'Admin User',       email: 'admin@example.com',   role: 'Admin' },
  { id: '22222222-2222-2222-2222-222222222222', name: 'Project Manager',  email: 'pm@example.com',      role: 'Project Manager' },
  { id: '33333333-3333-3333-3333-333333333333', name: 'Collaborator One', email: 'collab1@example.com', role: 'Collaborator' },
  { id: '44444444-4444-4444-4444-444444444444', name: 'Collaborator Two', email: 'collab2@example.com', role: 'Collaborator' },
];

export const listUsersRequest = async (_params) => {
  try {
    // Try the real endpoint first — will work once Person 4's module is live
    const res = await axiosClient.get('/users', { params: _params });
    return res.data;
  } catch {
    // Fall back to stub data during development
    return { data: STUB_USERS };
  }
};

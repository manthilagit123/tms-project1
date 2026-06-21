
import { http, HttpResponse } from 'msw';

const API = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
    http.post(`${API}/auth/login`, async ({ request }) => {
        const { email, password } = await request.json();
        if (email === 'admin@test.com' && password === 'Test1234!') {
            return HttpResponse.json({ id: '1', name: 'Admin User', role: 'Admin', mustResetPassword: false });
        }
        return HttpResponse.json({ code: 401, message: 'Invalid credentials' }, { status: 401 });
    }),

    http.get(`${API}/users`, () => {
        return HttpResponse.json({
            data: [
                { id: '1', name: 'Admin User', email: 'admin@test.com', role: 'Admin', is_active: true },
                { id: '2', name: 'PM User', email: 'pm@test.com', role: 'Project Manager', is_active: true },
            ],
            total: 2,
        });
    }),

    http.post(`${API}/users`, async ({ request }) => {
        const body = await request.json();
        if (body.email === 'admin@test.com') {
            return HttpResponse.json({ code: 409, message: 'Email already in use' }, { status: 409 });
        }
        return HttpResponse.json({ id: 'new-id', ...body }, { status: 201 });
    }),
];
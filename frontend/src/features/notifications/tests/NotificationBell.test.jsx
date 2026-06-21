import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotificationBell from '../NotificationBell';

let socketHandlers = {};
vi.mock('../../../context/SocketContext', () => ({
  useSocket: () => ({
    on: (event, cb) => { socketHandlers[event] = cb; },
    off: () => {},
  }),
}));
vi.mock('../../../api/notificationsApi', () => ({
  listNotificationsRequest: () => Promise.resolve([]),
}));

describe('NotificationBell', () => {
  it('increments unread count on live notification:new event', async () => {
    render(<NotificationBell onClick={vi.fn()} />);
    act(() => { socketHandlers['notification:new']({ type: 'status_changed' }); });
    expect(await screen.findByText('1')).toBeInTheDocument();
  });
});

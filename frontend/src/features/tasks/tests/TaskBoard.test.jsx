import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { taskHandlers } from '../task.handlers';
import TaskBoard from '../TaskBoard';
import { AuthProvider } from '../../../context/AuthContext';

const server = setupServer(...taskHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderBoard() {
  return render(<AuthProvider><TaskBoard /></AuthProvider>);
}

describe('TaskBoard', () => {
  it('renders tasks into their status columns', async () => {
    renderBoard();
    await waitFor(() => expect(screen.getByText('Setup CI pipeline')).toBeInTheDocument());
  });

  it('shows "+ New Task" button for PM/Admin role', async () => {
    renderBoard();
    await waitFor(() => expect(screen.getByText('+ New Task')).toBeInTheDocument());
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CommentSection from '../CommentSection';
import { AuthProvider } from '../../../context/AuthContext';

vi.mock('../../../api/tasksApi', () => ({
  listCommentsRequest: () => Promise.resolve([]),
  addCommentRequest: (id, content) => Promise.resolve({ id: 'c1', content }),
}));

describe('CommentSection', () => {
  it('adds a comment optimistically on submit', async () => {
    render(<AuthProvider><CommentSection taskId="t1" /></AuthProvider>);
    fireEvent.change(screen.getByPlaceholderText('Add a comment'), { target: { value: 'Looks good' } });
    fireEvent.click(screen.getByText('Post'));
    await waitFor(() => expect(screen.getByText('Looks good')).toBeInTheDocument());
  });

  it('does not submit an empty comment', () => {
    render(<AuthProvider><CommentSection taskId="t1" /></AuthProvider>);
    fireEvent.click(screen.getByText('Post'));
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});

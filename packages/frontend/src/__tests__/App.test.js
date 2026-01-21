import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays empty state message when no todos exist', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

test('calculates and displays correct stats', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
  });
  
  expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
});

test('delete button calls API and removes todo', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo to delete', completed: false },
  ];

  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Todo to delete')).toBeInTheDocument();
  });

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('uses relative API URL instead of hardcoded localhost', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('/api/todos');
  });
});

test('displays error message when API fetch fails', async () => {
  global.fetch.mockRejectedValueOnce(new Error('Network error'));

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CharacterTable } from '../ui/character-table';
import { Character } from '@/entities/character';
import { CharacterTableSearch } from '../ui/character-table-search';

const queryClient = new QueryClient();

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, Character>;
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: undefined,
      error: null,
      isLoading: true,
      isError: false,
    })),
  };
});

describe('CharacterTable', () => {
  it('should show loading spinner while fetching data', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <CharacterTable />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render character data when API returns results', () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        count: 1,
        result: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            gender: 'male',
            skin_color: 'fair',
            eye_color: 'blue',
            hair_color: 'blond',
            url: '/luke-skywalker',
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <CharacterTable />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('172 cm')).toBeInTheDocument();
    expect(screen.getByText('77 kg')).toBeInTheDocument();
  });
});

describe('CharacterTableSearch', () => {
  it('should render search input', () => {
    render(<CharacterTableSearch handleChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should call handleChange when input changes', () => {
    const handleChange = vi.fn();
    render(<CharacterTableSearch handleChange={handleChange} />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'a' } });

    expect(handleChange).toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useCharacterStore } from '@/entities/character/model/stores';
import { CharacterForm } from '../ui/character-form';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../../store/useCharacterStore', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useCharacterStore: vi.fn(),
  };
});

beforeEach(() => {
  useCharacterStore.getState().setList([
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      skin_color: 'fair',
      eye_color: 'blue',
      hair_color: 'blond',
      url: 'https://swapi.dev/api/people/1/',
    },
  ]);
});

describe('CharacterForm', () => {
  it('should show fill in selected character data', async () => {
    render(
      <BrowserRouter>
        <CharacterForm url="https://swapi.dev/api/people/1/" />
      </BrowserRouter>
    );

    expect(
      await screen.getByDisplayValue('Luke Skywalker')
    ).toBeInTheDocument();
    expect(await screen.getByDisplayValue('172')).toBeInTheDocument();
    expect(await screen.getByDisplayValue('77')).toBeInTheDocument();
  });
});

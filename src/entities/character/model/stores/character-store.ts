import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Character } from '../../api/types';

interface ICharacterStore {
  list: Character[];
  setList: (list: Character[]) => void;
}

export const useCharacterStore = create<ICharacterStore>()(
  persist(
    (set) => ({
      list: [],
      setList: (list) => set({ list }),
    }),
    {
      name: 'character-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

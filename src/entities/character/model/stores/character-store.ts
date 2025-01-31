import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Character } from '../../api/types';

interface ICharacterStore {
  list: Character[];
  editedList: Map<string, Character>;
  setList: (
    updater: Character[] | ((prevList: Character[]) => Character[])
  ) => void;
  setEditedList: (updatedItem: Character) => void;
}

export const useCharacterStore = create<ICharacterStore>()(
  persist(
    (set) => ({
      list: [],
      editedList: new Map<string, Character>(),
      setList: (updater) =>
        set((state) => ({
          list: typeof updater === 'function' ? updater(state.list) : updater,
        })),
      setEditedList: (updatedItem) =>
        set((state) => {
          const newEditedList =
            state.editedList instanceof Map
              ? new Map(state.editedList)
              : new Map();

          if (updatedItem && updatedItem.url) {
            newEditedList.set(updatedItem.url, updatedItem);
          }

          return { editedList: newEditedList };
        }),
    }),
    {
      name: 'character-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

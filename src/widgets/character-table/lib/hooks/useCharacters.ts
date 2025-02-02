import { useQuery } from '@tanstack/react-query';
import { CharacterAPI } from '@/entities/character';
import { useCharacterStore } from '@/entities/character';
import { useEffect } from 'react';

export const useCharacters = (page: number, search: string) => {
  const { data, error, isLoading, isError } = useQuery(
    CharacterAPI.characterQueries.list(page, search)
  );
  const { list } = useCharacterStore((state) => state);

  useEffect(() => {
    /**
     * Update the character list store with the data from the API
     * @param {Character[]} data.result - The list of characters from the API
     * @returns {void}
     */
    if (data?.result) {
      useCharacterStore.setState((state) => {
        const existingMap = new Map(state.list.map((char) => [char.url, char]));
        const updatedList = data.result.map((item) => {
          const existingItem = existingMap.get(item.url);
          const editedItem =
            state.editedList instanceof Map && typeof item.url === 'string'
              ? state.editedList.get(item.url)
              : null;

          return editedItem
            ? { ...item, ...editedItem }
            : { ...item, ...existingItem };
        });

        return { list: updatedList };
      });
    }
  }, [data?.result]);

  return { list, data, error, isLoading, isError };
};

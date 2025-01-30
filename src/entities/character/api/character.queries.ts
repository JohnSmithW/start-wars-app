import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getCharacters } from './get-characters';

export const characterQueries = {
  all: () => ['characters'],
  lists: (searchParam?: string) =>
    searchParam
      ? [...characterQueries.all(), 'list', 'search', searchParam]
      : [...characterQueries.all(), 'list'],
  list: (page: number, searchParam?: string) =>
    queryOptions({
      queryKey: [...characterQueries.lists(), page, searchParam],
      queryFn: () => getCharacters(page, searchParam),
      placeholderData: keepPreviousData,
    }),
};

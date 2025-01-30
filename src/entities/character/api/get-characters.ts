import { axiosInstance } from '@/shared/api';
import type { Character } from './types';
export const getCharacters = (
  page: number,
  searchParam?: string
): Promise<{ result: Character[]; count: number }> => {
  return axiosInstance
    .get(`/people/?page=${page}${searchParam ? `&search=${searchParam}` : ''}`)
    .then((data) => {
      return { result: data.data.results, count: data.data.count };
    });
};

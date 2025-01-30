import { axiosInstance } from '@/shared/api';
import type { Character } from './types';
export const getCharacters = (
  page: number,
  searchParam?: string
): Promise<Character[]> => {
  return axiosInstance
    .get(`/people/?page=${page}${searchParam ? `&search=${searchParam}` : ''}`)
    .then((data) => data.data.results);
};

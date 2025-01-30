import { axiosInstance } from '@/shared/api';
import type { Character } from './types';
export const getCharacters = (param: string): Promise<Character[]> => {
  return axiosInstance
    .get(`/people/?search=${param}`)
    .then((data) => data.data.results);
};

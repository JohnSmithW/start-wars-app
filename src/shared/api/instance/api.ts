// shared/api/instance/api.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

import { AppApi } from './AppApi';

export const api = new AppApi({
  baseUrl: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

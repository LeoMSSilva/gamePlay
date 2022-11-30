import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://discord.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

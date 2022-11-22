import client from '@/api/client';

export const login = ({ username, password }) => client.post('/api/auth/login', { username, password });

export const register = ({ username, password }) => client.post('/api/auth/register', { username, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const list = () => client.get('/api/poems/list');

export const write = ({ title, author, body, category }) =>
  client.post('/api/poems', { title, author, body, category });

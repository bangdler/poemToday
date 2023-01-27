import client from '@/api/client';

export const list = ({ page, username, category, number }) =>
  client.get(`/api/poems`, { params: { page, username, category, number } });

export const write = ({ title, author, body, category }) =>
  client.post('/api/poems', { title, author, body, category });

export const read = ({ id }) => client.get(`/api/poems/${id}`);

export const remove = ({ id }) => client.delete(`/api/poems/${id}`);

export const update = ({ id, title, author, body, category }) =>
  client.patch(`/api/poems/${id}`, { title, author, body, category });

export const search = ({ text, page, number }) => client.get('/api/poems/search', { params: { text, page, number } });

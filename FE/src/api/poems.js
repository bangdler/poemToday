import client from '@/api/client';

export const list = ({ page, username, category }) =>
  client.get(`/api/poems`, { params: { page, username, category } });

export const write = ({ title, author, body, category }) =>
  client.post('/api/poems', { title, author, body, category });

export const read = ({ id }) => client.get(`/api/poems/${id}`);

export const remove = ({ id }) => client.delete(`/api/poems/${id}`);

export const update = ({ id, title, author, body, category }) =>
  client.patch(`/api/poems/${id}`, { title, author, body, category });

export const search = ({ text, page }) => client.get('/api/poems/search', { params: { text, page } });

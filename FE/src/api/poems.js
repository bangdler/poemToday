import client from '@/api/client';

export const list = ({ page, username }) => client.get(`/api/poems`, { params: { page, username } });

export const write = ({ title, author, body, category }) =>
  client.post('/api/poems', { title, author, body, category });

export const read = ({ id }) => client.get(`/api/poems/${id}`);

export const remove = ({ id }) => client.delete(`/api/poems/${id}`);

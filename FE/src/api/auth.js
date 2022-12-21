import client from '@/api/client';

export const login = ({ username, password }) => client.post('/api/auth/login', { username, password });

export const register = ({ username, password, email, authCode }) =>
  client.post('/api/auth/register', { username, password, email, authCode });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const resign = () => client.delete('/api/auth/resign');

export const changePassword = ({ existPassword, newPassword }) =>
  client.patch('/api/auth/password', { existPassword, newPassword });

export const verifyEmail = ({ email }) => client.post('/api/auth/verifyEmail', { email });

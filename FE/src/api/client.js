import axios from 'axios';
import { stringify } from 'qs';

const client = axios.create({
  baseURL: process.env.API_SERVER,
  paramsSerializer: {
    serialize: params => stringify(params, { arrayFormat: 'repeat' }),
  },
  withCredentials: true,
  timeout: 66000,
});

export default client;

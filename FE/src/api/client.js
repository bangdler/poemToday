import axios from 'axios';
import { stringify } from 'qs';

const client = axios.create({
  paramsSerializer: {
    serialize: params => stringify(params, { arrayFormat: 'repeat' }),
  },
});

export default client;

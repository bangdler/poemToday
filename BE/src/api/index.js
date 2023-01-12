import Router from 'koa-router';

import auth from './auth.js';
import poems from './poems.js';

const api = new Router();

api.use('/poems', poems.routes());
api.use('/auth', auth.routes());

export default api;

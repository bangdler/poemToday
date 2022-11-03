import Router from 'koa-router';

import poems from './poems.js';

const api = new Router();

api.use('/poems', poems.routes());

export default api;

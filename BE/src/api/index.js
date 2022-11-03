const Router = require('koa-router');

const poems = require('./poems');

const api = new Router();

api.use('/poems', poems.routes());

module.exports = api;

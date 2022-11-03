const Router = require('koa-router');

const poemsCtrl = require('./poems.ctrl');

const poems = new Router();

poems.get('/', poemsCtrl.list);
poems.post('/', poemsCtrl.write);
poems.get('/:id', poemsCtrl.read);
poems.delete('/:id', poemsCtrl.remove);
poems.put('/:id', poemsCtrl.replace);
poems.patch('/:id', poemsCtrl.update);

module.exports = poems;

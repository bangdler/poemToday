import Router from 'koa-router';

import * as poemsCtrl from './poems.ctrl.js';

const poems = new Router();

poems.get('/', poemsCtrl.list);
poems.post('/', poemsCtrl.write);
poems.get('/:id', poemsCtrl.read);
poems.delete('/:id', poemsCtrl.remove);
poems.patch('/:id', poemsCtrl.update);

export default poems;

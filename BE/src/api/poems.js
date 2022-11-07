import Router from 'koa-router';

import * as poemsCtrl from './poems.ctrl.js';

const poems = new Router();

poems.get('/', poemsCtrl.list);
poems.post('/', poemsCtrl.write);
poems.get('/:id', poemsCtrl.checkObjectId, poemsCtrl.read);
poems.delete('/:id', poemsCtrl.checkObjectId, poemsCtrl.remove);
poems.patch('/:id', poemsCtrl.checkObjectId, poemsCtrl.update);

export default poems;

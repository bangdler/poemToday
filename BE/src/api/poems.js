import Router from 'koa-router';

import * as poemsCtrl from './poems.ctrl.js';

const poems = new Router();

poems.get('/', poemsCtrl.list);
poems.post('/', poemsCtrl.write);
poems.get('/:id', poemsCtrl.read);
poems.delete('/:id', poemsCtrl.remove);
poems.put('/:id', poemsCtrl.replace);
poems.patch('/:id', poemsCtrl.update);

export default poems;

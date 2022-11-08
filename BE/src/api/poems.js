import Router from 'koa-router';

import checkLoggedIn from '../utils/checkLoggedIn.js';
import * as poemsCtrl from './poems.ctrl.js';

const poems = new Router();

poems.get('/', poemsCtrl.list);
poems.post('/', checkLoggedIn, poemsCtrl.write);

const poem = new Router();

poem.get('/', poemsCtrl.read);
poem.delete('/', checkLoggedIn, poemsCtrl.checkOwnPoem, poemsCtrl.remove);
poem.patch('/', checkLoggedIn, poemsCtrl.checkOwnPoem, poemsCtrl.update);

poems.use('/:id', poemsCtrl.getPoemById, poem.routes());

export default poems;

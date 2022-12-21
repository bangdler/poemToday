import Router from 'koa-router';

import checkLoggedIn from '../utils/checkLoggedIn.js';
import * as authCtrl from './auth.ctrl.js';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.delete('/resign', checkLoggedIn, authCtrl.resign);
auth.patch('/password', checkLoggedIn, authCtrl.changePassword);
auth.post('/verifyEmail', authCtrl.verifyEmail);
auth.post('/forgotPassword', authCtrl.forgotPassword);

export default auth;

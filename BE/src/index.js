import cors from '@koa/cors';
import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import proxy from 'koa-proxies';
import Router from 'koa-router';
import mongoose from 'mongoose';

import api from './api/index.js';
import jwtMiddleware from './utils/jwtMiddleware.js';

dotenv.config();

const { PORT, MONGO_URI, CLIENT_HOST } = process.env;
const port = PORT || 4000;
const app = new Koa();
const router = new Router();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, dbName: 'poems' })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.error(e);
  });

// // CORS 옵션
// let corsOptions = {
//   origin: process.env.CLIENT_HOST,
//   credentials: true,
// };
//
// // CORS 허용
// app.proxy = true; // true 일때 proxy 헤더들을 신뢰함
app.use(cors());

app.use(
  proxy('/', {
    target: CLIENT_HOST,
    changeOrigin: true,
    logs: true,
  })
);

router.use('/api', api.routes());

app.use(bodyParser());
// 토큰 검증 미들웨어
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log('Listening to port 4000');
});

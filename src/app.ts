import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { routers } from './routers/index';

const app = new Koa();

app
  .use(routers.routes())
  .use(routers.allowedMethods())
  .use(bodyParser());

module.exports = app;

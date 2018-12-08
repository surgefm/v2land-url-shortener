import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { routers } from './routers/index';
import sequelize = require('sequelize');

const app = new Koa();
import db from './models';

app
  .use(bodyParser({ onerror: function(err, ctx) {
    ctx.throw('body parse error' + err, 422);
  } }))
  .use(routers.routes())
  .use(routers.allowedMethods());

db
  .sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: sequelize.Errors) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;

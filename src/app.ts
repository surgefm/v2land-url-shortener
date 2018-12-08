import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { routers } from './routers/index';
import sequelize = require('sequelize');

const app = new Koa();
import db from './models';

app
  .use(routers.routes())
  .use(routers.allowedMethods())
  .use(bodyParser());

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

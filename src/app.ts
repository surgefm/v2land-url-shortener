import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/*', async (ctx: Koa.BaseContext) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes());

module.exports = app;
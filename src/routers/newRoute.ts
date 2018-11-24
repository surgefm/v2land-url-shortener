import Koa from 'koa';
import {} from 'koa-bodyparser';
import Router from 'koa-router';
import { generateId } from '../utils';

const router = new Router();

const routers = router
  .param('shortId', (param: any, ctx: Koa.Context, next: () => Promise<any>) => {
    if (param === '') {
      ctx.query['shortId'] = generateId();
    }
    return next();
  })
  .post('new', '/new/:shortId*', async (ctx: Koa.Context) => {
    const shortId = ctx.params.hasOwnProperty('shortId') && ctx.params.shortId !== undefined ? ctx.params.shortId : generateId();

    const postData = ctx.request.body;
    if (postData && postData.hasOwnProperty('url')) {
    // TODO: generate
    }

    ctx.body = shortId;
  });

export default routers;

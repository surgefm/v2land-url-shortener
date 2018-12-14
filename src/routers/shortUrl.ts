import Koa from 'koa';
import {} from 'koa-bodyparser';
import Router from 'koa-router';
import { generateId, generateError } from '../utils';
import { newUrl, getUrl } from '../controllers/url';

const router = new Router();

const routers = router
  .post(':shortUrl*', async (ctx: Koa.Context) => {
    const postData: {url?: string} | null | undefined = ctx.request.body;

    if (postData !== undefined && postData !== null && postData.hasOwnProperty('url') && postData.url !== undefined) {
      try {
        const shortUrl = ctx.params.hasOwnProperty('shortUrl') && ctx.params.shortUrl !== undefined ? ctx.params.shortUrl : generateId();

        await newUrl(shortUrl, postData.url);
        ctx.body = { error: false, shortUrl };
        console.info('New shortUrl:', shortUrl, postData.url);
      } catch (error) {
        console.log(error);
        generateError(ctx, error);
      }
    } else {
      generateError(ctx, 'URL not found in post data.');
    }
  })
  .get(':shortUrl', async (ctx: Koa.Context) => {
    console.info('Trying to get', ctx.params.shortUrl);
    const shortUrl = ctx.params.shortUrl;
    try {
      const url = await getUrl(shortUrl);
      ctx.redirect(url);
    } catch (error) {
      console.log(error);
      generateError(ctx, error);
    }
  })
  .get('', async (ctx: Koa.Context) => {
    ctx.redirect('https://langchao.org');
  });

export default routers;

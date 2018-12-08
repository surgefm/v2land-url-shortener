const routers = require('koa-router')();

import shortUrlRoute from './shortUrl';

routers.use('/', shortUrlRoute.routes(), shortUrlRoute.allowedMethods());

export { routers };

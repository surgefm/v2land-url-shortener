const routers = require('koa-router')();

import newRoute from './newRoute';

routers.use('/api', newRoute.routes(), newRoute.allowedMethods());

export { routers };

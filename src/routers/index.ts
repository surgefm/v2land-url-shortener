const routers = require('koa-router')();

const newRoute = require('./newRoute');

routers.use('/api', newRoute.routes(), newRoute.allowedMethods());

export { routers };

import Koa from 'koa';
import * as redis from 'redis';

/**
 * @returns {string} short id
 */
function generateId(): string {
  const Hashids = require('hashids');
  const hashids = new Hashids('', 0, 'abcdefghijklmnopqrstuvwxyz0123456789');
  return hashids.encode(
    Math.floor(Math.random() * Math.floor(100)),
    Math.floor(Date.now() / 1000 - 1543017600 /* time of Nov 25, 2018 */)
  );
}

/**
 * @param  {Number} id
 * @returns string
 */
function idToHashId(id: Number): string {
  const Hashids = require('hashids');
  const hashids = new Hashids('', 0, 'abcdefghijklmnopqrstuvwxyz0123456789');
  return hashids.encode(id);
}
/**
 * Generate error
 * @param  {Koa.Context} ctx
 * @param  {''} message
 */
function generateError(ctx: Koa.Context, message: string) {
  ctx.body = {
    error: true,
    message: message,
    request: ctx.request.URL,
  };
}

/**
 * Init a new redis client
 */
function redisFactory(): Promise<redis.RedisClient> {
  return new Promise<redis.RedisClient>((resolve, reject) => {
    try {
      const env = process.env.NODE_ENV || 'development';
      const redisConfig = require(__dirname + '/config.json')[env].redis;
      const instance: redis.RedisClient = redis.createClient({
        url: redisConfig.url,
        retry_strategy(options: redis.RetryStrategyOptions): number | Error {
          reject(
            '[Redis] Not able to create client, reason: ' +
              options.error.message
          );
          return options.error;
        },
      });
      instance.on('connect', () => {
        resolve(instance);
      });
    } catch (error) {
      reject(
        '[Redis] Unknown exception during client creation, reason: ' +
          error.message
      );
    }
  });
}
export { generateId, generateError, redisFactory, idToHashId };

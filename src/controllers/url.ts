import db from '../models';
import redis from 'redis';
import { isUri } from 'valid-url';
import { promisify } from 'util';
import { redisFactory } from '../utils';

const env = process.env.NODE_ENV || 'development';
const redisConfig = require(__dirname + '/../config.json')[env].redis;
let redisInstance: redis.RedisClient;


/**
 * Create new short url entry
 * @param  {string} shortUrl
 * @param  {string} url
 */
function newUrl(shortUrl: string, url: string) {
  return new Promise(async (resolve, reject) => {
    let id: string = '';

    if (!isUri(url)) reject('Invalid URL.');

    try {
      const existance = await db.URL.count({
        where: {
          shortUrl: shortUrl,
        },
      });

      if (existance > 0) reject('Short URL exist.');

      const result = await db.URL.create({
        shortUrl: shortUrl,
        url: url,
      });
      if (result.id !== undefined) id = result.id;
    } catch {
      reject('Database error.');
    }

    if (id !== '') {
      if (redisConfig.enabled) {
        if (redisInstance === undefined) {
          try {
            redisInstance = await redisFactory();
          } catch (error) {
            reject(error);
          }
        }
        redisInstance.set(id, url);
      }
      resolve(id);
    } else {
      reject('Unable to create new entry.');
    }
  });
}
/**
 * Get full URL from short URL.
 * @param  {string} shortUrl
 */
function getUrl(shortUrl: string) {
  return new Promise<string>(async (resolve, reject) => {
    let url: string = '';
    if (redisConfig.enabled) {
      if (redisInstance === undefined) {
        try {
          redisInstance = await redisFactory();
        } catch (error) {
          reject(error);
        }
      }

      const getAsync = promisify(redisInstance.get).bind(redisInstance);
      url = await getAsync(shortUrl);
    }
    if (url === '') {
      const result = await db.URL.findOne({ where: {
        shortUrl: shortUrl,
      } });

      if (result) url = result.url;
    }
    if (url === '' || url === null || url === undefined) {
      reject('Unable to get the full url.');
    } else {
      resolve(url);
    }
  });
}

export {
  newUrl,
  getUrl,
};

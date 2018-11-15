/**
 * @returns {string} short id
 */
function generateId() : string {
  const Hashids = require('hashids');
  const hashids = new Hashids('', 0, 'abcdefghijklmnopqrstuvwxyz0123456789');
  return hashids.encode(Math.floor(Math.random() * Math.floor(100)), Math.floor(Date.now() / 1000));
}

export { generateId };

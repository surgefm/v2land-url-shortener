/**
 * @returns {string} short id
 */
function generateId() : string {
  const Hashids = require('hashids');
  const hashids = new Hashids('', 0, 'abcdefghijklmnopqrstuvwxyz0123456789');
  return hashids.encode(Math.floor(Math.random() * Math.floor(100)), Math.floor(Date.now() / 1000 - 1543017600 /* time of Nov 25, 2018 */));
}

export { generateId };

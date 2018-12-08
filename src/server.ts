const app = require('./app');

app.listen(3000);

console.info('Server running on port 3000');
console.info('Environment:', process.env.NODE_ENV || 'development')
;

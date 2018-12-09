import sequelize = require('sequelize');

import db from './models';

db
  .sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    db.sequelize.sync().then(() => {
      console.log('Successfully sync database models.');
    }).catch((error) => {
      console.error('Failed on syncing', error);
    });
  })
  .catch((err: sequelize.Errors) => {
    console.error('Unable to connect to the database:', err);
  });

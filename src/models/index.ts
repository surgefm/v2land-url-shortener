import Sequelize from 'sequelize';
import urlFactory from './url';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config.json')[env];
config.operatorsAliases = Sequelize.Op;

const sequelize = new Sequelize(config.url, config);

const db = {
  sequelize,
  Sequelize,
  URL: urlFactory(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;

import * as Sequelize from 'sequelize';
import UrlAttributes from '../interfaces/urlAttributes';

type UrlInstance = Sequelize.Instance<UrlAttributes> & UrlAttributes;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<UrlAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shortUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };
  return sequalize.define<UrlInstance, UrlAttributes>('Url', attributes);
};

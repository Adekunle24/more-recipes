
import Sequelize from 'sequelize';


const Media = sequelize => sequelize.define('media', {
  id: {
    type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
  },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  filename: { type: Sequelize.STRING, allowNull: false },
  filesize: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  source: { type: Sequelize.STRING, allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false }
});

export default Media;


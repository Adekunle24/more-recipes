import Config from '../config/config.json';
const config = Config['development'];
import Sequelize from 'sequelize';
const sequelize = new Sequelize(config.database,config.username, config.password,config.options);

const recipe = sequelize.define('recipes',{
  title : { type : Sequelize.STRING, allowNull : false, defaultValue : 'Unknown Title' },
  createdAt : { type : Sequelize.TIME, allowNull : true },
  updatedAt : { type : Sequelize.TIME, allowNull : true },
  userId : { type : Sequelize.INTEGER, allowNull : false },
  procedures : { type : Sequelize.STRING, allowNull : false },
  ingredients : { type : Sequelize.JSON, allowNull : false, defaultValue : 'No ingredients'}
});

export default  recipe;

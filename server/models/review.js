import Config from '../config/config.json';
const config = Config['development'];
import Sequelize from 'sequelize';
const sequelize = new Sequelize(config.database,config.username, config.password,config.options);

const reviews = sequelize.define('reviews',{
  recipeId : { type : Sequelize.INTEGER, allowNull: false},
  userId : { type : Sequelize.INTEGER, allowNull : false },
  replies : { type: Sequelize.STRING, allowNull : true },
  review : { type : Sequelize.STRING, allowNull : false },
  createdAt : { type : Sequelize.DATE, allowNull : false },
  updatedAt : { type : Sequelize.DATE, allowNull : false }
});

export default  reviews;

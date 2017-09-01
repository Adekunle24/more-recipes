
import Sequelize from 'sequelize';
import sequelize from '../config';

const recipe = sequelize.define('usersProfile',{
  userId : { type : Sequelize.INTEGER, allowNull : false },
  createdAt : { type : Sequelize.TIME, allowNull : true },
  updatedAt : { type : Sequelize.TIME, allowNull : true },
  firstName : { type : Sequelize.STRING, allowNull : true },
  lastName : { type : Sequelize.STRING, allowNull : true },
});

export default  recipe;

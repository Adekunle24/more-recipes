import sequelizeApp from '../config';
const sequelize = sequelizeApp.sequelize;
const Sequelize = sequelize.Sequelize;
const recipe = sequelize.define('recipes',{
  title : { type : Sequelize.STRING, allowNull : false },
  createdAt : { type : Sequelize.TIME, allowNull : true },
  updatedAt : { type : Sequelize.TIME, allowNull : true },
  userId : { type : Sequelize.INTEGER, allowNull : false },
  procedures : { type : Sequelize.STRING, allowNull : false },
  ingredients : { type : Sequelize.JSON, allowNull : false, defaultValue : 'No ingredients'}
});

export default  recipe;

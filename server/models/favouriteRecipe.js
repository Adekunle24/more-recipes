import Sequelize from 'sequelize';
import sequelize from '../config';

const favouriteRecipes = sequelize.define('favourite_recipes',{
  createdAt : { type : Sequelize.TIME, allowNull : true },
  updatedAt : { type : Sequelize.TIME, allowNull : true },
  userId : { type : Sequelize.INTEGER, allowNull : false },
  recipeId : { type : Sequelize.INTEGER, allowNull : false }
});

export default  favouriteRecipes;

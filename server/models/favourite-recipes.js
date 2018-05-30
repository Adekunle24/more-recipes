
import Sequelize from 'sequelize';


const FavouriteRecipe = sequelize =>
  sequelize.define('favourite_recipes', {
    recipeId: { type: Sequelize.INTEGER, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });


export default FavouriteRecipe;


import allModels from '../models';

const favouriteRecipeModel = allModels.favourite_recipes;
const recipeModel = allModels.recipes;

const getAllFavoriteRecipes = (req, res) => {
  favouriteRecipeModel.findAll(
    {
      where: {
        userId: req.params.userId
      }
    }
  ).then(output => res.json({ status: 'success', data: output })).catch(error => res.send(error));
};

const addFavoriteRecipe = (req, res) => {
  if (req.params.recipeId) {
    favouriteRecipeModel.findAndCountAll({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then((output) => {
      if (output.count === 1) {
        res.json({ status: 'fail', message: 'This recipe already exist on your list of favourite recipes' });
      } else if (output.count === 0) {
        favouriteRecipeModel.create(
          {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        ).then((output) => {
          recipeModel.findById(req.params.recipeId).then((response) => {
            res.json({ status: 'success', data: { favourite: output, recipe: response } });
          }).catch(error => res.send(error));
        }).catch(error => res.send(error));
      }
    });
  } else {
    res.json({ status: 'fail', data: { message: 'please provide a recipe ID' }, validations: false });
  }
};
const removeFromFavoriteRecipes = (req, res) => {
  favouriteRecipeModel.destroy(
    {
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }
  ).then(output => res.json({ status: 'success', message: 'Recipe removed successfully' })).catch(error => res.send(error));
};

const allMethods = { getFavouriteRecipes: getAllFavoriteRecipes, addFavourite: addFavoriteRecipe, removeFavourite: removeFromFavoriteRecipes };
export default allMethods;

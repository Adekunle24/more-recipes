
import allModels from '../models';
import MiddleWare from '../middleware';

const middleware = new MiddleWare();

const favouriteRecipeModel = allModels.favourite_recipes;
const recipeModel = allModels.recipes;
/**
 * get all favourites recipes of a user
 * @param  {object} req request object
 * @param  {object} res response object
 * @returns {null} does not return a value
 */
const getAllFavoriteRecipes = (req, res) => {
  favouriteRecipeModel.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      { model: recipeModel }
    ],
  }).then(output => res.json({ status: 'success', data: output })).catch(error => res.json(error.toString()));
};
const addFavoriteRecipe = (req, res) => {
  if (req.params.recipeId) {
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({ status: 'fail', message: 'recipe id must be a number' });
    }
    favouriteRecipeModel.findAndCountAll({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then((output) => {
      if (output.count === 1) {
        res.json({ status: 'fail', message: 'This recipe already exist on your list of favourite recipes' });
      } else if (output.count === 0) {
        favouriteRecipeModel.create({
          userId: req.decoded.id,
          recipeId: req.params.recipeId
        }).then((output) => {
          recipeModel.findById(req.params.recipeId).then((response) => {
            res.json({
              status: 'success',
              message: 'Recipe successfully added to your favourites list',
              data: { favourite: output, recipe: response }
            });
          }).catch(error => res.send(error));
        }).catch(error => res.send(error));
      }
    });
  } else {
    res.json({ status: 'fail', data: { message: 'please provide a recipe ID' }, validations: false });
  }
};
/**
 * Remove recipe from favourite recipes list
 * @param  {object} req request object
 * @param  {object} res response object
 * @returns {null} returns null
 */
const removeFromFavoriteRecipes = (req, res) => {
  if (!middleware.validateStringIsNumber(req.params.recipeId)) {
    res.json({ status: 'fail', message: 'recipe id must be a number' });
  }
  favouriteRecipeModel.destroy({
    where: {
      userId: req.decoded.id,
      recipeId: req.params.recipeId
    }
  }).then(output => res.json({ status: 'success', message: 'Recipe removed successfully' })).catch(error => res.send(error));
};

const allMethods = {
  getFavouriteRecipes: getAllFavoriteRecipes,
  addFavourite: addFavoriteRecipe,
  removeFavourite: removeFromFavoriteRecipes
};
export default allMethods;

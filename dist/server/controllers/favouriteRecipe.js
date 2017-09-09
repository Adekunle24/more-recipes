'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = new _middleware2.default();

var favouriteRecipeModel = _models2.default.favourite_recipes;
var recipeModel = _models2.default.recipes;
/**
 * get all favourites recipes of a user
 * @param  {object} req request object
 * @param  {object} res response object
 * @returns {null} does not return a value
 */
var getAllFavoriteRecipes = function getAllFavoriteRecipes(req, res) {
  favouriteRecipeModel.findAll({
    where: {
      userId: req.params.userId
    },
    include: [{ model: recipeModel }]
  }).then(function (output) {
    return res.json({ status: 'success', data: output });
  }).catch(function (error) {
    return res.json(error.toString());
  });
};
var addFavoriteRecipe = function addFavoriteRecipe(req, res) {
  if (req.params.recipeId) {
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({ status: 'fail', message: 'recipe id must be a number' });
      return;
    }
    favouriteRecipeModel.findAndCountAll({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then(function (output) {
      if (output.count === 1) {
        res.json({ status: 'fail', message: 'This recipe already exist on your list of favourite recipes' });
      } else if (output.count === 0) {
        favouriteRecipeModel.create({
          userId: req.decoded.id,
          recipeId: req.params.recipeId
        }).then(function (output) {
          recipeModel.findById(req.params.recipeId).then(function (response) {
            res.json({
              status: 'success',
              message: 'Recipe successfully added to your favourites list',
              data: { favourite: output, recipe: response }
            });
          }).catch(function (error) {
            return res.send(error);
          });
        }).catch(function (error) {
          return res.send(error);
        });
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
var removeFromFavoriteRecipes = function removeFromFavoriteRecipes(req, res) {
  if (!middleware.validateStringIsNumber(req.params.recipeId)) {
    res.json({ status: 'fail', message: 'recipe id must be a number' });
    return;
  }
  favouriteRecipeModel.destroy({
    where: {
      userId: req.decoded.id,
      recipeId: req.params.recipeId
    }
  }).then(function (output) {
    return res.json({ status: 'success', message: 'Recipe removed successfully' });
  }).catch(function (error) {
    return res.send(error);
  });
};

var allMethods = {
  getFavouriteRecipes: getAllFavoriteRecipes,
  addFavourite: addFavoriteRecipe,
  removeFavourite: removeFromFavoriteRecipes
};
exports.default = allMethods;
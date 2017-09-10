'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// contains all routes for the application
_dotenv2.default.config();

var routes = _express2.default.Router();

var MiddleWares = new _middleware2.default();
MiddleWares.verifyJsonWebToken(routes);

// api get all users
routes.route('/api/v1/users').get(_controllers2.default.usersController.getTotalUsers).delete(_controllers2.default.usersController.removeUser);

routes.post('/api/v1/displaytoken', function (req, res) {
  res.send(req.decoded);
});

routes.get('/api/v1/recipes', _controllers2.default.recipesController.getTotalRecipes);
routes.post('/api/v1/recipes', _controllers2.default.recipesController.addRecipe);

// api-edit-recipe route
routes.put('/api/v1/recipes', _controllers2.default.recipesController.modifyRecipe);

// api-delete-recipe route
routes.delete('/api/v1/recipes', _controllers2.default.recipesController.deleteRecipe);

// api to search for recipes based on ingredient
routes.get('/api/v1/recipes/search', _controllers2.default.recipesController.searchRecipeUsingIngredient);

// route that allows a logged in user to post a review for a recipe
routes.post('/api/v1/recipes/:recipeId/reviews', _controllers2.default.reviewsController.saveReviewToDb);

routes.put('/api/v1/recipes/:recipeId/reviews', _controllers2.default.reviewsController.saveReviewToDb);

// route show all reviews for a recipe
routes.get('/api/v1/recipes/:recipeId/reviews', _controllers2.default.reviewsController.getAllReviews);

// route to get all favourite recipes for a user
routes.get('/api/v1/users/:userId/recipes', _controllers2.default.favouriteRecipeController.getFavouriteRecipes);

// route for a user to add recipe to favourites list
routes.post('/api/v1/recipes/:recipeId/favourites', _controllers2.default.favouriteRecipeController.addFavourite);
routes.put('/api/v1/recipes/:recipeId/favourites', _controllers2.default.favouriteRecipeController.addFavourite);
routes.delete('/api/v1/recipes/:recipeId/favourites', _controllers2.default.favouriteRecipeController.removeFavourite);
routes.get('/api/v1/recipes?sort=upvotes&order=ascending', _controllers2.default.recipesController.getRecipeWithMostUpVotes);

// routes that handles voting: upvote and downvote action
// this api handles upvoting
routes.post('/api/v1/vote/:recipeId/up', _controllers2.default.votesController.upVote);
// this api handles downvoting
routes.post('/api/v1/vote/:recipeId/down', _controllers2.default.votesController.downVote);

exports.default = routes;
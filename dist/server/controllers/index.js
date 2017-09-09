'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _recipe = require('./recipe');

var _recipe2 = _interopRequireDefault(_recipe);

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

var _favouriteRecipe = require('./favouriteRecipe');

var _favouriteRecipe2 = _interopRequireDefault(_favouriteRecipe);

var _votes = require('./votes');

var _votes2 = _interopRequireDefault(_votes);

var _socialValues = require('./socialValues');

var _socialValues2 = _interopRequireDefault(_socialValues);

var _usersProfile = require('./usersProfile');

var _usersProfile2 = _interopRequireDefault(_usersProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = {
  usersController: _users2.default,
  recipesController: _recipe2.default,
  reviewsController: _review2.default,
  favouriteRecipeController: _favouriteRecipe2.default,
  votesController: _votes2.default,
  socialValueController: _socialValues2.default,
  usersProfileController: _usersProfile2.default
};
exports.default = controllers;
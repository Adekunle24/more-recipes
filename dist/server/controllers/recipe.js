'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipeModel = _models2.default.recipes;
var userModel = _models2.default.users;
var voteModel = _models2.default.votes;
var reviewModel = _models2.default.reviews;
var socialValuesModel = _models2.default.social_values;
var middleware = new _middleware2.default();

var getTotalRecipes = function getTotalRecipes(req, res) {
  if (req.query.sort && req.query.order) {
    _controllers2.default.socialValueController.getValuesInDesc(req, res);
  } else {
    recipeModel.findAll({
      include: [{
        model: userModel,
        attributes: ['username', 'email', 'id'],
        as: 'users'
      }, {
        model: socialValuesModel,
        as: 'socialValues'
      }]
    }).then(function (value) {
      return res.json({ status: 'success', data: value });
    }).catch(function (error) {
      return res.send(error.toString());
    });
  }
};

var addRecipe = function addRecipe(req, res) {
  if (req.body.title && req.body.procedures && req.body.ingredients && req.decoded) {
    if (!middleware.validateAddRecipePropertiesLength(req)) {
      res.json({
        status: 'fail',
        data: null,
        validations: false,
        message: 'Title,procedures, and ingredients must be equal to or greater than 10 characters in length'
      });
      return;
    }
    if (!middleware.validateRecipeTitle(req.body.title)) {
      res.json({
        status: 'fail', data: null, validations: false, message: 'Title contains disallowed character(s). Please try again'
      });
      return;
    }
    recipeModel.create({
      title: req.body.title,
      userId: req.decoded.id,
      procedures: req.body.procedures,
      ingredients: req.body.ingredients
    }).then(function (result) {
      socialValuesModel.create({
        recipeId: result.id,
        upvotes: 0,
        downvotes: 0,
        replies: 0
      }).then(function (social) {
        res.json({
          status: 'success',
          data: { recipes: result, socialValues: social },
          message: 'Recipe added successfully'
        });
      }).catch(function (error) {
        return res.send(error.toString());
      });
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({
      status: 'fail',
      data: null,
      validations: false,
      message: 'Please provide title,procedures, and ingredients'
    });
  }
};
/**
 * Saves modified recipe to db
 * @param  {object} req request object
 * @param  {object} res response object
 * @param  {object} data  post object
 * @returns {null} return null
 */
var saveModifiedRecipe = function saveModifiedRecipe(req, res, data) {
  if (req.decoded.id === data.userId) {
    data.update({
      title: req.body.title || data.title,
      procedures: req.body.procedures || data.procedures,
      ingredients: req.body.ingredients || data.ingredients
    }).then(function (output) {
      if (output[0] === 0) {
        res.json({ status: 'fail', message: 'Specified recipe could not be found' });
      } else {
        res.json({ status: 'success', message: 'Recipe modified successfully', data: output });
      }
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({ status: 'fail', message: 'You do not have the permission to modify this recipe. Contact the owner' });
  }
};

/** Modify a recipe
 * @param  {object} req request object
 * @param  {object} res response object
 * @returns {null} return null
 */
var modifyRecipe = function modifyRecipe(req, res) {
  if (req.body.recipeId) {
    if (!middleware.validateStringIsNumber(req.body.recipeId)) {
      res.json({ message: 'Recipe id must be a number', validations: false, status: 'fail' });
      return;
    }
    recipeModel.findById(req.body.recipeId).then(function (result) {
      if (result) {
        // call the method to save new recipe details
        saveModifiedRecipe(req, res, result);
      } else {
        res.json({ status: 'fail', message: 'Specified recipe could not be found' });
      }
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({ status: 'fail', validations: false, message: 'Please provide a Recipe Id' });
  }
};

var deleteRecipe = function deleteRecipe(req, res) {
  if (req.body.recipeId) {
    if (!middleware.validateStringIsNumber(req.body.recipeId)) {
      res.json({ message: 'Recipe id must be a number', validations: false, status: 'fail' });
      return;
    }
    recipeModel.findById(req.body.recipeId).then(function (recipe) {
      if (!recipe) {
        res.json({ message: 'Specified recipe could not be found', status: 'fail' });
      } else {
        recipe.destroy().then(function (output) {
          return res.json({ status: 'success', message: 'Recipe deleted successfully' });
        }).catch(function (error) {
          return middleware.parseSequelizeError(res, error);
        });
      }
    }).catch(function (error) {
      return res.send(error);
    });
  } else {
    res.json({ message: 'Please provide a recipe Id', validations: false, status: 'fail' });
  }
};
var getRecipeWithMostUpVotes = function getRecipeWithMostUpVotes(req, res) {
  res.send('api route to get most upvotes');
};

var searchRecipeUsingIngredient = function searchRecipeUsingIngredient(req, res) {
  if (req.query.keyword) {
    recipeModel.findAndCountAll({
      where: {
        $or: [{
          title: {
            $iLike: '%' + req.query.keyword + '%'
          }
        }, {
          ingredients: {
            $iLike: '%' + req.query.keyword + '%'
          }
        }, {
          procedures: {
            $iLike: '%' + req.query.keyword + '%'
          }
        }]
      },
      include: [{
        model: userModel,
        attributes: ['username', 'email', 'id'],
        as: 'users'
      }, {
        model: socialValuesModel,
        as: 'socialValues'
      }]
    }).then(function (result) {
      return res.json({ status: 'success', searchResults: result.count, data: result.rows });
    }).catch(function (error) {
      return res.send(error.toString());
    });
  } else {
    res.json({ status: 'fail', message: 'Please specify a keyword', data: null });
  }
};
var allMethods = {
  getTotalRecipes: getTotalRecipes,
  addRecipe: addRecipe,
  modifyRecipe: modifyRecipe,
  setModifiedRecipe: modifyRecipe,
  deleteRecipe: deleteRecipe,
  getRecipeWithMostUpVotes: getRecipeWithMostUpVotes,
  searchRecipeUsingIngredient: searchRecipeUsingIngredient
};
exports.default = allMethods;
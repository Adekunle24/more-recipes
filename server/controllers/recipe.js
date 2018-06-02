
import MiddleWare from '../middleware';
import { UserModel, RecipeModel, MediaModel, SocialValuesModel } from './../models/index';
import Sequelize from '../models';

const middleware = new MiddleWare();

const getTotalRecipes = (req, res) => {
  let orderBy = ['createdAt', 'ASC'];
  const orderOptions = ['asc', 'desc', 'ASC', 'DESC'];
  let objectsLimit = 9;
  if (req.query.sort) {
    const { sort } = req.query;
    switch (sort) {
      case 'upvotes':
        if (req.query.order && orderOptions.includes(req.query.order)) {
          orderBy = [SocialValuesModel, req.query.sort, req.query.order];
        }
        break;
      case 'random':
        orderBy = Sequelize.random();
        break;
      default:
        break;
    }
  }
  if (req.query.limit) {
    objectsLimit = req.query.limit;
  }
  RecipeModel.findAndCountAll({
    include: [{
      model: UserModel,
      attributes: ['username', 'email', 'id'],
      as: 'user',
    },
    {
      model: SocialValuesModel,
      as: 'social_values',
    },
    {
      model: MediaModel,
      as: 'media'
    }
    ],
    limit: objectsLimit,
    offset: req.query.offset,
    order: [
      orderBy,
    ]
  }).then((result) => {
    res.json({ status: 'success', data: result.rows, totalCount: result.count });
  }).catch(error => res.send(error.toString()));
};

const addRecipe = (req, res) => {
  if (req.body.title && req.body.procedures && req.body.ingredients && req.decoded && req.body.poster) {
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
    RecipeModel.create({
      mediaId: req.body.poster,
      title: req.body.title,
      userId: req.decoded.id,
      procedures: req.body.procedures,
      ingredients: req.body.ingredients,

    }).then((result) => {
      SocialValuesModel.create({
        recipeId: result.id,
        upvotes: 0,
        downvotes: 0,
        replies: 0
      }).then((social) => {
        res.json({
          status: 'success',
          data: { recipe: result, socialValues: social },
          message: 'Recipe added successfully'
        });
      }).catch(error => res.send(error.toString()));
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      status: 'fail',
      data: null,
      validations: false,
      message: 'Please provide title, procedures, poster and ingredients'
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
const saveModifiedRecipe = (req, res, data) => {
  if (req.decoded.id === data.userId) {
    data.update({
      title: req.body.title || data.title,
      procedures: req.body.procedures || data.procedures,
      ingredients: req.body.ingredients || data.ingredients
    }).then((output) => {
      if (output[0] === 0) {
        res.json({ status: 'fail', message: 'Specified recipe could not be found' });
      } else {
        res.json({ status: 'success', message: 'Recipe modified successfully', data: output });
      }
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({ status: 'fail', message: 'You do not have the permission to modify this recipe. Contact the owner' });
  }
};

/** Modify a recipe
 * @param  {object} req request object
 * @param  {object} res response object
 * @returns {null} return null
 */
const modifyRecipe = (req, res) => {
  if (req.body.recipeId) {
    if (!middleware.validateStringIsNumber(req.body.recipeId)) {
      res.json({ message: 'Recipe id must be a number', validations: false, status: 'fail' });
      return;
    }
    RecipeModel.findById(req.body.recipeId).then((result) => {
      if (result) {
        // call the method to save new recipe details
        saveModifiedRecipe(req, res, result);
      } else {
        res.json({ status: 'fail', message: 'Specified recipe could not be found' });
      }
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({ status: 'fail', validations: false, message: 'Please provide a Recipe Id' });
  }
};
/**
 * Deletes a recipe from the application
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const deleteRecipe = (req, res) => {
  if (req.body.recipeId) {
    if (!middleware.validateStringIsNumber(req.body.recipeId)) {
      res.json({ message: 'Recipe id must be a number', validations: false, status: 'fail' });
      return;
    }
    RecipeModel.findById(req.body.recipeId).then((recipe) => {
      if (!recipe) {
        res.json({ message: 'Specified recipe could not be found', status: 'fail' });
      } else {
        recipe.destroy()
          .then(output => res.json({ status: 'success', message: 'Recipe deleted successfully' }))
          .catch(error => middleware.parseSequelizeError(res, error));
      }
    }).catch(error => res.send(error));
  } else {
    res.json({ message: 'Please provide a recipe Id', validations: false, status: 'fail' });
  }
};
const getRecipeWithMostUpVotes = (req, res) => {
  res.send('api route to get most upvotes');
};
/**
 * Searches for a recipe using title,ingredients or procedures
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const searchRecipeUsingIngredient = (req, res) => {
  if (req.query.keyword) {
    RecipeModel.findAndCountAll({
      where: {
        $or: [
          {
            title: {
              $iLike: `%${req.query.keyword}%`
            }
          },
          {
            ingredients: {
              $iLike: `%${req.query.keyword}%`
            }
          },
          {
            procedures: {
              $iLike: `%${req.query.keyword}%`
            }
          }
        ]
      },
      include: [{
        model: RecipeModel,
        attributes: ['username', 'email', 'id'],
        as: 'users',
      }, {
        model: SocialValuesModel,
        as: 'socialValues',
      }
      ]
    })
      .then(result => res.json({ status: 'success', searchResults: result.count, data: result.rows }))
      .catch(error => res.send(error.toString()));
  } else {
    res.json({ status: 'fail', message: 'Please specify a keyword', data: null });
  }
};
const allMethods = {
  getTotalRecipes,
  addRecipe,
  modifyRecipe,
  setModifiedRecipe: modifyRecipe,
  deleteRecipe,
  getRecipeWithMostUpVotes,
  searchRecipeUsingIngredient
};
export default allMethods;

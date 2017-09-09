
import allModels from '../models';
import Middleware from '../middleware';

const middleware = new Middleware();

const reviewModel = allModels.reviews;

/**
 * Save Review into database table
 *
 * @param {any} req request object
 * @param {any} res response object
 * @returns {null} returns null
 */
const saveReviewToDb = (req, res) => {
  if (req.params.recipeId && req.body.review) {
    if (!middleware.validateRecipeTitle(req.body.review)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Review content contains disallowed characters'
      });
      return;
    }
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Recipe Id must be a number'
      });
      return;
    }
    reviewModel.create({
      recipeId: req.params.recipeId,
      userId: req.decoded.id,
      review: req.body.review
    }).then(output => res.json({
      status: 'success', message: 'Review posted successfully', success: true, data: output
    })).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      status: 'fail', validations: false, success: false, message: 'Please provide Recipe Id and a review'
    });
  }
};

const getAllReviews = (req, res) => {
  if (req.params.recipeId) {
    reviewModel.findAll({
      where: {
        recipeId: req.params.recipeId
      }
    }).then(result => res.json({ status: 'success', data: result })).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      status: 'fail', validations: false, success: false, message: 'Please provide Recipe Id'
    });
  }
};
const allMethods = { saveReviewToDb, getAllReviews };
export default allMethods;

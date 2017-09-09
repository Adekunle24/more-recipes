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

var reviewModel = _models2.default.reviews;

/**
 * Save Review into database table
 *
 * @param {any} req request object
 * @param {any} res response object
 * @returns {null} returns null
 */
var saveReviewToDb = function saveReviewToDb(req, res) {
  if (req.params.recipeId && req.body.review) {
    if (!middleware.validateRecipeTitle(req.body.review)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Review content contains disallowed characters'
      });
    }
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Recipe Id must be a number'
      });
    }
    reviewModel.create({
      recipeId: req.params.recipeId,
      userId: req.decoded.id,
      review: req.body.review
    }).then(function (output) {
      return res.json({
        status: 'success', message: 'Review posted successfully', success: true, data: output
      });
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({
      status: 'fail', validations: false, success: false, message: 'Please provide Recipe Id and a review'
    });
  }
};

var getAllReviews = function getAllReviews(req, res) {
  if (req.params.recipeId) {
    reviewModel.findAll({
      where: {
        recipeId: req.params.recipeId
      }
    }).then(function (result) {
      return res.json({ status: 'success', data: result });
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({
      status: 'fail', validations: false, success: false, message: 'Please provide Recipe Id'
    });
  }
};
var allMethods = { saveReviewToDb: saveReviewToDb, getAllReviews: getAllReviews };
exports.default = allMethods;
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
/**
 * Retrieves recipes in descending order by votes
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
var getValuesInDesc = function getValuesInDesc(req, res) {
  _models2.default.social_values.findAll({
    order: [['upvotes', 'DESC']],
    include: [{
      model: _models2.default.recipes
    }]
  }).then(function (value) {
    return res.json({ status: 'success', data: value });
  }).catch(function (error) {
    return middleware.parseSequelizeError(res, error);
  });
};
var allMethods = { getValuesInDesc: getValuesInDesc };
exports.default = allMethods;
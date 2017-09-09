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
var usersProfileModel = _models2.default.users_profile;
var getUserProfile = function getUserProfile(req, res) {
  usersProfileModel.findOne({
    where: {
      userId: req.params.userId
    }
  }).then(function (profile) {
    return res.json({ status: 'success', data: profile }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  });
};
exports.default = { getUserProfile: getUserProfile };
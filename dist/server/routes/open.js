'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _express2.default.Router();

routes.get('/api/v1/test', function (req, res) {
  return res.json({ status: 'success', data: 'hello' });
});

routes.post('/api/v1/encrypt', function (req, res) {
  if (req.body.key) {
    var passwordHash = _bcryptNodejs2.default.hashSync(req.body.key);
    res.send(passwordHash);
  } else {
    res.json({ status: 'fail', message: 'please provide key to hash' });
  }
});

// api-users-signup route
routes.post('/api/v1/users/signup', _controllers2.default.usersController.signUp);

// api-users-signin route
routes.post('/api/v1/users/signin', _controllers2.default.usersController.signIn);

// api generates test token
routes.post('/api/v1/token', new _middleware2.default().encrypt);
exports.default = routes;
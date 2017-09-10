'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// assign all models to a constant
var userModel = _models2.default.users;
var reviewModel = _models2.default.reviews;
var votesModel = _models2.default.votes;
var recipeModel = _models2.default.recipes;

var middleware = new _middleware2.default();

var getToken = function getToken(req, res) {
  var token = _jsonwebtoken2.default.sign('', process.env.API_SECRET);
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
};

// this is an api to display all registered users
var getTotalUsers = function getTotalUsers(req, res) {
  return userModel.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    include: [{
      model: recipeModel,
      as: 'recipes',
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }]
  }).then(function (user) {
    res.json({ status: 'success', data: user });
  }).catch(function (error) {
    return middleware.parseSequelizeError(res, error);
  });
};

// this method accepts username, email and password then creates a user account on the database
var signUp = function signUp(req, res) {
  // perform input validations
  if (req.body.username && req.body.email && req.body.password) {
    if (!middleware.validateUsername(req, res)) {
      res.json({ status: 'fail', validations: false, message: 'invalid character(s) in input' });
      return;
    }
    if (!middleware.validatePasswordLength(req)) {
      res.json({ status: 'fail', validations: false, message: 'password must be greater than 5 characters in length' });
      return;
    }
    var usernameInput = req.body.username;
    var emailInput = req.body.email;
    var passwordHash = _bcryptNodejs2.default.hashSync(req.body.password);
    userModel.create({
      email: emailInput,
      username: usernameInput,
      password: passwordHash,
      phoneNumber: ''
    }).then(function (output) {
      output.password = null;
      var newToken = _jsonwebtoken2.default.sign(JSON.stringify(output), process.env.API_SECRET);
      res.json({ status: 'success', data: { token: newToken }, message: 'Your account has been created successfully Username: ' + output.username + ' Email: ' + output.email });
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({
      status: 'fail', data: null, validations: false, message: 'Please provide username,email and password'
    });
  }
};

var removeUser = function removeUser(req, res) {
  if (req.body.username) {
    userModel.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      if (!user) {
        res.json({ success: false, message: 'Specified user could not be found' });
      } else {
        // drop user reviews
        reviewModel.destroy({
          where: {
            userId: user.id
          }
        }).then(function (output) {
          // drop user votes
          votesModel.destroy({
            where: {
              userId: user.id
            }
          }).then(function (output) {
            // drop recipes
            recipeModel.destroy({
              where: {
                userId: user.id
              }
            }).then(function (output) {
              // drop user
              user.destroy().then(function (output) {
                return res.json({ message: 'User deleted successfully', success: true });
              }).catch(function (error) {
                return middleware.parseSequelizeError(res, error);
              });
            }).catch(function (error) {
              return middleware.parseSequelizeError(res, error);
            });
          }).catch(function (error) {
            return middleware.parseSequelizeError(res, error);
          });
        });
      }
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({
      validations: false,
      message: 'please provide username'
    });
  }
};

// this method accepts username and password and then perform authentication
var signIn = function signIn(req, res) {
  if (req.body.username && req.body.password) {
    var passwordInput = req.body.password;
    userModel.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (result) {
      if (!result) {
        res.json({ status: 'fail', data: null, message: 'Incorrect username or password' });
      } else if (result) {
        _bcryptNodejs2.default.compare(passwordInput, result.password, function (err, cryptResponse) {
          if (cryptResponse) {
            result.password = null;
            var newToken = _jsonwebtoken2.default.sign(JSON.stringify(result), process.env.API_SECRET);
            res.json({
              status: 'success', data: result, message: 'Welcome ' + result.username, token: newToken, info: 'add this token to your header with key x-access-token for authentication'
            });
          } else {
            res.json({ status: 'fail', data: null, message: 'Incorrect username or password' });
          }
        });
      }
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({
      status: 'fail', data: null, validations: false, message: 'Provide username and password'
    });
  }
};

var allMethods = {
  getTotalUsers: getTotalUsers,
  removeUser: removeUser,
  signUp: signUp,
  signIn: signIn,
  getToken: getToken
};
exports.default = allMethods;
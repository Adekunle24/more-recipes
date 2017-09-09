'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A middleware class to house all utility functions
 *
 * @class MiddleWares
 */
var MiddleWares = function () {
  function MiddleWares() {
    _classCallCheck(this, MiddleWares);
  }

  _createClass(MiddleWares, [{
    key: 'verifyJsonWebToken',

    /**
     * @param {object} routes the route objects
     * @returns {object} object of this instance
     * @memberof MiddleWares
     */
    value: function verifyJsonWebToken(routes) {
      // validate token below
      routes.use(function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
          // verifies secret and checks exp
          _jsonwebtoken2.default.verify(token, process.env.API_SECRET, function (err, decoded) {
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          });
        } else {
          // if there is no token
          // return an error
          return res.status(403).send({
            status: 'fail',
            tokenVerification: false,
            message: 'Signin on /api/signin to generate token for authentication. Add it to headers e.g x-access-token = token'
          });
        }
      });
      return this;
    }

    /**
     * Method encrypts the input using jsonwebtoken
     * @param {req} req request object
     * @param {res} res seponse object
     * @returns {object} object of this instance
     * @memberof MiddleWares
     */

  }, {
    key: 'encrypt',
    value: function encrypt(req, res) {
      if (req.body.key) {
        var token = _jsonwebtoken2.default.sign(req.body.key, process.env.API_SECRET);
        res.json({ status: 'success', data: { result: token } });
      } else {
        res.json({ status: 'fail', message: 'Please provide a key to encrypt' });
        return this;
      }
    }
    /**
     * Parses SequelizeError object and present readable output
     *
     * @param {res} res response object
     * @param {object} error sequelize error object
     * @returns {object} instance of this object
     * @memberof MiddleWares
     */

  }, {
    key: 'parseSequelizeError',
    value: function parseSequelizeError(res, error) {
      if (error.errors) {
        res.json({ status: 'fail', data: { message: error.errors[0].message, type: error.errors[0].type, field: error.fields } });
      } else if (error.parent) {
        res.json({ status: 'fail', data: { message: error.parent.detail } });
      }
      return this;
    }
    /**
     * Filters the request object for any undesired characters
     *
     * @param {req} req response object
     * @returns {bool} returns true or false
     * @memberof MiddleWares
     */

  }, {
    key: 'validateUsername',
    value: function validateUsername(req) {
      var invalidCharacters = ['!', '`', '@', '\\', '?', '#', '$', '%', '^', '&', '*', ',', '(', ')', '-', '+', '=', '{', '}', '<', '>', '/', 'null'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = invalidCharacters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var char = _step.value;

          if (req.body.username.includes(char)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }
    /**
     * Validates minimum password length of 6 characters
     *
     * @param {any} req
     * @returns {bool} true if password lenght is greater than 6 or false otherwise
     * @memberof MiddleWares
     */

  }, {
    key: 'validatePasswordLength',
    value: function validatePasswordLength(req) {
      if (req.body.password.length < 6) {
        return false;
      }
      return this;
    }
    /**
     * Validates the length of recipe's title and procedures
     *
     * @param {object} req request object
     * @returns {bool} return true or false
     * @memberof MiddleWares
     */

  }, {
    key: 'validateAddRecipePropertiesLength',
    value: function validateAddRecipePropertiesLength(req) {
      if (req.body.title.length < 10 || req.body.ingredients.length < 10 || req.body.procedures.length < 10) {
        return false;
      }
      return this;
    }
    /**
     * Validates recipe title characters
     *
     * @param {req} value response object
     * @returns {bool} returns true or false
     * @memberof MiddleWares
     */

  }, {
    key: 'validateRecipeTitle',
    value: function validateRecipeTitle(value) {
      var invalidCharacters = ['!', '`', '@', '\\', '#', '$', '%', '^', '*', '(', ')', '-', '+', '=', '{', '}', '<', '>', '/', 'null'];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = invalidCharacters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var char = _step2.value;

          if (value.includes(char)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
    /**
     * Check if a string contains only number
     *
     * @param {int} value value to check
     * @returns {bool} returns boolean
     * @memberof MiddleWares
     */

  }, {
    key: 'validateStringIsNumber',
    value: function validateStringIsNumber(value) {
      return (/^\d+$/.test(value)
      );
      return this;
    }
  }]);

  return MiddleWares;
}();

exports.default = MiddleWares;
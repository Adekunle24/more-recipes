import jwt from 'jsonwebtoken';
import config from '../config/config';
/**
 * A middleware class to house all utility functions
 *
 * @class MiddleWares
 */
class MiddleWares {
  /**
   * @param {object} routes the route objects
   * @returns {object} object of this instance
   * @memberof MiddleWares
   */
  verifyJsonWebToken(routes) {
    // validate token below
    routes.use((req, res, next) => {
      // check header or url parameters or post parameters for token
      const token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Failed to authenticate token.'
            });
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
          extra: JSON.stringify(req),
          message: 'Signin on /api/signin to generate token for authentication. Add it to headers e.g x-access-token = token',
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
  encrypt(req, res) {
    if (req.body.key) {
      const token = jwt.sign(req.body.key, process.env.API_SECRET);
      res.json({
        status: 'success',
        data: {
          result: token
        }
      });
    } else {
      res.json({
        status: 'fail',
        message: 'Please provide a key to encrypt'
      });
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
  parseSequelizeError(res, error) {
    if (error.errors) {
      res.json({
        status: 'fail@sequelizeError0',
        data: {
          message: error.errors[0].message,
          type: error.errors[0].type,
          field: error.fields
        }
      });
    } else if (error.parent) {
      res.json({
        status: 'fail@sequelizeError2',
        data: {
          message: JSON.stringify(error),
          error: error.name
        }
      });
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
  validateUsername(req) {
    const invalidCharacters = ['!', '`', '@', '\\', '?', '#', '$', '%', '^', '&', '*',
      ',', '(', ')', '-', '+', '=', '{', '}', '<', '>', '/', 'null'
    ];
    for (const char of invalidCharacters) {
      if (req.body.username.includes(char)) {
        return false;
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
  validatePasswordLength(req) {
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
  validateAddRecipePropertiesLength(req) {
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
  validateRecipeTitle(value) {
    const invalidCharacters = ['!', '`', '@', '\\', '#', '$', '%', '^', '*', '(', ')', '-', '+', '=', '{', '}', '<', '>', '/', 'null'];
    for (const char of invalidCharacters) {
      if (value.includes(char)) {
        return false;
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
  validateStringIsNumber(value) {
    return /^\d+$/.test(value);
    return this;
  }
}
export default MiddleWares;

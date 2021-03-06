import crypto from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import MiddleWare from '../middleware';
import { UserModel, RecipeModel } from './../models/index';

env.config();


const middleware = new MiddleWare();

const getToken = (req, res) => {
  const token = jwt.sign('', process.env.API_SECRET);
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token
  });
};


/**
 * Retrieves total users in the application
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const getTotalUsers = (req, res) => {
  UserModel.findAll({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    },
    include: [{
      model: RecipeModel,
      as: 'recipes',
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    }]
  }).then((user) => {
    res.json({
      status: 'success',
      data: user
    });
  }).catch(error => middleware.parseSequelizeError(res, error));
};

/**
 * Creates a user account in the application
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const signUp = (req, res) => {
  // perform input validations
  if (req.body.username && req.body.email && req.body.password) {
    if (!middleware.validateUsername(req, res)) {
      res.json({
        status: 'fail',
        validations: false,
        message: 'invalid character(s) in input'
      });
      return;
    }
    if (!middleware.validatePasswordLength(req)) {
      res.json({
        status: 'fail',
        validations: false,
        message: 'password must be greater than 5 characters in length'
      });
      return;
    }
    const usernameInput = req.body.username;
    const emailInput = req.body.email;
    const passwordHash = crypto.hashSync(req.body.password);
    userModel.create({
      email: emailInput,
      username: usernameInput,
      password: passwordHash,
      phoneNumber: ''
    }).then((output) => {
      userProfile.create({
        userId: output.id,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        birthDay: req.body.birthday,
        gender: req.body.gender
      }).then((profile) => {
        output.password = null;
        const newToken = jwt.sign(JSON.stringify(output), process.env.API_SECRET);
        res.json({
          status: 'success',
          data: {
            token: newToken,
            user: output,
          },
          message: `Your account has been created successfully Username: ${output.username} Email: ${output.email}`
        });
      }).catch(error => middleware.parseSequelizeError(res, error));
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      status: 'fail',
      data: null,
      validations: false,
      message: 'Please provide username,email and password'
    });
  }
};
/**
 * deletes a user from the application
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const removeUser = (req, res) => {
  if (req.body.username) {
    UserModel.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      if (!user) {
        res.json({
          success: false,
          message: 'Specified user could not be found'
        });
      } else {
        // drop user reviews
        reviewModel.destroy({
          where: {
            userId: user.id
          }
        }).then((output) => {
          // drop user votes
          votesModel.destroy({
            where: {
              userId: user.id
            }
          }).then((output) => {
            // drop recipes
            recipeModel.destroy({
              where: {
                userId: user.id
              }
            }).then((output) => {
              // drop user
              user.destroy()
                .then(output => res.json({
                  message: 'User deleted successfully',
                  success: true
                })).catch(error => middleware.parseSequelizeError(res, error));
            }).catch(error => middleware.parseSequelizeError(res, error));
          }).catch(error => middleware.parseSequelizeError(res, error));
        });
      }
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      validations: false,
      message: 'please provide username'
    });
  }
};

/**
 * authenticates and signin a registered user in the application
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const signIn = (req, res) => {
  if (req.body.username && req.body.password) {
    const passwordInput = req.body.password;
    UserModel.findOne({
      where: {
        username: req.body.username
      }
    }).then((result) => {
      if (!result) {
        res.json({
          status: 'fail',
          data: null,
          message: 'Incorrect username or password'
        });
      } else if (result) {
        crypto.compare(passwordInput, result.password, (err, cryptResponse) => {
          if (cryptResponse) {
            result.password = null;
            const newToken = jwt.sign(JSON.stringify(result), process.env.API_SECRET);
            res.json({
              status: 'success',
              data: result,
              message: `Welcome ${result.username}`,
              token: newToken,
              info: 'add this token to your header with key x-access-token for authentication'
            });
          } else {
            res.json({
              status: 'fail',
              data: null,
              message: 'Incorrect username or password'
            });
          }
        });
      }
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      status: 'fail',
      data: null,
      validations: false,
      message: 'Provide username and password'
    });
  }
};


const allMethods = {
  getTotalUsers,
  removeUser,
  signUp,
  signIn,
  getToken
};
export default allMethods;

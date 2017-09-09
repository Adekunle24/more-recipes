
import crypto from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import allModels from '../models';
import MiddleWare from '../middleware';

env.config();
// assign all models to a constant
const userModel = allModels.users;
const reviewModel = allModels.reviews;
const votesModel = allModels.votes;
const recipeModel = allModels.recipes;

const middleware = new MiddleWare();

const getToken = (req, res) => {
  const token = jwt.sign('', process.env.API_SECRET);
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token
  });
};

// this is an api to display all registered users
const getTotalUsers = (req, res) => {
  userModel.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    include: [{
      model: recipeModel,
      as: 'recipes',
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    }]
  }).then((user) => {
    res.json({ status: 'success', data: user });
  }).catch(error => middleware.parseSequelizeError(res, error));
};

// this method accepts username, email and password then creates a user account on the database
const signUp = (req, res) => {
  // perform input validations
  if (req.body.username && req.body.email && req.body.password) {
    if (!middleware.validateUsername(req, res)) {
      res.json({ status: 'fail', validations: false, message: 'invalid character(s) in input' });
    }
    if (!middleware.validatePasswordLength(req)) {
      res.json({ status: 'fail', validations: false, message: 'password must be greater than 5 characters in length' });
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
      output.password = null;
      const newToken = jwt.sign(JSON.stringify(output), process.env.API_SECRET);
      res.json({ status: 'success', data: { token: newToken }, message: `Your account has been created successfully Username: ${output.username} Email: ${output.email}` });
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      status: 'fail', data: null, validations: false, message: 'Please provide username,email and password'
    });
  }
};

const removeUser = (req, res) => {
  if (req.body.username) {
    userModel.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      if (!user) {
        res.json({ success: false, message: 'Specified user could not be found' });
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
                .then(output => res.json({ message: 'User deleted successfully', success: true })).catch(error => middleware.parseSequelizeError(res, error));
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

// this method accepts username and password and then perform authentication
const signIn = (req, res) => {
  if (req.body.username && req.body.password) {
    const passwordInput = req.body.password;
    userModel.findOne({
      where: {
        username: req.body.username
      }
    }).then((result) => {
      if (!result) {
        res.json({ status: 'fail', data: null, message: 'Incorrect username or password' });
      } else if (result) {
        crypto.compare(passwordInput, result.password, (err, cryptResponse) => {
          if (cryptResponse) {
            result.password = null;
            const newToken = jwt.sign(JSON.stringify(result), process.env.API_SECRET);
            res.json({
              status: 'success', data: result, message: `Welcome ${result.username}`, token: newToken, info: 'add this token to your header with key x-access-token for authentication'
            });
          } else {
            res.json({ status: 'fail', data: null, message: 'Incorrect username or password' });
          }
        });
      }
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({
      status: 'fail', data: null, validations: false, message: 'Provide username and password'
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

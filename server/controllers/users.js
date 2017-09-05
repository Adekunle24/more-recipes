
import crypto from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import allModels from '../models';

env.config();
// assign userModel to model user
const userModel = allModels.users;
const reviewModel = allModels.reviews;
const votesModel = allModels.votes;
const recipeModel = allModels.recipes;

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
  userModel.findAll().then((user) => {
    res.send(user);
  }).catch(error => res.send(error));
};

// this method accepts username, email and password then creates a user account on the database
const signUp = (req, res) => {
  // perform input validations
  if (req.body.username && req.body.email && req.body.password) {
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
      res.json({ success: true, data: output, message: `Your account has been created successfully Username: ${output.username} Email: ${output.email}` });
    }).catch(error => res.send(error));
  } else {
    res.json({
      success: false, data: null, validations: false, message: 'Please provide username,email and password'
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
                .then(output => res.json({ message: 'User deleted successfully', success: true })).catch(error => res.send(error));
            }).catch(error => res.send(error));
          }).catch(error => res.send(error));
        });
      }
    }).catch(error => res.send(error));
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
        res.json({ success: false, data: null, message: 'Incorrect username or password' });
      } else if (result) {
        crypto.compare(passwordInput, result.password, (err, cryptResponse) => {
          if (cryptResponse) {
            result.password = null;
            let newToken;
            if (process.env.NODE_ENV != 'test') {
              newToken = jwt.sign(JSON.stringify(result), process.env.API_SECRET);
            } else {
              newToken = null;
            }
            res.json({
 success: true, data: result, message: `Welcome ${result.username}`, token: newToken, info: 'add this token to your header with key x-access-token for authentication' 
});
          } else {
            res.json({ success: false, data: null, message: 'Incorrect username or password' });
          }
        });
      }
    }).catch(error => res.send(error));
  } else {
    res.json({
      success: false, data: null, validations: false, message: 'Provide username and password'
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

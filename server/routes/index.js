
// contains all routes for the application
import express from 'express';
import Sequelize from 'sequelize';
import Config from '../config/config.json';
import controllers from '../controllers';
const config = Config['development'];
const routes = express.Router();
new Sequelize(config.database,config.username, config.password,config.options);
const usersController = controllers.usersController;

// api routes messages
const signUpMessage = 'Please provide username, email and password seperated by a forward slash e.g ..signup/andela/andela@yahoo.com/andelapassword to register';
const signInMessage = 'use ..signin/your_username/your_password';

// test api
routes.get('/api/totalUsers', usersController.getTotalUsers);

// api-users-signup route
routes.post('/api/users/signup/:username/:email/:password', usersController.signUp);
routes.post('/api/users/signup', (req,res) => res.send(`This is the user-signup route.. ${signUpMessage}`));

// api-users-signin route
routes.post('/api/users/signin/:username/:password', usersController.signIn);
routes.post('/api/users/signin', (req,res) => res.send(`This is the user-signin route.. ${signInMessage}`) );

export default routes;
import express from 'express';
import crypto from 'bcrypt-nodejs';
import controllers from '../controllers';
import Middleware from '../middleware';
import { userProfile } from '../models';

const routes = express.Router();

const middleware = new Middleware();
routes.post('/api/v1/test', (req, res) => {
  userProfile.create({
    userId: 1,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
  }).then((profile) => {
    res.json({
      status: 'success',
      data: profile
    });
  }).catch((error) => {
    middleware.parseSequelizeError(res, error);
  });
});

routes.post('/api/v1/encrypt', (req, res) => {
  if (req.body.key) {
    const passwordHash = crypto.hashSync(req.body.key);
    res.send(passwordHash);
  } else {
    res.json({
      status: 'fail',
      message: 'please provide key to hash'
    });
  }
});

// api-users-signup route
routes.post('/api/v1/users/signup', controllers.usersController.signUp);

// api-users-signin route
routes.post('/api/v1/users/signin', controllers.usersController.signIn);

// api generates test token
routes.post('/api/v1/token', new Middleware().encrypt);
export default routes;

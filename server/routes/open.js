import express from 'express';
import crypto from 'bcrypt-nodejs';
import controllers from '../controllers';
import Middleware from '../middleware';
import { userProfile } from '../models';
import uuidv1 from 'uuid/v1';

const routes = express.Router();

const middleware = new Middleware();
routes.get('/test', (req, res) => {
  res.json({
    message: 'hello',
    status: 'success',
    uuid: uuidv1()
  });
});

routes.post('/encrypt', (req, res) => {
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
routes.post('/users/signup', controllers.usersController.signUp);

// api-users-signin route
routes.post('/users/signin', controllers.usersController.signIn);

// api generates test token
routes.post('/token', new Middleware().encrypt);
export default routes;

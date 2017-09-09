import express from 'express';
import crypto from 'bcrypt-nodejs';
import controllers from '../controllers';
import Middleware from '../middleware';

const routes = express.Router();

routes.get('/api/v1/test', (req, res) => res.json({ status: 'success', data: 'hello' }));

routes.post('/api/v1/encrypt', (req, res) => {
  if (req.body.key) {
    const passwordHash = crypto.hashSync(req.body.key);
    res.send(passwordHash);
  } else {
    res.json({ status: 'fail', message: 'please provide key to hash' });
  }
});

// api-users-signup route
routes.post('/api/v1/users/signup', controllers.usersController.signUp);

// api-users-signin route
routes.post('/api/v1/users/signin', controllers.usersController.signIn);

// api generates test token
routes.post('/api/v1/token', new Middleware().encrypt);
export default routes;


// contains all routes for the application
import express from 'express';
import Sequelize from 'sequelize';
import crypto from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import controllers from '../controllers';
env.config();

const routes = express.Router();

const usersController = controllers.usersController;
const recipesController = controllers.recipesController;
const reviewsController = controllers.reviewsController;
const favouriteRecipesController = controllers.favouriteRecipeController;
routes.get('/api/test', (req, res) => res.json({ success: true, data: 'hello' }));

// api generates test token
routes.get('/api/token', (req, res) => {
  const token = jwt.sign('a', process.env.API_SECRET);
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token
  });
});

// api-users-signup route
routes.post('/api/users/signup', usersController.signUp);

// api-users-signin route
routes.post('/api/users/signin', usersController.signIn);

// validate token below
if (process.env.NODE_ENV != 'test') {
  routes.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

    // verifies secret and checks exp
      jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
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
        success: false,
        tokenVerification: false,
        message: 'Signin on /api/signin to generate token for authentication. Add it to headers e.g x-access-token = token',
      });

    }
  });
}
// api get all users
routes.get('/api/users', usersController.getTotalUsers);
routes.delete('/api/users', usersController.removeUser);

routes.get('/api/displaytoken', (req, res) => {
  res.send(req.decoded);
});


// api-recipes-add route
routes.post('/api/recipes', recipesController.addRecipe);

// api-recipes-totalrecipes route
routes.get('/api/recipes', recipesController.getTotalRecipes);

// api-edit-recipe route
routes.put('/api/recipes', recipesController.modifyRecipe);

// api-delete-recipe route
routes.delete('/api/recipes', recipesController.deleteRecipe);

// route that allows a logged in user to post a review for a recipe
routes.post('/api/recipes/:recipeId/reviews', reviewsController.saveReviewToDb);


// route show all reviews for a recipe
routes.get('/api/recipes/:recipeId/reviews', reviewsController.getAllReviews);

// route to get all favourite recipes for a user
routes.get('/api/users/:userId/recipes', favouriteRecipesController.getFavouriteRecipes);

// route for a user to add recipe to favourites list
routes.post('/api/recipes/:recipeId/favourites', favouriteRecipesController.addFavourite);
routes.delete('/api/recipes/:recipeId/favourites', favouriteRecipesController.removeFavourite);

routes.get('/api/recipes?sort=upvotes&order=ascending', recipesController.getRecipeWithMostUpVotes);

export default routes;

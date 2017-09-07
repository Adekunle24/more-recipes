
// contains all routes for the application
import express from 'express';
import Sequelize from 'sequelize';
import crypto from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import controllers from '../controllers';
import middlewares from '../middleware';
env.config();

const routes = express.Router();
routes.get('/api/test', (req, res) => res.json({ status: 'success', data: 'hello' }));

// api generates test token
routes.post('/api/token', new middlewares().encrypt);

// api-users-signup route
routes.post('/api/users/signup', controllers.usersController.signUp);

// api-users-signin route
routes.post('/api/users/signin', controllers.usersController.signIn);

const MiddleWares = new middlewares();
MiddleWares.verifyJsonWebToken(routes);

// api get all users
routes.get('/api/users', controllers.usersController.getTotalUsers);
routes.delete('/api/users', controllers.usersController.removeUser);

routes.get('/api/displaytoken', (req, res) => {
  res.send(req.decoded);
});


// api-recipes-add route
routes.post('/api/recipes', controllers.recipesController.addRecipe);

// api-recipes-totalrecipes route
routes.get('/api/recipes', controllers.recipesController.getTotalRecipes);

// api-edit-recipe route
routes.put('/api/recipes', controllers.recipesController.modifyRecipe);

// api-delete-recipe route
routes.delete('/api/recipes', controllers.recipesController.deleteRecipe);

// route that allows a logged in user to post a review for a recipe
routes.post('/api/recipes/:recipeId/reviews', controllers.reviewsController.saveReviewToDb);


// route show all reviews for a recipe
routes.get('/api/recipes/:recipeId/reviews', controllers.reviewsController.getAllReviews);

// route to get all favourite recipes for a user
routes.get('/api/users/:userId/recipes', controllers.favouriteRecipeController.getFavouriteRecipes);

// route for a user to add recipe to favourites list
routes.post('/api/recipes/:recipeId/favourites', controllers.favouriteRecipeController.addFavourite);
routes.delete('/api/recipes/:recipeId/favourites', controllers.favouriteRecipeController.removeFavourite);
routes.get('/api/recipes?sort=upvotes&order=ascending', controllers.recipesController.getRecipeWithMostUpVotes);

// routes that handles voting: upvote and downvote action
// this api handles upvoting
routes.post('/api/vote/:recipeId/up', controllers.votesController.upVote);
// this api handles downvoting
routes.post('/api/vote/:recipeId/down', controllers.votesController.downVote);

export default routes;

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
routes.get('/api/v1/test', (req, res) => res.json({ status: 'success', data: 'hello' }));

routes.post('/api/v1/encrypt',(req,res)=>{
  if(req.body.key)
  {
    const passwordHash = crypto.hashSync(req.body.key);
    res.send(passwordHash);
  }
  else{
    res.json({'status':'fail',message:'please provide key to hash'})
  }
});

// api-users-signup route
routes.post('/api/v1/users/signup', controllers.usersController.signUp);

// api-users-signin route
routes.post('/api/v1/users/signin', controllers.usersController.signIn);

// api generates test token
routes.post('/api/v1/token', new middlewares().encrypt);

const MiddleWares = new middlewares();
MiddleWares.verifyJsonWebToken(routes);

// api get all users
routes.route('/api/v1/users').get( controllers.usersController.getTotalUsers)
.delete(controllers.usersController.removeUser);


/**
 * This api decodes the token passed via the header and display it
 * @param  {} '/api/v1/displaytoken'
 * @param  {} (req request object from the api
 * @param  {} res response object to send
 */
routes.get('/api/v1/displaytoken', (req, res) => {
  res.send(req.decoded);
});

routes.post('/api/v1/recipes', controllers.recipesController.addRecipe);

// api-recipes-totalrecipes route
routes.get('/api/v1/recipes', controllers.recipesController.getTotalRecipes);

// api-edit-recipe route
routes.put('/api/v1/recipes', controllers.recipesController.modifyRecipe);

// api-delete-recipe route
routes.delete('/api/v1/recipes', controllers.recipesController.deleteRecipe);

// api to search for recipes based on ingredient
routes.get('/api/v1/recipes/search',controllers.recipesController.searchRecipeUsingIngredient);

// route that allows a logged in user to post a review for a recipe
routes.post('/api/v1/recipes/:recipeId/reviews', controllers.reviewsController.saveReviewToDb);

routes.put('/api/v1/recipes/:recipeId/reviews', controllers.reviewsController.saveReviewToDb);


// route show all reviews for a recipe
routes.get('/api/v1/recipes/:recipeId/reviews', controllers.reviewsController.getAllReviews);

// route to get all favourite recipes for a user
routes.get('/api/v1/users/:userId/recipes', controllers.favouriteRecipeController.getFavouriteRecipes);

// route for a user to add recipe to favourites list
routes.post('/api/v1/recipes/:recipeId/favourites', controllers.favouriteRecipeController.addFavourite);
routes.put('/api/v1/recipes/:recipeId/favourites', controllers.favouriteRecipeController.addFavourite);
routes.delete('/api/v1/recipes/:recipeId/favourites', controllers.favouriteRecipeController.removeFavourite);
routes.get('/api/v1/recipes?sort=upvotes&order=ascending', controllers.recipesController.getRecipeWithMostUpVotes);

// routes that handles voting: upvote and downvote action
// this api handles upvoting
routes.post('/api/v1/vote/:recipeId/up', controllers.votesController.upVote);
// this api handles downvoting
routes.post('/api/v1/vote/:recipeId/down', controllers.votesController.downVote);

export default routes;
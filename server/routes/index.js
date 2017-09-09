
// contains all routes for the application
import express from 'express';
import env from 'dotenv';
import controllers from '../controllers';
import middlewares from '../middleware';

env.config();

const routes = express.Router();


const MiddleWares = new middlewares();
MiddleWares.verifyJsonWebToken(routes);

// api get all users
routes.route('/api/v1/users').get(controllers.usersController.getTotalUsers)
  .delete(controllers.usersController.removeUser);

routes.post('/api/v1/displaytoken', (req, res) => {
  res.send(req.decoded);
});


routes.get('/api/v1/recipes', controllers.recipesController.getTotalRecipes);
routes.post('/api/v1/recipes', controllers.recipesController.addRecipe);

// api-edit-recipe route
routes.put('/api/v1/recipes', controllers.recipesController.modifyRecipe);

// api-delete-recipe route
routes.delete('/api/v1/recipes', controllers.recipesController.deleteRecipe);

// api to search for recipes based on ingredient
routes.get('/api/v1/recipes/search', controllers.recipesController.searchRecipeUsingIngredient);

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

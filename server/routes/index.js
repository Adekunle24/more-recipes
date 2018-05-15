
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
routes.route('/users').get(controllers.usersController.getTotalUsers)
  .delete(controllers.usersController.removeUser);

routes.post('/displaytoken', (req, res) => {
  res.send(req.decoded);
});

routes.get('/recipes', controllers.recipesController.getTotalRecipes);
routes.post('/recipes', controllers.recipesController.addRecipe);

// api-edit-recipe route
routes.put('/recipes', controllers.recipesController.modifyRecipe);

// api-delete-recipe route`
routes.delete('/recipes', controllers.recipesController.deleteRecipe);

// api to search for recipes based on ingredient
routes.get('/recipes/search', controllers.recipesController.searchRecipeUsingIngredient);

// route that allows a logged in user to post a review for a recipe
routes.post('/recipes/:recipeId/reviews', controllers.reviewsController.saveReviewToDb);

routes.put('/recipes/:recipeId/reviews', controllers.reviewsController.saveReviewToDb);

// route show all reviews for a recipe
routes.get('/recipes/:recipeId/reviews', controllers.reviewsController.getAllReviews);

// route to get all favourite recipes for a user
routes.get('/users/:userId/recipes', controllers.favouriteRecipeController.getFavouriteRecipes);

// route for a user to add recipe to favourites list
routes.post('/recipes/:recipeId/favourites', controllers.favouriteRecipeController.addFavourite);
routes.put('/recipes/:recipeId/favourites', controllers.favouriteRecipeController.addFavourite);
routes.delete('/recipes/:recipeId/favourites', controllers.favouriteRecipeController.removeFavourite);
routes.get('/recipes?sort=upvotes&order=ascending', controllers.recipesController.getRecipeWithMostUpVotes);

// routes that handles voting: upvote and downvote action
// this api handles upvoting
routes.post('/vote/:recipeId/up', controllers.votesController.upVote);
// this api handles downvoting
routes.post('/vote/:recipeId/down', controllers.votesController.downVote);

// manage media uploads
routes.post('/upload/recipe-photo', controllers.uploadController.uploadPoster);
routes.get('/upload/posters', controllers.uploadController.getAllMedia);
export default routes;

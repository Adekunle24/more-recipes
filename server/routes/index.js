
// contains all routes for the application
import express from 'express';
import Sequelize from 'sequelize';
// import configuration file 
import Config from '../config/config.json';
// import all controllers
import controllers from '../controllers';

// assign variable config to development configuration
const config = Config['development'];
const routes = express.Router();
new Sequelize(config.database,config.username, config.password,config.options);
const usersController = controllers.usersController;
const recipesController = controllers.recipesController;
const commentController = controllers.commentsController;

// api routes messages
const signUpMessage = 'Please provide username, email and password seperated by a forward slash e.g ..signup/andela/andela@yahoo.com/andelapassword to register';
const signInMessage = 'use ..signin/your_username/your_password';
const addRecipesMessage = 'use ..api/recipes/:userid/:title/:ingredients/:procedures';

// test api
routes.get('/api/totalUsers', usersController.getTotalUsers);

// api-users-signup route
routes.post('/api/users/signup/:username/:email/:password', usersController.signUp);
routes.post('/api/users/signup', (req,res) => res.send(`This is the user-signup route.. ${signUpMessage}`));

// api-users-signin route
routes.post('/api/users/signin/:username/:password', usersController.signIn);
routes.post('/api/users/signin', (req,res) => res.send(`This is the user-signin route.. ${signInMessage}`));

// api-recipes-add route
routes.post('/api/recipes',(req,res) => res.send(`This is the add-recipe route ${addRecipesMessage}`));
// api to simulate recipes adding
routes.post('/api/recipes/:userId/:title/:ingredients/:procedures', recipesController.addRecipe);

// api-recipes-totalrecipes route
routes.get('/api/recipes',recipesController.getTotalRecipes);

// api-edit-recipe route
routes.put('/api/recipes/:recipeId', recipesController.modifyRecipe);

// api-edit-recipe route that takes modified recipe
routes.put('/api/recipes/:recipeId/:modifiedRecipe',recipesController.setModifiedRecipe);

// api-delete-recipe route
routes.delete('/api/recipes/:recipeId',recipesController.deleteRecipe);

// route that allows a logged in user to post a review for a recipe
routes.post('/api/recipes/:recipeId/reviews', commentController.postReview);

// route that saves review into db
routes.post('/api/reviews/add/:recipeId/:userId/:reviewMessage',commentController.saveReviewToDb);

// route show all reviews for a recipe
routes.get('/api/recipes/:recipeId/reviews',commentController.getAllReviews);

routes.get('/api/users/:userId/recipes',usersController.getAllFavoriteRecipe);

routes.get('/api/recipes?sort=upvotes&order=ascending',recipesController.getRecipeWithMostUpVotes);

export default routes;

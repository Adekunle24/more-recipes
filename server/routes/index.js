
// contains all routes for the application
import express from 'express';
import Sequelize from 'sequelize';
// import configuration file 
import Config from '../config/config.json';
// import all controllers
import controllers from '../controllers';
import crypto from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const routes = express.Router();

const usersController = controllers.usersController;
const recipesController = controllers.recipesController;
const reviewsController = controllers.reviewsController;
const favouriteRecipesController = controllers.favouriteRecipeController;



// validate token below
if(process.env.NODE_ENV != 'test')
{
  routes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

    // verifies secret and checks exp
      jwt.verify(token,process.env.API_SECRET, (err, decoded) => {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
        // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {

    // if there is no token
    // return an error
      const newToken = jwt.sign('more-recipes',process.env.API_SECRET);
      return res.status(403).send({ 
        
        success: false, 
        message: 'use the token below for authentication. Add it to headers e.g x-access-token/token',
        token : newToken
      });

    }
  });
}

// generate token for authentication
routes.get('/api/token',usersController.getToken);

routes.get('/api/test',(req,res)=> res.json({success:true,data: 'hello'}));
// new Sequelize(config.database,config.username, config.password,config.options);
// 

// // test api
routes.get('/api/users', usersController.getTotalUsers);

// api-users-signup route
routes.post('/api/users/signup', usersController.signUp);

// api-users-signin route
routes.post('/api/users/signin', usersController.signIn);

// api-recipes-add route
routes.post('/api/recipes', recipesController.addRecipe);

// api-recipes-totalrecipes route
routes.get('/api/recipes',recipesController.getTotalRecipes);

// api-edit-recipe route
routes.put('/api/recipes', recipesController.modifyRecipe);

// api-delete-recipe route
routes.delete('/api/recipes',recipesController.deleteRecipe);

// route that allows a logged in user to post a review for a recipe
routes.post('/api/recipes/:recipeId/reviews', reviewsController.saveReviewToDb);


// route show all reviews for a recipe
routes.get('/api/recipes/:recipeId/reviews',reviewsController.getAllReviews);

routes.get('/api/users/:userId/recipes',favouriteRecipesController.getAllFavouriteRecipes);

routes.get('/api/recipes?sort=upvotes&order=ascending',recipesController.getRecipeWithMostUpVotes);

export default routes;

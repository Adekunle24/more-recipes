import usersController from './users';
import recipesController from './recipe';
import reviewController from './review';
import favouriteRecipeController from './favouriteRecipe';
const controllers = { 'usersController' : usersController, 'recipesController' : recipesController, 'reviewsController' : reviewController,
  'favouriteRecipeController' : favouriteRecipeController
};
export default controllers;

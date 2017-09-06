
import usersController from './users';
import recipesController from './recipe';
import reviewController from './review';
import favouriteRecipeController from './favouriteRecipe';
import votesController from './votes';
import socialValueController from './socialValues';

const controllers = {
  usersController,
  recipesController,
  reviewsController: reviewController,
  favouriteRecipeController,
  votesController,
  socialValueController
};
export default controllers;

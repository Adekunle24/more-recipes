import chai from 'chai';
import mock from 'node-mocks-http';
import should from 'should';
import controllers from '../server/controllers';
import events from 'events';

const buildResponse = () => mock.createResponse({ eventEmitter: events.EventEmitter });
const assert = chai.assert;
describe('Tests for all controllers', () => {
  describe('All controllers must be defined', () => {
    it('UsersController should be defined', () => {
      assert.isDefined(controllers.usersController);
    });
    it('RecipesController must be defined', () => {
      assert.isDefined(controllers.recipesController);
    });
    it('ReviewsController must be defined', () => {
      assert.isDefined(controllers.reviewsController);
    });
    it('FavouriteRecipesController must be defined', () => {
      assert.isDefined(controllers.favouriteRecipeController);
    });
    it('SocialValuesController must be defined', () => {
      assert.isDefined(controllers.socialValueController);
    });
    it('VotesController must be defined', () => {
      assert.isDefined(controllers.votesController);
    });
    it('UsersProfileController must be defined', () => {
      assert.isDefined(controllers.usersProfileController);
    });
  });
  describe('All UsersController method must be defined', () => {
    it('GetTotalUsers method must be defined', () => {
      assert.isDefined(controllers.usersController.getTotalUsers);
    });
    it('GetToken method must be defined', () => {
      assert.isDefined(controllers.usersController.getToken);
    });
    it('RemoveUser method must be defined', () => {
      assert.isDefined(controllers.usersController.removeUser);
    });
    it('SignIn method must be defined', () => {
      assert.isDefined(controllers.usersController.signIn);
    });
    it('SignIn method must be defined', () => {
      assert.isDefined(controllers.usersController.signUp);
    });
  });
  describe('All RecipesController method must be defined', () => {
    it('AddRecipe method must be defined', () => {
      assert.isDefined(controllers.recipesController.addRecipe);
    });
    it('DeleteRecipe method must be defined', () => {
      assert.isDefined(controllers.recipesController.deleteRecipe);
    });
    it('GetRecipeWithMostUpVotes method must be defined', () => {
      assert.isDefined(controllers.recipesController.getRecipeWithMostUpVotes);
    });
    it('GetTotalRecipes method must be defined', () => {
      assert.isDefined(controllers.recipesController.getTotalRecipes);
    });
    it('ModifyRecipe method must be defined', () => {
      assert.isDefined(controllers.recipesController.modifyRecipe);
    });
  });
  describe('All FavouriteRecipeController method must be defined', () => {
    it('AddFavourite method must be defined', () => {
      assert.isDefined(controllers.favouriteRecipeController.addFavourite);
    });
    it('GetFavouriteRecipes method must be defined', () => {
      assert.isDefined(controllers.favouriteRecipeController.getFavouriteRecipes);
    });
    it('RemoveFavourite method must be defined', () => {
      assert.isDefined(controllers.favouriteRecipeController.removeFavourite);
    });
  });
  describe('All ReviewsController method must be defined', () => {
    it('GetAllReviews method must be defined', () => {
      assert.isDefined(controllers.reviewsController.getAllReviews);
    });
    it('SaveReviewToDb method must be defined', () => {
      assert.isDefined(controllers.reviewsController.saveReviewToDb);
    });
  });
  describe('All GetUserProfile method must be defined', () => {
    it('GetUserProfile method must be defined', () => {
      assert.isDefined(controllers.usersProfileController.getUserProfile);
    });
  });
  describe('All SocialValueController method must be defined', () => {
    it('GetValuesInDesc method must be defined', () => {
      assert.isDefined(controllers.socialValueController.getValuesInDesc);
    });
  });
  describe('All VotesController method must be defined', () => {
    it('DownVote method must be defined', () => {
      assert.isDefined(controllers.votesController.downVote);
    });
    it('UpVote method must be defined', () => {
      assert.isDefined(controllers.votesController.upVote);
    });
  });
});

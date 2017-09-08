import models from '../server/models';
import chai from 'chai';
const assert  = chai.assert;
describe('Tests for all Models',() =>{
    describe('All models must be defined',()=>{
    it('UsersModel should be present',()=>{
        assert.isDefined(models.users);
    });
     it('RecipesModel must be defined',()=>{
        assert.isDefined(models.recipes);
    });
     it('ReviewsModel must be defined',()=>{
        assert.isDefined(models.reviews);
    });
     it('FavouriteRecipesModel must be defined',()=>{
        assert.isDefined(models.favourite_recipes);
    });
         it('SocialValuesModel must be defined',()=>{
        assert.isDefined(models.social_values);
    });
         it('VotesModel must be defined',()=>{
        assert.isDefined(models.votes);
    });
      it('UsersProfileModel must be defined',()=>{
        assert.isDefined(models.users_profile);
    });
    });
   
});
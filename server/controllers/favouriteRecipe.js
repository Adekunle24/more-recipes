import allModels from '../models';
const favouriteRecipeModel = allModels.favouriteRecipe;

const getAllFavoriteRecipes = (req,res) =>{
  favouriteRecipeModel.findAll(
    {
      where : {
        userId : req.params.userId
      }
    }
  ).then(output => res.send(output)).catch(error => res.send(error));
};
const allMethods = { 'getAllFavouriteRecipes' : getAllFavoriteRecipes };
export default allMethods;

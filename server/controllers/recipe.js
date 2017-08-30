// import all the models
import allModels from '../models';

// assign recipeModel to model recipe
const recipeModel = allModels.recipe;

// this is a test api to display all registered users
const getTotalRecipes = (req,res) => {
  recipeModel.findAll().then(value => 
    res.send(value)
  );
};

// this api adds a new recipe to the database
const addRecipe = (req,res) => {
  recipeModel.create({
    title : req.params.title,
    userId : req.params.userId,
    procedures : req.params.procedures,
    ingredients : req.params.ingredients
  }).then(result => res.send('Recipe added successfully')).catch(error => res.send(error));
};

// this api enables users to modify recipe they added
const modifyRecipe = (req,res) => {
  recipeModel.findAll({
    where: {
      id : parseInt(req.params.recipeId)
    }
  }).then(result => { 
    if(result.length==0) {
      res.send('Specified recipe could not be found');
    }
  }).error(error => res.send(error));
};

const allMethods = { 'getTotalRecipes' : getTotalRecipes, 'addRecipe' : addRecipe, 'modifyRecipe': modifyRecipe};
export default allMethods;

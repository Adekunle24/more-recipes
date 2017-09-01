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
    title : req.body.title,
    userId : req.body.user,
    procedures : req.body.procedures,
    ingredients : req.body.ingredients
  }).then(result => res.send('Recipe added successfully')).catch(error => res.send(error));
};

// this api enables users to modify recipe they added
const modifyRecipe = (req,res) => {
  recipeModel.findById(
    req.body.recipeId
  ).then(result => {
    if(result)
    {
    // call the method to save new recipe details
      saveModifiedRecipe(req,res,result);
    }
    else{
      res.send('Specified recipe could not be found');
    }
  }).catch(error =>res.send(error));

 
};

// this api submits the modified recipe and saves into the db
const saveModifiedRecipe = (req,res,data) => {
  data.update({
    title : req.body.title || data.title,
    procedures : req.body.procedures || data.procedures,
    ingredients : req.body.ingredients || data.ingredients
  }).then(output => {
    if(output[0]==0)
    {
      res.send('Specified recipe could not be found');
    }
    else{
      res.send(data);
    }
  }).catch(error => res.send(error));
};

const deleteRecipe = (req,res) => {
  recipeModel.findById(req.body.recipeId).then(recipe => {
    if(!recipe)
    {
      res.send('Specified recipe could not be found');
    }
    else{
      recipe.destroy()
        .then(output => res.send('Recipe deleted successfully')).catch(error => res.send(error));
    }
  }).catch(error => res.send(error));

 
};
const getRecipeWithMostUpVotes = (req,res) => {
  res.send('api route to get most upvotes');
};
const allMethods = { 'getTotalRecipes' : getTotalRecipes, 'addRecipe' : addRecipe,
  'modifyRecipe': modifyRecipe, 'setModifiedRecipe':modifyRecipe, 'deleteRecipe' : deleteRecipe, 'getRecipeWithMostUpVotes' : getRecipeWithMostUpVotes};
export default allMethods;

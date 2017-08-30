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



const allMethods = { 'getTotalRecipes' : getTotalRecipes};
export default allMethods;
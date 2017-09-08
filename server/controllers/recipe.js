
import allModels from '../models';
import allControllers from '../controllers';

const recipeModel = allModels.recipes;
const userModel = allModels.users;
const voteModel = allModels.votes;
const reviewModel = allModels.reviews;
const socialValuesModel = allModels.social_values;
/**
 * Get total recipes in the application
 * @param  {} req
 * @param  {} res
 */
const getTotalRecipes = (req, res) => {
  if (req.query.sort && req.query.order) {
    allControllers.socialValueController.getValuesInDesc(req, res);
  } else {
    recipeModel.findAll({
      include: [{
        model: userModel,
        attributes: ['username', 'email', 'id'],
        as: 'users',
      }, {
        model: socialValuesModel,
        as: 'socialValues',
      }]
    }
    ).then(value => res.json({ status: 'success', data: value })).catch(error => res.send(error.toString()));
  }
};
/**
 * Add a recipe to the application
 * @param  {} req
 * @param  {} res
 */
const addRecipe = (req, res) => {
  if (req.body.title && req.body.procedures && req.body.ingredients && req.decoded) {
    recipeModel.create({
      title: req.body.title,
      userId: req.decoded.id,
      procedures: req.body.procedures,
      ingredients: req.body.ingredients
    }).then((result) => {
      socialValuesModel.create({
        recipeId: result.id,
        upvotes: 0,
        downvotes: 0,
        replies: 0
      }).then((social) => {
        res.json({ status: 'success', data: { recipes: result, socialValues: social }, message: 'Recipe added successfully' });
      }).catch(error => res.send(error.toString()));
    }).catch(error => res.send(error.toString()));
  } else {
    res.json({
      status: 'fail', data: null, validations: false, message: 'Please provide title,procedures, and ingredients'
    });
  }
};
/**
 * Saves modified recipe to db
 * @param  {} req
 * @param  {} res
 * @param  {} data
 */
const saveModifiedRecipe = (req, res, data) => {
  data.update({
    title: req.body.title || data.title,
    procedures: req.body.procedures || data.procedures,
    ingredients: req.body.ingredients || data.ingredients
  }).then((output) => {
    if (output[0] === 0) {
      res.json({ status: 'fail', message: 'Specified recipe could not be found' });
    } else {
      res.json({ status: 'success', data: output });
    }
  }).catch(error => res.send(error));
};
/**Modify a recipe
 * @param  {} req
 * @param  {} res
 */
const modifyRecipe = (req, res) => {
  if (req.body.recipeId) {
    recipeModel.findById(
      req.body.recipeId
    ).then((result) => {
      if (result) {
        // call the method to save new recipe details
        saveModifiedRecipe(req, res, result);
      } else {
        res.json({status:'fail',message:'Specified recipe could not be found'});
      }
    }).catch(error => res.send(error));
  } else {
    res.json({ status: 'fail', validations: false, message: 'Please provide a Recipe Id' });
  }
};
/**
 * Delete a recipe
 * @param  {} req
 * @param  {} res
 */
const deleteRecipe = (req, res) => {
  if (req.body.recipeId) {
    reviewModel.destroy({
      where: {
        recipeId: req.body.recipeId
      }
    }).then((response) => {
      voteModel.destroy({
        where: {
          recipeId: req.body.recipeId
        }
      }).then((response) => {
        recipeModel.findById(req.body.recipeId).then((recipe) => {
          if (!recipe) {
            res.json({ message: 'Specified recipe could not be found', status: 'fail' });
          } else {
            recipe.destroy()
              .then(output => res.json({ status: 'success', message: 'Recipe deleted successfully' })).catch(error => res.send(error));
          }
        }).catch(error => res.send(error));
      }).catch(error => res.send(error));
    }).catch(error => res.send(error));
  } else {
    res.json({ message: 'Please provide a recipe Id', validations: false, status: 'fail' });
  }
};
const getRecipeWithMostUpVotes = (req, res) => {
  res.send('api route to get most upvotes');
};
/**
 * Search List of recipes using ingredient
 * @param  {} req
 * @param  {} res
 */
const searchRecipeUsingIngredient = (req,res) =>{
  if(req.query.keyword)
  {
    recipeModel.query(`select * from recipes where title like '%${req.query.keyword}%'`).then(result => res.json({status:'success',data:result})).catch(error => res.send(error.toString()));
  }
  else{
    res.json({status:'fail',message:'Please specify a keyword',data:null});
  }
};
const allMethods = {
  getTotalRecipes,
  addRecipe,
  modifyRecipe,
  setModifiedRecipe: modifyRecipe,
  deleteRecipe,
  getRecipeWithMostUpVotes,
  searchRecipeUsingIngredient
};
export default allMethods;

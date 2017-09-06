// import all the models
import allModels from '../models';
import allControllers from '../controllers';
// assign recipeModel to model recipe
const recipeModel = allModels.recipes;
const userModel = allModels.users;
const voteModel = allModels.votes;
const reviewModel = allModels.reviews;
const socialValuesModel = allModels.social_values;
// this is a test api to display all registered users
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
    ).then(value => res.json({ success: true, data: value })).catch(error => res.send(error.toString()));
  }
};
// this api adds a new recipe to the database
const addRecipe = (req, res) => {
  if (req.body.title && req.body.procedures && req.body.ingredients && req.decoded) {
    recipeModel.create({
      title: req.body.title,
      userId: req.decoded.id,
      procedures: req.body.procedures,
      ingredients: req.body.ingredients
    }).then(result => res.json({ success: true, data: result, message: 'Recipe added successfully' })).catch(error => res.send(error));
  } else {
    res.json({
      success: false, data: null, validations: false, message: 'Please provide title,procedures, and ingredients'
    });
  }
};

// this api submits the modified recipe and saves into the db
const saveModifiedRecipe = (req, res, data) => {
  data.update({
    title: req.body.title || data.title,
    procedures: req.body.procedures || data.procedures,
    ingredients: req.body.ingredients || data.ingredients
  }).then((output) => {
    if (output[0] === 0) {
      res.json({ success: false, message: 'Specified recipe could not be found' });
    } else {
      res.json({ success: true, data: output });
    }
  }).catch(error => res.send(error));
};

// this api enables users to modify recipe they added
const modifyRecipe = (req, res) => {
  if (req.body.recipeId) {
    recipeModel.findById(
      req.body.recipeId
    ).then((result) => {
      if (result) {
        // call the method to save new recipe details
        saveModifiedRecipe(req, res, result);
      } else {
        res.send('Specified recipe could not be found');
      }
    }).catch(error => res.send(error));
  } else {
    res.json({ success: false, validations: false, message: 'Please provide a Recipe Id' });
  }
};


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
            res.json({ message: 'Specified recipe could not be found', success: false });
          } else {
            recipe.destroy()
              .then(output => res.json({ success: true, message: 'Recipe deleted successfully' })).catch(error => res.send(error));
          }
        }).catch(error => res.send(error));
      }).catch(error => res.send(error));
    }).catch(error => res.send(error));
  } else {
    res.json({ message: 'Please provide a recipe Id', validations: false, success: false });
  }
};
const getRecipeWithMostUpVotes = (req, res) => {
  res.send('api route to get most upvotes');
};
const allMethods = {
  getTotalRecipes,
  addRecipe,
  modifyRecipe,
  setModifiedRecipe: modifyRecipe,
  deleteRecipe,
  getRecipeWithMostUpVotes
};
export default allMethods;

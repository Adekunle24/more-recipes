// import all the models
import allModels from '../models';
const reviewModel = allModels.review;

const saveReviewToDb = (req,res) => {
  reviewModel.create({
    recipeId : req.body.recipeId,
    userId : req.body.userId,
    review : req.body.review
  }).then(output => res.send('Review posted successfully')).catch(error => res.send(error));
};

const getAllReviews = (req,res) =>{
  reviewModel.findAll({
    where : {
      recipeId : req.params.recipeId
    }
  }).then(result => res.send(result)).catch(error => res.send(error));
};
const allMethods = { 'saveReviewToDb' : saveReviewToDb, 'getAllReviews' : getAllReviews};
export default allMethods;

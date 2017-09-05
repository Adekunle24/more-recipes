// import all the models
import allModels from '../models';
const reviewModel = allModels.reviews;
/**
 * @param  {} req
 * @param  {} res
 */
const saveReviewToDb = (req,res) => {
  if(req.body.recipeId&&req.body.review&&req.body.review)
  {
    reviewModel.create({
      recipeId : req.body.recipeId,
      userId : req.decoded.id,
      review : req.body.review
    }).then(output => res.json({message:'Review posted successfully',success:true,data:output})).catch(error => res.send(error));
  }
  else{
    res.json({validations:false,success:false,message:'Please provide Recipe Id and a review' });
  }
};
/**
 * @param  {} req
 * @param  {} res
 */
const getAllReviews = (req,res) =>{
  reviewModel.findAll({
    where : {
      recipeId : req.params.recipeId
    }
  }).then(result => res.send(result)).catch(error => res.send(error));
};
const allMethods = { 'saveReviewToDb' : saveReviewToDb, 'getAllReviews' : getAllReviews};
export default allMethods;

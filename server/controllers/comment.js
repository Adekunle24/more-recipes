// import all the models
import allModels from '../models';
const commentModel = allModels.comment;

// saves review into database
const addReview = (req,res) =>  {
  res.send('To post review, use ..api/reviews/add/:recipeId/:userId/:reviewMessage');
};

const saveReviewToDb = (req,res) => {
  commentModel.create({
    recipeId : req.params.recipeId,
    userId : req.params.userId,
    comment : req.params.reviewMessage
  }).then(output => res.send('Review posted successfully')).catch(error => res.send(error));
};
const allMethods = { 'postReview' : addReview, 'saveReviewToDb' : saveReviewToDb};
export default allMethods;

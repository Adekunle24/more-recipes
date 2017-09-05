
import allModels from '../models';

const reviewModel = allModels.reviews;
const saveReviewToDb = (req, res) => {
  if (req.params.recipeId && req.body.review) {
    reviewModel.create({
      recipeId: req.params.recipeId,
      userId: req.decoded.id,
      review: req.body.review
    }).then(output => res.json({
      status: 'success', message: 'Review posted successfully', success: true, data: output
    })).catch(error => res.send(error));
  } else {
    res.json({
      status: 'fail', validations: false, success: false, message: 'Please provide Recipe Id and a review'
    });
  }
};

const getAllReviews = (req, res) => {
  reviewModel.findAll({
    where: {
      recipeId: req.params.recipeId
    }
  }).then(result => res.json({ status: 'success', data: result })).catch(error => res.send(error));
};
const allMethods = { saveReviewToDb, getAllReviews };
export default allMethods;

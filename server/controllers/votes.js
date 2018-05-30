// import all the models
import allModels, { VoteModel } from '../models';
import Middleware from '../middleware';

const middleware = new Middleware();
/**
 * Performs an upvoting action on a recipe
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const upVoteRecipe = (req, res) => {
  if (req.params.recipeId && req.decoded) {
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Recipe Id must be a number'
      });
    }
    VoteModel.find({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then((result) => {
      // if this is the first upvote, save to db
      if (!result) {
        // add a row to votes table
        VoteModel.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        }).then((output) => {
          // increment total upvotes on social_values table
          allModels.social_values.find({
            where: {
              recipeId: req.params.recipeId
            },
          }).then(social => social.increment('upvotes').then(increment => res.json({
            status: 'success',
            data: output,
            socialValue: social,
            message: 'You have successfully upvoted this recipe'
          }))
            .catch(error => middleware.parseSequelizeError(res, error)))
            .catch(error => middleware.parseSequelizeError(res, error));
        }).catch(error => middleware.parseSequelizeError(res, error));
      }
      if (result.upvote === 1) {
        // Undo upvote on second click when upvote is 1
        result.decrement('upvote').then((fromVotes) => {
          allModels.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(social => social.decrement('upvotes').then(decrement => res.json({
            status: 'fail',
            data: { social_values: decrement, votes: fromVotes },
            message: 'You have successfully reversed your upvoting for this recipe'
          })).catch(error => middleware.parseSequelizeError(res, error)))
            .catch(error => middleware.parseSequelizeError(res, error));
        }).catch(error => middleware.parseSequelizeError(res, error));
      } else {
        // Redo upvote when upvote is 0
        result.increment('upvote').then((fromVotes) => {
          allModels.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(social => social.increment('upvotes').then((decrement) => {
            if (result.downvote === 1) {
              result.decrement('downvote').then((downvoteResult) => {
                social.decrement('downvotes').then((downVotesResult) => {
                  res.json({
                    status: 'success',
                    data: { social_values: decrement, votes: fromVotes },
                    message: 'You have successfully upvoted this recipe'
                  });
                });
              });
            } else {
              res.json({
                status: 'success',
                data: { social_values: decrement, votes: fromVotes },
                message: 'You have successfully upvoted this recipe'
              });
            }
          }).catch(error => middleware.parseSequelizeError(res, error)))
            .catch(error => middleware.parseSequelizeError(res, error));
        }).catch(error => middleware.parseSequelizeError(res, error));
      }
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({ status: 'success' });
  }
};

/** Downvotes a recipe
 *
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const downVoteRecipe = (req, res) => {
  if (req.params.recipeId && req.decoded) {
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Recipe Id must be a number'
      });
    }
    VoteModel.find({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then((result) => {
      // if this is the first upvote, save to db
      if (!result) {
        // add a row to votes table
        voteModel.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        }).then((output) => {
          // increment total upvotes on social_values table
          allModels.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(social => social.increment('downvotes').then(increment => res.json({
            status: 'success',
            data: output,
            message: 'You have successfully downvoted this recipe'
          })).catch(error => middleware.parseSequelizeError(res, error)))
            .catch(error => middleware.parseSequelizeError(res, error));
        }).catch(error => middleware.parseSequelizeError(res, error));
      } else if (result.downvote === 1) {
        // Undo upvote on second click when upvote is 1
        result.decrement('downvote').then((fromVotes) => {
          allModels.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(social => social.decrement('downvotes').then((decrement) => {
            if (result.upvote === 1) {
              result.decrement('upvote').then((downvoteResult) => {
                social.decrement('upvotes').then((downVotesResult) => {
                  res.json({
                    status: 'fail',
                    data: { social_values: decrement, votes: fromVotes },
                    message: 'You have successfully reversed your downvoting for this recipe'
                  });
                });
              });
            } else {
              res.json({
                status: 'fail',
                data: { social_values: decrement, votes: fromVotes },
                message: 'You have successfully reversed your downvoting for this recipe'
              });
            }
          }).catch(error => middleware.parseSequelizeError(res, error)))
            .catch(error => middleware.parseSequelizeError(res, error));
        }).catch(error => middleware.parseSequelizeError(res, error));
      } else {
        // Redo downvote when downvote is 0
        result.increment('downvote').then((fromVotes) => {
          allModels.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(social => social.increment('downvotes').then((decrement) => {
            if (result.upvote === 1) {
              result.decrement('upvote').then((upvoteResult) => {
                social.decrement('upvotes').then((upVotesResult) => {
                  res.json({
                    status: 'success',
                    data: { social_values: decrement, votes: fromVotes },
                    message: 'You have successfully downvoted this recipe'
                  });
                });
              });
            } else {
              res.json({
                status: 'success',
                data: { social_values: decrement, votes: fromVotes },
                message: 'You have successfully downvoted this recipe'
              });
            }
          }).catch(error => middleware.parseSequelizeError(res, error)))
            .catch(error => middleware.parseSequelizeError(res, error));
        }).catch(error => middleware.parseSequelizeError(res, error));
      }
    }).catch(error => middleware.parseSequelizeError(res, error));
  } else {
    res.json({ status: 'success' });
  }
};
const allMethods = { upVote: upVoteRecipe, downVote: downVoteRecipe };
export default allMethods;

// import all the models
import allModels from '../models';

const voteModel = allModels.votes;
const upVoteRecipe = (req, res) => {
  if (req.params.recipeId && req.decoded) {
    voteModel.find({
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
          }).then(social => social.increment('upvotes').then(increment => res.json({ status: 'success', data: output, message: 'You have successfully upvoted this recipe' })).catch(error => res.send(error.toString()))).catch(error => res.send(error.toString()));
        }
        ).catch(error => res.send(error));
      }
      if (result.upvote === 1) {
        // Undo upvote on second click when upvote is 1
        result.decrement('upvote').then((fromVotes) => {
          allModels.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(social => social.decrement('upvotes').then(decrement => res.json({
            status: 'fail', data: { social_values: decrement, votes: fromVotes }, message: 'You have successfully reversed your upvoting for this recipe'
          })).catch(error => res.send(error.toString()))).catch(error => res.send(error.toString()));
        }).catch(error => res.send(error.toString()));
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
                    status: 'success', data: { social_values: decrement, votes: fromVotes }, message: 'You have successfully upvoted this recipe'
                  });
                });
              });
            } else {
              res.json({
                status: 'success', data: { social_values: decrement, votes: fromVotes }, message: 'You have successfully upvoted this recipe'
              });
            }
          }
          ).catch(error => res.send(error.toString()))).catch(error => res.send(error.toString()));
        }).catch(error => res.send(error.toString()));
      }
    }).catch(error => res.send(error.toString()));
  } else {
    res.json({ status: 'success' });
  }
};

const downVoteRecipe = (req, res) => {
  if (req.params.recipeId && req.decoded) {
    voteModel.find({
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
          }).then(social => social.increment('downvotes').then(increment => res.json({ status: 'success', data: output, message: 'You have successfully downvoted this recipe' })).catch(error => res.send(error.toString()))).catch(error => res.send(error.toString()));
        }
        ).catch(error => res.send(error));
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
                    status: 'fail', data: { social_values: decrement, votes: fromVotes }, message: 'You have successfully reversed your downvoting for this recipe'
                  });
                });
              });
            } else {
              res.json({
                status: 'fail', data: { social_values: decrement, votes: fromVotes }, message: 'You have successfully reversed your downvoting for this recipe'
              });
            }
          }
          ).catch(error => res.send(error.toString()))).catch(error => res.send(error.toString()));
        }).catch(error => res.send(error.toString()));
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
                    status: 'success', data: { social_values: decrement, votes: fromVotes }, message: 'You have successfully downvoted this recipe'
                  });
                });
              });
            } else {
              res.json({
                status: 'success', data: { social_values: decrement, votes: fromVotes }, message: 'You have successfully downvoted this recipe'
              });
            }
          }).catch(error => res.send(error.toString()))).catch(error => res.send(error.toString()));
        }).catch(error => res.send(error.toString()));
      }
    }).catch(error => res.send(error.toString()));
  } else {
    res.json({ status: 'success' });
  }
};
const allMethods = { upVote: upVoteRecipe, downVote: downVoteRecipe };
export default allMethods;

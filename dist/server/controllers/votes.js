'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import all the models
var middleware = new _middleware2.default();
var voteModel = _models2.default.votes;
var upVoteRecipe = function upVoteRecipe(req, res) {
  if (req.params.recipeId && req.decoded) {
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Recipe Id must be a number'
      });
    }
    voteModel.find({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then(function (result) {
      // if this is the first upvote, save to db
      if (!result) {
        // add a row to votes table
        voteModel.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        }).then(function (output) {
          // increment total upvotes on social_values table
          _models2.default.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(function (social) {
            return social.increment('upvotes').then(function (increment) {
              return res.json({
                status: 'success',
                data: output,
                socialValue: social,
                message: 'You have successfully upvoted this recipe'
              });
            }).catch(function (error) {
              return middleware.parseSequelizeError(res, error);
            });
          }).catch(function (error) {
            return middleware.parseSequelizeError(res, error);
          });
        }).catch(function (error) {
          return middleware.parseSequelizeError(res, error);
        });
      }
      if (result.upvote === 1) {
        // Undo upvote on second click when upvote is 1
        result.decrement('upvote').then(function (fromVotes) {
          _models2.default.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(function (social) {
            return social.decrement('upvotes').then(function (decrement) {
              return res.json({
                status: 'fail',
                data: { social_values: decrement, votes: fromVotes },
                message: 'You have successfully reversed your upvoting for this recipe'
              });
            }).catch(function (error) {
              return middleware.parseSequelizeError(res, error);
            });
          }).catch(function (error) {
            return middleware.parseSequelizeError(res, error);
          });
        }).catch(function (error) {
          return middleware.parseSequelizeError(res, error);
        });
      } else {
        // Redo upvote when upvote is 0
        result.increment('upvote').then(function (fromVotes) {
          _models2.default.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(function (social) {
            return social.increment('upvotes').then(function (decrement) {
              if (result.downvote === 1) {
                result.decrement('downvote').then(function (downvoteResult) {
                  social.decrement('downvotes').then(function (downVotesResult) {
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
            }).catch(function (error) {
              return middleware.parseSequelizeError(res, error);
            });
          }).catch(function (error) {
            return middleware.parseSequelizeError(res, error);
          });
        }).catch(function (error) {
          return middleware.parseSequelizeError(res, error);
        });
      }
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({ status: 'success' });
  }
};

var downVoteRecipe = function downVoteRecipe(req, res) {
  if (req.params.recipeId && req.decoded) {
    if (!middleware.validateStringIsNumber(req.params.recipeId)) {
      res.json({
        status: 'fail', validations: false, success: false, message: 'Recipe Id must be a number'
      });
    }
    voteModel.find({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then(function (result) {
      // if this is the first upvote, save to db
      if (!result) {
        // add a row to votes table
        voteModel.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        }).then(function (output) {
          // increment total upvotes on social_values table
          _models2.default.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(function (social) {
            return social.increment('downvotes').then(function (increment) {
              return res.json({
                status: 'success',
                data: output,
                message: 'You have successfully downvoted this recipe'
              });
            }).catch(function (error) {
              return middleware.parseSequelizeError(res, error);
            });
          }).catch(function (error) {
            return middleware.parseSequelizeError(res, error);
          });
        }).catch(function (error) {
          return middleware.parseSequelizeError(res, error);
        });
      } else if (result.downvote === 1) {
        // Undo upvote on second click when upvote is 1
        result.decrement('downvote').then(function (fromVotes) {
          _models2.default.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(function (social) {
            return social.decrement('downvotes').then(function (decrement) {
              if (result.upvote === 1) {
                result.decrement('upvote').then(function (downvoteResult) {
                  social.decrement('upvotes').then(function (downVotesResult) {
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
            }).catch(function (error) {
              return middleware.parseSequelizeError(res, error);
            });
          }).catch(function (error) {
            return middleware.parseSequelizeError(res, error);
          });
        }).catch(function (error) {
          return middleware.parseSequelizeError(res, error);
        });
      } else {
        // Redo downvote when downvote is 0
        result.increment('downvote').then(function (fromVotes) {
          _models2.default.social_values.find({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(function (social) {
            return social.increment('downvotes').then(function (decrement) {
              if (result.upvote === 1) {
                result.decrement('upvote').then(function (upvoteResult) {
                  social.decrement('upvotes').then(function (upVotesResult) {
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
            }).catch(function (error) {
              return middleware.parseSequelizeError(res, error);
            });
          }).catch(function (error) {
            return middleware.parseSequelizeError(res, error);
          });
        }).catch(function (error) {
          return middleware.parseSequelizeError(res, error);
        });
      }
    }).catch(function (error) {
      return middleware.parseSequelizeError(res, error);
    });
  } else {
    res.json({ status: 'success' });
  }
};
var allMethods = { upVote: upVoteRecipe, downVote: downVoteRecipe };
exports.default = allMethods;
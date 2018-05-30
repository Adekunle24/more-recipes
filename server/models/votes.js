
import Sequelize from 'sequelize';

const Votes = sequelize => sequelize.define('votes', {
  recipeId: { type: Sequelize.INTEGER, allowNull: false },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  upvote: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 1 },
  downvote: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false }
});

export default Votes;

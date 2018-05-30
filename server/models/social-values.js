
import Sequelize from 'sequelize';

const SocialValues = sequelize => sequelize.define('social_values', {
  recipeId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false },
  upvotes: { type: Sequelize.INTEGER },
  downvotes: { type: Sequelize.INTEGER },
  replies: { type: Sequelize.INTEGER, defaultValue: 0 }
});

export default SocialValues;

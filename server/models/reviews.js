import Sequelize from 'sequelize';

const Review = sequelize => sequelize.define('reviews', {
  recipeId: { type: Sequelize.INTEGER, allowNull: false },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  replies: { type: Sequelize.STRING, allowNull: true },
  review: { type: Sequelize.STRING, allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false }
});


export default Review;

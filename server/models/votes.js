
const Votes = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    recipeId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    upvote: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    downvote: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  votes.associate = (models) => {
    votes.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'users'
    });
    votes.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      as: 'recipes'
    });
  };
  return votes;
};
export default Votes;


const Votes = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    recipeId : { type : DataTypes.INTEGER, allowNull: false},
    userId : { type : DataTypes.INTEGER, allowNull : false },
    upvote : { type: DataTypes.INTEGER, allowNull : true },
    downvote : { type : DataTypes.INTEGER, allowNull : false },
    createdAt : { type : DataTypes.DATE, allowNull : false },
    updatedAt : { type : DataTypes.DATE, allowNull : false }
  });
  return votes;
};
export default Votes;
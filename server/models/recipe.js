
const Recipe = (sequelize, DataTypes) =>{
  const recipe = sequelize.define('recipes', {
    title : { type : DataTypes.STRING, allowNull : false },
    createdAt : { type : DataTypes.TIME, allowNull : true },
    updatedAt : { type : DataTypes.TIME, allowNull : true },
    userId : { type : DataTypes.INTEGER, allowNull : false },
    procedures : { type : DataTypes.STRING, allowNull : false },
    ingredients : { type : DataTypes.JSON, allowNull : false, defaultValue : 'No ingredients'}
  });
  recipe.associate = (models) => {
    recipe.hasOne(models.users, {
      foreignKey: 'userId',
      as: 'users',
    });
  };
  return recipe;
};
export default Recipe;
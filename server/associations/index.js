
const attachAssociations = (
  UserModel,
  RecipeModel,
  UserProfileModel,
  VoteModel,
  MediaModel,
  SocialValuesModel,
  FavouriteRecipeModel,
  ReviewModel
) => {
  FavouriteRecipeModel.belongsTo(RecipeModel, {
    foreignKey: 'recipeId',
  });
  FavouriteRecipeModel.hasOne(UserModel, {
    foreignKey: 'id'
  });
  RecipeModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'users'
  });
  MediaModel.belongsTo(UserModel, {
    foreignKey: 'userId'
  });
  RecipeModel.hasOne(SocialValuesModel, {
    foreignKey: 'recipeId',
    as: 'socialValues'
  });
  RecipeModel.belongsTo(MediaModel, {
    foreignKey: 'mediaId',
    as: 'media'
  });

  RecipeModel.hasMany(FavouriteRecipeModel, {
    foreignKey: 'id',
    as: 'favourites'
  });
  RecipeModel.hasMany(VoteModel, {
    foreignKey: 'id',
    as: 'votes'
  });

  ReviewModel.belongsTo(RecipeModel, {
    foreignKey: 'recipeId'
  });
  SocialValuesModel.belongsTo(RecipeModel, {
    foreignKey: 'recipeId',
  });
  UserModel.hasMany(RecipeModel, {
    foreignKey: 'userId'
  });
  UserModel.hasOne(UserProfileModel, {
    foreignKey: 'id'
  });
  UserModel.hasMany(VoteModel, {
    foreignKey: 'id'
  });
  UserProfileModel.belongsTo(UserModel, {
    foreignKey: 'userId',
  });
  VoteModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'users'
  });
  VoteModel.belongsTo(RecipeModel, {
    foreignKey: 'recipeId',
    as: 'recipes'
  });
};

export default attachAssociations;

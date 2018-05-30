
import dotenv from 'dotenv';

import Sequelize from 'sequelize';
import User from '../models/users';
import Recipe from '../models/recipes';
import Associations from '../associations';
import UserProfile from './user-profile';
import Votes from '../models/votes';
import Media from '../models/media';
import SocialValues from './social-values';
import FavouriteRecipe from './favourite-recipes';
import Review from './reviews';

dotenv.config();

const AppModel = process.env.NODE_ENV !== 'production' ?
  new Sequelize(
    `${process.env.DB_NAME}_${process.env.NODE_ENV.toLowerCase()}`, process.env.DB_USERNAME,
    process.env.DB_PASSWORD, { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST }
  )
  :
  new Sequelize(process.env.DATABASE_URL);
export const UserModel = User(AppModel);
export const RecipeModel = Recipe(AppModel);
export const UserProfileModel = UserProfile(AppModel);
export const VoteModel = Votes(AppModel);
export const MediaModel = Media(AppModel);
export const SocialValuesModel = SocialValues(AppModel);
export const FavouriteRecipeModel = FavouriteRecipe(AppModel);
export const ReviewModel = Review(AppModel);
Associations(
  UserModel,
  RecipeModel, UserProfileModel,
  VoteModel, MediaModel,
  SocialValuesModel, FavouriteRecipeModel,
  ReviewModel
);

export default AppModel;

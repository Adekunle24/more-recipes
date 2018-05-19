import {
  ADD_RECIPE,
  GET_USER_RECIPE_POSTERS,
  SET_POSTER_ON_ADD_RECIPE,
  RESET_NO_MORE_RECIPE_ON_ADD_RECIPE
} from '../constants/action-types';

const initialState = {
  myRecipes: [],
  myRecipePosters: [],
  selectedPoster: null,
  noMoreRecipePostersAtAddRecipe: false,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return Object.assign({}, state, {
        myRecipes: [...state.recipes, action.payload.data]
      });
    case GET_USER_RECIPE_POSTERS:
      return Object.assign({}, state, {
        myRecipePosters: [...state.myRecipePosters, ...action.payload]
      });
    case SET_POSTER_ON_ADD_RECIPE:
      return Object.assign({}, state, {
        selectedPoster: action.payload
      });
    case RESET_NO_MORE_RECIPE_ON_ADD_RECIPE:
      return Object.assign({}, state, {
        noMoreRecipePostersAtAddRecipe: action.payload
      });
    default:
      return state;
  }
};
export default recipeReducer;

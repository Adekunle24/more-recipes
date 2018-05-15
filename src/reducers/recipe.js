import {
  ADD_RECIPE,
  GET_USER_RECIPE_POSTERS
} from '../constants/action-types';

const initialState = {
  recipes: [],
  myRecipePosters: [],
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return Object.assign({}, state, {
        recipes: [...state.recipes, action.payload.data]
      });
    case GET_USER_RECIPE_POSTERS:
      return Object.assign({}, state, {
        myRecipePosters: [...state.myRecipePosters, ...action.payload]
      });
    default:
      return state;
  }
};
export default recipeReducer;

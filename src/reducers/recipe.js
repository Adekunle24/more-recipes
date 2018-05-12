import {
  ADD_RECIPE
} from '../constants/action-types';

const initialState = {
  recipes: [],
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return Object.assign({}, state, {
        recipes: [...state.recipes, action.payload.data]
      });

    default:
      return state;
  }
};
export default recipeReducer;

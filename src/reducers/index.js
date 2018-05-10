/* jshint esnext:true */

import ADD_ARTICLE, {
  ADD_USER,
  USER_IS_REGISTERING
} from './../constants/action-types';


const initialState = {
  articles: [],
  isUserRegistering: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return Object.assign({}, state, {
        articles: [...state.articles, action.payload]
      });
    case USER_IS_REGISTERING:
      return Object.assign({}, state, {
        isUserRegistering: true,
      });
    default:
      return state;
  }
};

export default rootReducer;

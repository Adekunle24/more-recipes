import axios from 'axios';
import {
  displayAppNotification,
} from '../actions/index';
import {
  getRecipePostersApi
} from './../api/index';
import {
  GET_USER_RECIPE_POSTERS,
  SET_POSTER_ON_ADD_RECIPE,
  RESET_NO_MORE_RECIPE_ON_ADD_RECIPE
} from '../constants/action-types';

const setAxiosUserTokenHeader = (token) => {
  axios.defaults.headers['x-access-token'] = token;
};
const getMyRecipePosters = data => ({
  type: GET_USER_RECIPE_POSTERS,
  payload: data,
});
export function setSelectedPoster(data) {
  return {
    type: SET_POSTER_ON_ADD_RECIPE,
    payload: data,
  };
}

export function getMyRecipePostersThunk(offset = 0) {
  return (dispatch, getState) => {
    setAxiosUserTokenHeader(getState().userReducer.userToken);
    return axios.get(getRecipePostersApi, {
      params: {
        offset
      }
    }).then((response) => {
      dispatch(getMyRecipePosters(response.data.data));
    }).catch((error) => {
      dispatch(displayAppNotification({
        message: 'Error occured while retrieving your recipe posters',
        type: 'error',
        updateState: {}
      }));
    });
  };
}
export function resetNoMoreRecipeOnAddRecipe(data) {
  return {
    type: RESET_NO_MORE_RECIPE_ON_ADD_RECIPE,
    payload: data
  };
}

export default getMyRecipePosters;

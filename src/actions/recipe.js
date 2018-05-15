import axios from 'axios';
import { displayAppNotification } from '../actions/index';
import { getRecipePostersApi } from './../api/index';
import { GET_USER_RECIPE_POSTERS } from '../constants/action-types';

const setAxiosUserTokenHeader = (token) => {
  axios.defaults.headers['x-access-token'] = token;
};
const getMyRecipePosters = data => ({
  type: GET_USER_RECIPE_POSTERS,
  payload: data,
});

export function getMyRecipePostersThunk() {
  return (dispatch, getState) => {
    setAxiosUserTokenHeader(getState().userReducer.userToken);
    return axios.get(getRecipePostersApi).then((response) => {
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
export default getMyRecipePosters;

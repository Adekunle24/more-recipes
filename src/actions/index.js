import * as axios from 'axios';
import ADD_ARTICLE, {
  ADD_USER,
  USER_IS_REGISTERING
} from './../constants/action-types';
import {
  addUser as addUserApi
} from './../api/index';

export function addArticle(article) {
  return {
    type: ADD_ARTICLE,
    payload: article,
  };
}
export function addUser(data) {
  return {
    type: ADD_USER,
    payload: data,
  };
}

function userIsRegistering() {
  return {
    type: USER_IS_REGISTERING,
    payload: null,
  };
}
export function addUserThunk(data) {
  return (dispatch, getState) => {
    dispatch(userIsRegistering());
    console.log(`Test thunk was called${JSON.stringify(getState().articles)}`);
    return axios.post(addUserApi, {

    }).then((response) => {
      console.log(`Response: ${JSON.stringify(response.data)}`);
      dispatch(addUser(data));
    }).catch((error) => {
      console.log(`An error occured ${JSON.stringify(error)}`);
      dispatch(addUser(data));
    });
  };
}

export default addArticle;

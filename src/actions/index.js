import axios from 'axios';
import ADD_ARTICLE, {
  ADD_USER,
  USER_IS_REGISTERING,
  USER_REGISTRATION_ERRORED,
  TOGGLE_APP_NOTIFICATION,
  USER_IS_ATTEMPTING_LOGIN,
  USER_LOGIN_ERRORED,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGGED_OUT_SUCCESSFUL,
  DISPLAY_APP_NOTIFICATION
} from './../constants/action-types';
import {
  addUser as addUserApi,
  loginUser as loginUserApi,
} from './../api/index';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
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

function userRegistrationErrored(data) {
  return {
    type: USER_REGISTRATION_ERRORED,
    payload: data,
  };
}

function userLoginErrored(data) {
  return {
    type: USER_LOGIN_ERRORED,
    payload: data,
  };
}
export function toggleAppNotification() {
  return {
    type: TOGGLE_APP_NOTIFICATION,
    payload: null,
  };
}
export function displayAppNotification(data) {
  return {
    type: DISPLAY_APP_NOTIFICATION,
    payload: data
  };
}
export function addUserThunk(data) {
  return (dispatch, getState) => {
    dispatch(userIsRegistering());
    return axios.post(addUserApi, {
      username: data.username,
      email: data.email,
      password: data.password,
      birthday: data.birthday,
      gender: data.gender,
    }).then((response) => {
      if (response.data.status === 'success') {
        dispatch(addUser(response.data));
      } else {
        dispatch(userRegistrationErrored({
          message: response.data.data.message
        }));
      }
    }).catch((error) => {
      dispatch(userRegistrationErrored({
        message: 'Error Occured'
      }));
    });
  };
}

function userIsAttemptingLogin() {
  return {
    type: USER_IS_ATTEMPTING_LOGIN,
    payload: null
  };
}

function loginUser(data) {
  return {
    type: USER_LOGIN_SUCCESSFUL,
    payload: data
  };
}
export function loginUserThunk(data) {
  return (dispatch) => {
    dispatch(userIsAttemptingLogin());
    return axios.post(loginUserApi, {
      username: data.login_username,
      password: data.login_password
    }).then((response) => {
      if (response.data.status === 'success') {
        dispatch(displayAppNotification({
          message: response.data.message,
          type: 'success',
          updateState: {
            isAttemptingLogin: false
          }
        }));
        dispatch(loginUser(response.data));
      } else {
        dispatch(userLoginErrored({
          message: response.data.message
        }));
      }
    }).catch((error) => {
      dispatch(userLoginErrored({
        message: 'Error occured, please try again'
      }));
    });
  };
}

export function logOutUser() {
  return {
    type: USER_LOGGED_OUT_SUCCESSFUL,
    payload: null,
  };
}

export default addArticle;

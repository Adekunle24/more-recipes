/* jshint esnext:true */

import ADD_ARTICLE, {
  ADD_USER,
  USER_IS_REGISTERING,
  USER_REGISTRATION_ERRORED,
  TOGGLE_APP_NOTIFICATION,
  USER_IS_ATTEMPTING_LOGIN,
  USER_LOGIN_ERRORED,
  USER_LOGIN_SUCCESSFUL,
  DISPLAY_APP_NOTIFICATION,
  USER_LOGGED_OUT_SUCCESSFUL
} from './../constants/action-types';


const initialState = {
  articles: [],
  isUserRegistering: false,
  isAuthenticated: true,
  showAppNotification: false,
  appNotificationMessage: '',
  appNotificationType: 'info',
  isAttemptingLogin: false,
  authenticatedUser: {
    email: 'kimberly@gmail.com',
    emailConfirmed: false,
    password: null,
    phoneNumber: '',
    phoneNumberVerified: false,
    accessFailedCount: 0,
    username: 'Kimberly',
    createdAt: '2018-05-18T20:24:39.007Z',
    updatedAt: '2018-05-18T20:24:39.007Z',
    id: 1
  },
  userToken: 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtpbWJlcmx5QGdtYWlsLmNvbSIsImVtYWlsQ29uZmlybWVkIjpmYWxzZSwicGFzc3dvcmQiOm51bGwsInBob25lTnVtYmVyIjoiIiwicGhvbmVOdW1iZXJWZXJpZmllZCI6ZmFsc2UsImFjY2Vzc0ZhaWxlZENvdW50IjowLCJ1c2VybmFtZSI6IktpbWJlcmx5IiwiY3JlYXRlZEF0IjoiMjAxOC0wNS0xOFQyMDoyNDozOS4wMDdaIiwidXBkYXRlZEF0IjoiMjAxOC0wNS0xOFQyMDoyNDozOS4wMDdaIiwiaWQiOjF9.sFTxBnlRTOde_BTnEKGqIr7z7VwD7Vjpk3gK1Q5GSIg',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_APP_NOTIFICATION:
      return Object.assign({}, state, {
        showAppNotification: !state.showAppNotification,
        appNotificationMessage: '',
      });
    case DISPLAY_APP_NOTIFICATION:
      return Object.assign({}, state, {
        showAppNotification: true,
        appNotificationMessage: action.payload.message,
        appNotificationType: action.payload.type,
        ...action.payload.updateState
      });
    case ADD_ARTICLE:
      return Object.assign({}, state, {
        articles: [...state.articles, action.payload]
      });
    case USER_IS_REGISTERING:
      return Object.assign({}, state, {
        isUserRegistering: true,
      });
    case ADD_USER:
      return Object.assign({}, state, {
        isAuthenticated: true,
        userToken: action.payload.data.token,
        isUserRegistering: false,
        showAppNotification: true,
        appNotificationMessage: action.payload.data.message,
        appNotificationType: 'success',
        authenticatedUser: action.payload.data.user,
      });
    case USER_REGISTRATION_ERRORED:
      return Object.assign({}, state, {
        isUserRegistering: false,
        showAppNotification: true,
        appNotificationMessage: action.payload.message,
        appNotificationType: 'error'
      });
    case USER_IS_ATTEMPTING_LOGIN:
      return Object.assign({}, state, {
        isAttemptingLogin: true
      });
    case USER_LOGIN_ERRORED:
      return Object.assign({}, state, {
        isAttemptingLogin: false,
        appNotificationType: 'error',
        showAppNotification: true,
        appNotificationMessage: action.payload.message,
      });
    case USER_LOGIN_SUCCESSFUL:
      return Object.assign({}, state, {
        isAttemptingLogin: false,
        userToken: action.payload.token,
        authenticatedUser: action.payload.data,
        isAuthenticated: true,
      });
    case USER_LOGGED_OUT_SUCCESSFUL:
      return Object.assign({}, state, {
        isAuthenticated: false,
        authenticatedUser: null,
      });
    default:
      return state;
  }
};

export default rootReducer;

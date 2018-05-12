import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import {
  createLogger
} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import userReducer from '../reducers';
import recipeReducer from './../reducers/recipe';

const loggerMiddleware = createLogger();
const allReducers = combineReducers({
  recipeReducer,
  userReducer,
});
const store = createStore(
  allReducers,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
export default store;

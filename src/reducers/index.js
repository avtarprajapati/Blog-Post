import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import ownFollow from './ownFollow';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  posts: postsReducer,
  ownFollow: ownFollow
});

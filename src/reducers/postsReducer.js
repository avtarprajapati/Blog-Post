import _ from 'lodash';
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
  POST_LIKE,
  POST_REMOVE_LIKE
} from '../actions/type';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      return _.mapKeys(action.payload, 'id');
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_POST:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_POST:
      return _.omit(state, action.payload);
    case POST_LIKE:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case POST_REMOVE_LIKE:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    default:
      return state;
  }
};

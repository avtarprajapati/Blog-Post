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
      // let { like } = state[action.payload.id];
      // let newLike = [...like, action.payload.userId];

      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case POST_REMOVE_LIKE:
      let l = state[action.payload.id].like;
      let newL = l.filter((uId) => uId !== action.payload.userId);

      if (!state[action.payload.id].like.length) newL = [];

      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], like: newL }
      };

    default:
      return state;
  }
};

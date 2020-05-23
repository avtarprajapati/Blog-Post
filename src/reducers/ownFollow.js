import { FOLLOW_POST, UNFOLLOW_POST } from '../actions/type';

export default (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_POST:
      // console.log(state[action.payload.ownUserId]);
      let oldList = [];
      if (state[action.payload.ownUserId])
        oldList = state[action.payload.ownUserId];
      return {
        ...state,
        [action.payload.ownUserId]: [...oldList, action.payload.postUserId]
      };
    case UNFOLLOW_POST:
      let oldFollow = [];
      if (state[action.payload.ownUserId])
        oldFollow = state[action.payload.ownUserId];
      oldFollow = oldFollow.filter(
        (userId) => userId !== action.payload.postUserId
      );
      return { ...state, [action.payload.ownUserId]: [...oldFollow] };

    default:
      return state;
  }
};

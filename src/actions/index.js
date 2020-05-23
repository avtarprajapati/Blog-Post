import posts from '../apis/posts';
import history from '../history';

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
  POST_LIKE,
  POST_REMOVE_LIKE,
  FOLLOW_POST,
  UNFOLLOW_POST
} from './type';

// Google
export const signIn = (profile) => {
  return {
    type: SIGN_IN,
    payload: {
      userId: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      profileImageUrl: profile.getImageUrl()
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// POST
export const createPost = (values) => async (dispatch, getState) => {
  const date = new Date().toDateString().split(' ').slice(1).join(' ');

  const reponse = await posts.post('/api/posts', {
    ...values,
    date,
    ...getState().auth,
    like: []
  });

  dispatch({ type: CREATE_POST, payload: reponse.data });
  history.push('/');
};

export const fetchPosts = () => async (dispatch) => {
  const reponse = await posts.get('/api/posts');

  dispatch({ type: FETCH_POSTS, payload: reponse.data });
};

export const fetchPost = (id) => async (dispatch) => {
  const reponse = await posts.get(`/api/posts/${id}`);

  dispatch({ type: FETCH_POST, payload: reponse.data });
};

export const editPost = (id, values) => async (dispatch, getState) => {
  const reponse = await posts.patch(`/api/posts/${id}`, values);

  dispatch({ type: EDIT_POST, payload: reponse.data });
  history.push('/');
};

export const deletePost = (id) => async (dispatch, getState) => {
  await posts.delete(`/api/posts/${id}`);

  dispatch({ type: DELETE_POST, payload: id });
  history.push('/');
};

// LIKE
export const likePost = (id, userId) => async (dispatch, getState) => {
  const newLike = getState().posts[id].like;

  const reponse = await posts.patch(`/api/posts/${id}`, {
    like: [...newLike, userId]
  });

  dispatch({ type: POST_LIKE, payload: reponse.data });
};

export const RemoveLikePost = (id, userId) => async (dispatch, getState) => {
  let newLike = getState().posts[id].like;
  newLike = newLike.filter((uId) => uId !== userId);

  const reponse = await posts.patch(`/api/posts/${id}`, {
    like: [...newLike]
  });

  dispatch({ type: POST_REMOVE_LIKE, payload: reponse.data });
};

// Following
export const followingPost = (ownUserId, postUserId) => {
  return { type: FOLLOW_POST, payload: { ownUserId, postUserId } };
};

export const unfollowingPost = (ownUserId, postUserId) => {
  return {
    type: UNFOLLOW_POST,
    payload: { ownUserId, postUserId }
  };
};

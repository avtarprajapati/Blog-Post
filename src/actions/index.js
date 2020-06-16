import history from '../history';
import postsRef from '../firebase';
import uniqid from 'uniqid';

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST
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

  const id = uniqid();

  let post = {
    id,
    ...values,
    date,
    ...getState().auth
  };

  postsRef.child(id).set(post);

  dispatch({ type: CREATE_POST, payload: post });
  history.push('/');
};

export const fetchPosts = () => async (dispatch) => {
  postsRef.on('value', (snapshot) => {
    dispatch({
      type: FETCH_POSTS,
      payload: Object.values(snapshot.val())
    });
  });
};

export const fetchPost = (id) => async (dispatch) => {
  postsRef.on('value', (snapshot) => {
    dispatch({
      type: FETCH_POST,
      payload: snapshot.val()[id]
    });
  });
};

export const editPost = (id, values) => async (dispatch, getState) => {
  postsRef.child(id).update(values);

  dispatch({ type: EDIT_POST, payload: values });
  history.push('/');
};

export const deletePost = (id) => async (dispatch, getState) => {
  postsRef.child(id).remove();

  dispatch({ type: DELETE_POST, payload: id });
  history.push('/');
};

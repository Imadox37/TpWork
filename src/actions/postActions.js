import {
  CLEAR_ERROR,
  GET_POSTS_FAIL,
  GET_POSTS_SUCESS,
  SET_LOADING,
} from './types';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({ type: GET_POSTS_SUCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_POSTS_FAIL });
  }
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const clearErrors = () => {
  return { type: CLEAR_ERROR };
};

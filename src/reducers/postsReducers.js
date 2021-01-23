import {
  CLEAR_ERROR,
  GET_POSTS_FAIL,
  GET_POSTS_SUCESS,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  loading: false,
  posts: [],
  error: false,
};

 const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCESS:
      return { ...state, posts: action.payload, loading: false };

    case GET_POSTS_FAIL:
      return { ...state, error: true, loading: false };

    case SET_LOADING:
      return { ...state, loading: true };

    case CLEAR_ERROR:
      return { ...state, error: false };

    default:
      return state;
  }
};

export {
    postReducers
}


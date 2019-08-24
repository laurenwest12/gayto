import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//action types
const GET_CAST = 'GET_CAST';

//action creators
const getCastAction = cast => ({
  type: GET_CAST,
  cast
});

//reducers
const cast = (state = [], action) => {
  switch (action.type) {
    case GET_CAST:
      return action.cast;
    default:
      return state;
  }
};

//thunks
export const getCastThunk = () => {
  return dispatch => {
    axios.get('/api/cast').then(({ data }) => dispatch(getCastAction(data)));
  };
};

export const updateMatchesThunk = cast => {
  return dispatch => {
    axios
      .put('/api/cast', cast)
      .then(({ data }) => dispatch(getCastAction(data)));
  };
};

const reducer = combineReducers({
  cast
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//action types
const GET_CAST = 'GET_CAST';
const GET_CEREMONY = 'GET_CEREMONY';

//action creators
const getCastAction = cast => ({
  type: GET_CAST,
  cast
});

const getCeremonyAction = ceremony => ({
  type: GET_CEREMONY,
  ceremony
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

const ceremony = (state = [], action) => {
  switch (action.type) {
    case GET_CEREMONY:
      return action.ceremony;
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

export const getCeremonyThunk = number => {
  return dispatch => {
    axios
      .get(`/api/ceremonies/${number}`)
      .then(({ data }) => dispatch(getCeremonyAction(data)));
  };
};

const reducer = combineReducers({
  cast,
  ceremony
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

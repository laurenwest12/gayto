import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//action types
const GET_CAST = 'GET_CAST';
const GET_CEREMONY = 'GET_CEREMONY';
const GET_PAIRS = 'GET_PAIRS';

//action creators
const getCastAction = cast => ({
  type: GET_CAST,
  cast
});

const getCeremonyAction = ceremony => ({
  type: GET_CEREMONY,
  ceremony
});

const getPairsAction = pairs => ({
  type: GET_PAIRS,
  pairs
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

const pairs = (state = [], action) => {
  switch (action.pairs) {
    case GET_PAIRS:
      return action.pairs;
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

export const getPairsThunk = number => {
  return dispatch => {
    axios
      .get(`/api/ceremonies/${number}/pairs`)
      .then(({ data }) => dispatch(getPairsAction(data)));
  };
};

export const postPairsThunk = (number, pair) => {
  return dispatch => {
    axios
      .post(`/api/ceremonies/${number}/pairs`, pair)
      .then(({ data }) => dispatch(getPairsAction(data)));
  };
};

const reducer = combineReducers({
  cast,
  ceremony,
  pairs
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

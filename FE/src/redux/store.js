// store.js
import { createStore } from 'redux';

// Action types
const SET_VALUE = 'SET_VALUE';

// Initial state
const initialState = {
  value: '',
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;

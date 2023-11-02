import { createStore } from 'redux';

const SET_VALUE = 'SET_VALUE';

const initialState = {
  value: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

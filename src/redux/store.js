import { createStore, combineReducers } from 'redux';

const reducers = {};

// load entire store
//const sessionState = sessionStorage.getItem('reduxStore') ? JSON.parse(sessionStorage.getItem('reduxStore')) : {};

const store = createStore((s) => s, {});

store.injectReducer = (key, reducer) => {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
};

// save entire store
//store.subscribe(() => sessionStorage.setItem('reduxStore', JSON.stringify(store.getState())));

export default store;
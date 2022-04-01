// counter with hook, counter is just a number
import store from './store';
import { useState, useLayoutEffect } from 'react';

const storeKey = 'counterObj';
const localStorageKey = storeKey; // or it can be something different from store key

const counterInitialValue = {
  'counter1': 0,
  'counter2': 10
};

const stateFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey)); // not required, only for saving in local storage
const initialState = stateFromLocalStorage ? stateFromLocalStorage : counterInitialValue;

const reducers = {
  setCounter: (oldState, {id, count}) => {
    const newState = {...oldState, [id]: count}
    localStorage.setItem(localStorageKey, JSON.stringify(newState)); // not required, only for saving in local storage
    return newState;
  },
  increment: (oldState, id) => {
    if (id in oldState) {
      const newState = {...oldState, [id]: oldState[id] + 1}
      localStorage.setItem(localStorageKey, JSON.stringify(newState)); // not required, only for saving in local storage
      return newState;
    }
    return oldState;
  },
  restoreInitialState: (oldState, newState) => {
    localStorage.setItem(localStorageKey, JSON.stringify(counterInitialValue)); // not required, only for saving in local storage
    return counterInitialValue;
  },
  resetToZero: (oldState, id) => {
    if (id in oldState) {
      const newState = {...oldState, [id]: 0}
      localStorage.setItem(localStorageKey, JSON.stringify(newState)); // not required, only for saving in local storage
      return newState;
    }
    return oldState;
  }
};

// HELPERS
const getState = () => store.getState()[storeKey];

const subscribe = (f) => {
  let lastState = getState();
  return store.subscribe(() => lastState !== getState() && f((lastState = getState())));
};


// EXPORTS
export const getCounter = () => getState();

export const setCounter = (id, newValue) => store.dispatch({ type: 'setCounter', payload: {id, count: newValue}});

export const increment = (id) => store.dispatch({ type: 'increment', payload: id});

export const restore = () => store.dispatch({ type: 'restoreInitialState'});

export const resetToZero = (counterId) => store.dispatch({ type: 'resetToZero', payload: counterId});

export const useCounter = () => {
  const [state, setState] = useState(getState());
  useLayoutEffect(() => subscribe(setState), [setState]);
  return state;
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey,
  (state = initialState,
    { type, payload }) => (reducers[type] ? reducers[type](state, payload) : state));
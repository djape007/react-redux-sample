// counter with hook, counter is just a number (no objects and stuff)
import store from './store';
import { useState, useLayoutEffect } from 'react';

const storeKey = 'counterWithHook';
const localStorageKey = storeKey; // or it can be something different from store key

const counterInitialValue = 0;

const stateFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
const initialState = stateFromLocalStorage ? stateFromLocalStorage : counterInitialValue;

const reducers = {
  setCounter: (oldState, count) => {
    localStorage.setItem(localStorageKey, JSON.stringify(count)); // not required, only for saving in local storage
    return count
  },
  increment: (oldState, newState) => {
    const newCounterValue = oldState + 1;
    localStorage.setItem(localStorageKey, JSON.stringify(newCounterValue));
    return newCounterValue;
  },
  reset: (oldState, newState) => {
    localStorage.setItem(localStorageKey, JSON.stringify(counterInitialValue));
    return counterInitialValue;
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

export const setCounter = (count) => store.dispatch({ type: 'setCounter', payload: count});

export const increment = () => store.dispatch({ type: 'increment'});

export const reset = () => store.dispatch({ type: 'reset'});

export const useCounter = () => {
  const [state, setState] = useState(getState());
  useLayoutEffect(() => subscribe(setState), [setState]);
  return state;
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey,
  (state = initialState,
    { type, payload }) => (reducers[type] ? reducers[type](state, payload) : state));
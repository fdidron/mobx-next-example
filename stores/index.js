// Helper file to construct a new Store on each server render
// Or to construct and return a singleton on browser renders
// Thanks to @impronunciable for pinpointing this requirement here :
// https://github.com/zeit/next.js/wiki/Redux-example
import User from './user';
import Todo from './todo';

const stores = {
  __userStore__: initialState => new User(initialState),
  __todoStore__: initialState => new Todo(initialState),
};

export default (store, initialState) => {
  const storeConstruct = stores[store];
  if (typeof window !== 'undefined') {
    if (!window[store]) {
      window[store] = storeConstruct(initialState);
    }
    return window[store];
  } else {
    return storeConstruct(initialState);
  }
};

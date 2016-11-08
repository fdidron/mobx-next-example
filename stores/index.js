import TodoStore from './todo.js';

const defaultState = {
  TodoStore: null
}

class Stores {
  constructor(initialState) {
    this.TodoStore = (initialState.TodoStore)
    ? TodoStore.fromJS(initialState.TodoStore)
    : new TodoStore();
  }

  getState() {
    return {
      TodoStore: this.TodoStore.toJS()
    };
  }
}

export default (isServer, initialState=defaultState) => {
  if(isServer) {
    return new Stores(initialState);
  }
  else {
    if(!window.__stores__){
      window.__stores__ = new Stores(initialState);
    }
    return window.__stores__;
  }
}
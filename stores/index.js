import TodoStore from './todo.js';

export default (isServer) => {
  if(isServer) {
    return {
      TodoStore: new TodoStore()
    }
  }
  else {
    if(!window.__stores__){
      window.__stores__ = {
        TodoStore: new TodoStore()
      }
    }
    return window.__stores__;
  }
}
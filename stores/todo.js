import { action, extendObservable } from 'mobx';
import Uuid from 'uuid';
import 'isomorphic-fetch';

class Todo {

  static fromJS(store, todo) {
    return new Todo(store, todo.id, todo.title, todo.completed);
  }

  constructor(store, id, title, completed) {
    this.store = store;
    this.id = id;
    extendObservable(this, {
      title,
      completed
    });
  }

  toggle = () => this.completed = !this.completed

  destroy = () => this.store.todos.remove(this)

  setTitle = title => this.title = title

  toJS = () => {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed
    };
  }
}

export default class TodoStore {

  static fromJS(initialState) {
    const todoStore = new TodoStore();
    todoStore.todos = initialState.map(todo => Todo.fromJS(todoStore, todo));
    return todoStore;
  }

  constructor() {
    extendObservable(this, {
      todos: [],
    });
  }

  fetchInitialTodos = () => {
    if(this.initialFetch == true) {
      return true;
    }
    return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(todos => {
      todos.forEach(todo => this.addTodo(todo.title))
      this.initialFetch = true;
    }
    )
  }

  addTodo = action( title =>
    this.todos.push(new Todo(this, Uuid.v4(), title, false))
  )

  toJS = () => this.todos.map(todo => todo.toJS())

}
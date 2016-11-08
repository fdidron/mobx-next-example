import { action, extendObservable } from 'mobx';
import Uuid from 'uuid';

class Todo {
  constructor(store, title, completed) {
    this.store = store;
    this.id = Uuid.v4();
    extendObservable(this, {
      title,
      completed
    });
  }

  static fromJS(store, object) {
    return new Todo(store, object.id, object.title, object.completed);
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
  constructor() {
    extendObservable(this, {
      todos: [],
    });
  }

  addTodo = action( title =>
    this.todos.push(new Todo(this, title, false))
  )
}
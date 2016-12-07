import { action, extendObservable } from 'mobx';
import Uuid from 'uuid';
import Axios from 'axios';

const API_BASE = 'https://mobx-next-todos.firebaseio.com/todos/';

class Todo {

  constructor(payload) {

    this.store = payload.store;
    this.id = payload.id;
    this.uid = payload.uid;
    this.photoURL = payload.photoURL;
    this.displayName = payload.displayName;
    this.createdAt = payload.createdAt;
    extendObservable(this, {
      title: payload.title,
      completed: payload.completed,
      loading: false
    });
    if( payload.persist === true ) {
      this.persistTodo();
    }
  }

  changeTitle = title => {
    this.title = title;
    this.persistTodo();
  }

  toggle = () => {
    this.completed = !this.completed;
    this.persistTodo();
  }

  destroy = async () => {
    this.loading = true;
    try {
      await Axios.delete(`${API_BASE}${this.id}.json`);
      this.store.todos.remove(this)
    }
    catch(e) {
      console.error(e.message);
    }
    this.loading = false;
  }

  setTitle = title => this.title = title

  persistTodo = async () => {
    this.loading = true;
    try {
      await Axios.put(`${API_BASE}${this.id}.json`, this.toJSON());
    }
    catch(e) {
      console.error(e.message);
    }
    this.loading = false;
  }

  toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
      photoURL: this.photoURL,
      displayName: this.displayName,
      uid: this.uid
    };
  }
}

export default class TodoStore {

  constructor(initialState) {
    extendObservable(this, {
      todos: [],
    });
    if(initialState) {
      initialState.forEach( todo => this.addTodo(Object.assign({}, todo, {store: this}), false) );
    }
  }

  fetchTodos = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE}.json?sortVyValue=createdAt`);
      this.todos = [];
      for (let id in data) {
        const todo = data[id];
        this.todos.push(new Todo(todo));
      }
    }
    catch(e) {
      console.error(e.message);
    }
  }

  addTodo = action( (todo, persist) => {
    const payload = Object.assign({}, todo, {
      store: this,
      id: todo.id || Uuid.v4(),
      completed: false,
      persist,
      createdAt: todo.createdAt || Date.now() * -1 //Allows DESC sorting when fetching the todos from Firebase
    });
    this.todos.push(new Todo(payload));
  })

  toJSON = () => this.todos.map(todo => todo.toJSON())

}
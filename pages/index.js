import React from 'react'
import { Provider } from 'mobx-react';
import Link from 'next/link';

import Stores from '../stores/index.js';
import TodoList from '../components/todo/list.js';

export default class extends React.Component {
    static async getInitialProps ({ req }) {
    const isServer = !!req;
    return {isServer};
  }

  constructor(props) {
    super(props);
    this.stores = Stores(props.isServer);
    //Todos added from the server get nixed on page change
    //Need to come up with an hydration process
    if(props.isServer) {
      this.stores.TodoStore.addTodo('1st Todo from the server');
      this.stores.TodoStore.addTodo('2nd Todo from the server');
    }
  }

  render () {
    return <Provider { ...this.stores }>
      <div>
        <h1>Todo List</h1>
        <TodoList />
        <Link href="/add"> Add a todo</Link>
      </div>
    </Provider>
  }
}
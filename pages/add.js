import React from 'react'
import { Provider } from 'mobx-react';
import Link from 'next/link';

import Stores from '../stores/index.js';
import AddTodo from '../components/todo/add.js';
import TodoList from '../components/todo/list.js';

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const isServer = !!req;
    const stores = Stores(isServer);
    await stores.TodoStore.fetchInitialTodos();
    return {initialState: stores.getState(), isServer};
  }

  constructor(props) {
    super(props);
    this.stores = Stores(props.isServer, props.initialState);
  }

  render () {
    return <Provider { ...this.stores }>
      <div>
        <h1>Add Todo</h1>
        <AddTodo />
        <Link href="/">I'm done !</Link>
        <hr />
        <TodoList />
      </div>
    </Provider>
  }
}
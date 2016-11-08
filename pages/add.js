import React from 'react'
import { Provider } from 'mobx-react';
import Link from 'next/link';

import Stores from '../stores/index.js';
import AddTodo from '../components/todo/add.js';
import TodoList from '../components/todo/list.js';

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const isServer = !!req;
    return {isServer};
  }

  constructor(props) {
    super(props);
    this.stores = Stores(props.isServer);
  }
  render () {
    return <Provider { ...this.stores }>
      <div>
        <h1>Add Todo</h1>
        <AddTodo />
        <TodoList />
        <Link href="/">I'm done !</Link>
      </div>
    </Provider>
  }
}
// The Page Hoc used to wrap all our Page components.
// It serves 3 main purposes :
// 1. Handles global styling
// 2. Handles global layout
// 3. Construct and provide the Mobx stores

import React from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import styleSheet from 'styled-components/lib/models/StyleSheet';

import App from '../primitives/app';
import Header from '../compositions/header';

import globalStyle from '../../utils/globalStyle';
import Stores from '../../stores/index.js';

export default ComposedComponent => class extends React.Component {
  static async getInitialProps(ctx) {
    let userState = null;
    const isServer = !!ctx.req;

    if (isServer === true) {
      const User = Stores('__userStore__');
      userState = User.getUserFromCookie(ctx.req);
    }

    const Todo = Stores('__todoStore__');
    await Todo.fetchTodos();
    const todoState = Todo.toJSON();
    return {
      isServer,
      userState,
      todoState,
    };
  }

  static prop

  constructor(props) {
    super(props);
    this.state = {
      stores: {
        user: Stores('__userStore__', props.userState),
        todo: Stores('__todoStore__', props.todoState),
      },
    };
  }

  render() {
    const styles = (this.props.isServer) ? styleSheet.rules().map(rule => rule.cssText).join('\n') : null;
    return (<Provider {...this.state.stores} >
      <App bgColor="#fdfdfd">
        <Head>
          <style>
            { globalStyle }
            { styles }
          </style>
        </Head>
        <Header />
        <ComposedComponent user={this.props} />
      </App>
    </Provider>);
  }
};

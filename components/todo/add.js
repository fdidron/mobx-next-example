import React from 'react';
import { observer } from 'mobx-react';

class AddTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    if(this.state.title !== '') {
      this.props.TodoStore.addTodo(this.state.title);
      this.setState({
        title: ''
      });
    }
  }

  handleUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render () {
    return <form onSubmit={ this.handleFormSubmit }>
      <input name="title" type="text" onChange={ this.handleUserInput } value={ this.state.title } />
    </form>
  }
}

export default observer(['TodoStore'], AddTodo);
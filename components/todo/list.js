import React from 'react';
import { observer } from 'mobx-react';


const Todo = (props) => <li>{ props.todo.title }</li>

class ListTodo extends React.Component {

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
    return <ol>
      { this.props.TodoStore.todos.reverse().map( todo => <Todo todo={ todo } key={ todo.id } /> )}
    </ol>;
  }
}

export default observer(['TodoStore'], ListTodo);
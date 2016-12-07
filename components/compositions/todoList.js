import React from 'react';
import { observer } from 'mobx-react';

import TodoContainer from '../primitives/todoContainer';
import Todo from './todo';

const TodoList = props => <TodoContainer>
  { props.todo.todos.reverse().map(todo =>
    <Todo owner={(todo.uid === props.user.uid)} todo={todo} key={todo.id} />) }
</TodoContainer>;

TodoList.propTypes = {
  todo: React.PropTypes.shape({
    todos: React.PropTypes.array,
  }),
  user: React.PropTypes.shape({
    uid: React.PropTypes.string,
  }),
};

export default observer(['user', 'todo'], TodoList);

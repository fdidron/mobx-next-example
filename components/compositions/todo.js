import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import Avatar from '../primitives/avatar';
import Row from '../primitives/row';

const StyledRow = styled(Row)`
  height: 55px;
  border-bottom: 1px solid rgba(0,0,0,0.3);
`;

const Body = styled.div`
  padding: 0px 10px;
  flex: 1;
  overflow-x: auto;
`

const Editable = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: none;
  font-size: 1em;
  padding: 10px;
  ${ props => (props.completed) ? 'text-decoration: line-through;' : ''}
  &:focus {
    background-color: #ffffe0;
    outline: 0;
  }
`

class Todo extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.todo.destroy();
  }

  handleTitleChange = (e) => {
    this.props.todo.changeTitle(e.target.value);
  }

  handleToggle = (e) => {
    e.preventDefault();
    this.props.todo.toggle();
  }

  render() {
    const editMenu = ( this.props.owner )
      ? <Row align="center">
          <a href="#" onClick={ this.handleToggle } >✔</a>
          <a href="#" onClick={ this.handleDelete } > ✘</a>
        </Row>
      : null;

    return (
      <StyledRow align="center" justify="space-between" padding="0px 10px">
        <Avatar alt={ this.props.todo.displayName } size="32px" src={ this.props.todo.photoURL} />
        <Body>
          <Editable
            defaultValue={ this.props.todo.title }
            disabled={ !this.props.owner || this.props.todo.completed }
            onBlur={ this.handleTitleChange }
            completed={ this.props.todo.completed }
          />
        </Body>
        { editMenu }
      </StyledRow>
    );
  }
}

export default observer(Todo);
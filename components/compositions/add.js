import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import AddIcon from 'react-icons/lib/go/diff-added';
import { observer } from 'mobx-react';


import Row from '../primitives/row';

const Input = styled.input`
  height: 35px;
  border: 1px solid rgba(0, 0, 0, .3);
  padding: 10px;
  font-size: 1.5em;
  flex: 1;
  &:disabled {
    background: #efefef;
    cursor: not-allowed;
  }
`
const Button = styled.button`
  height: 57px;
  border: 1px solid rgba(0, 0, 0, .3);
  border-left: none;
  font-size: 1.5em;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
`

class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    if(this.state.input !== '') {
      this.props.todo.addTodo({
        uid: this.props.user.uid,
        displayName: this.props.user.displayName,
        photoURL: this.props.user.photoURL,
        title: this.state.input
      }, true);
      this.setState({
        input: ''
      });
    }
  }

  handleUserInput = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    const placeholder = (this.props.user.auth === true)
    ? 'What needs to be done ?'
    : 'Please login first'
    return (
      <form onSubmit={ this.handleFormSubmit } disabled={ !this.props.user.auth }>
        <Row align="center" margin="55px 0px 0px">
            <Input
              value={ this.state.input }
              type="text"
              onChange={ this.handleUserInput }
              placeholder={ placeholder }
              disabled={ !this.props.user.auth }
              maxLength="80"
            />
            <Button>╋</Button>
        </Row>
      </form>
    );
  }
}

export default observer(['user', 'todo'], Add);

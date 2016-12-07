import React from 'react';

import Page from '../components/hoc/page';

import Add from '../components/compositions/add';
import TodoList from '../components/compositions/todoList';
import Content from '../components/primitives/content';

const AddPage = () => <Content>
  <Add />
  <TodoList />
</Content>;
export default Page(AddPage);

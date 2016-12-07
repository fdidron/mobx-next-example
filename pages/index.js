import React from 'react';
import Link from 'next/link';
import OctoIcon from 'react-icons/lib/go/mark-github';

import Page from '../components/hoc/page';

import TodoList from '../components/compositions/todoList';
import Content from '../components/primitives/content';
import P from '../components/primitives/paragraph';

const Index = () => <Content>
  <P align="justify">
  This is a proof of concept using mobx and next.js together.
  It uses Firebase for persistency and authentication (Using the Github Api).
  </P>
  <P align="justify">
  You can start by <Link href="add"><span>adding a todo</span></Link>.
  You will need to enter your <OctoIcon /> Github credentials first.
  </P>
  <TodoList />
</Content>;

export default Page(Index);

import React from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react';
import OctoIcon from 'react-icons/lib/go/mark-github';
import SignOut from 'react-icons/lib/go/sign-out';

import Row from '../primitives/row';
import Logo from '../primitives/logo';
import UserCard from './userCard';

const Header = (props) => {
  const rightColumn = (props.user.auth === true)
  ? (<Row align="center">
    <UserCard name={props.user.displayName} src={props.user.photoURL} size="32px" />
    <a href="signout" onClick={props.user.signOut}><SignOut /></a>
  </Row>)
  : (<Row align="center">
    <a href="signin" onClick={props.user.signInWithGithub}><OctoIcon /> Login</a>
  </Row>);

  return (
    <Row
      align="center"
      bgColor="#FFFFFF"
      height="60px"
      justify="space-between"
      padding="5px 10px"
    >
      <Logo><Link href="/">todos</Link></Logo>
      { rightColumn }
    </Row>
  );
};

Header.propTypes = {
  user: React.PropTypes.shape({
    auth: React.PropTypes.bool,
    displayName: React.PropTypes.string,
    photoURL: React.PropTypes.string,
    signOut: React.PropTypes.func,
    signInWithGithub: React.PropTypes.func,
  }),
};
export default observer(['user'], Header);

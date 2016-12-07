import React from 'react';
import styled from 'styled-components';

import Row from '../primitives/row';
import Avatar from '../primitives/avatar';

const Name = styled.p`
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
`;

const Card = props => <Row align="center">
  <Avatar size="32px" src={props.src} />
  <Name>{ props.name }</Name>
</Row>;

Card.propTypes = {
  src: React.PropTypes.string,
  name: React.PropTypes.string,
};

export default Card;

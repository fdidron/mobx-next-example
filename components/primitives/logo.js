import React from 'react';
import styled from 'styled-components';

export default styled.h1`
  font-size: 1.5em;
  margin: 0px;
  padding-right: 10px;
  &:before {
    content: '᚛ ';
    text-shadow: 1px 0px 3px rgba(150, 150, 150, 1);
  }
`;

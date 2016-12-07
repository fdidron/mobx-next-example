import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  align-items:      ${props => props.align};
  background-color: ${props => props.bgColor};
  display:          flex;
  height:           ${props => props.height};
  justify-content:  ${props => props.justify};
  margin:           ${props => props.margin};
  padding:          ${props => props.padding};
`;

Row.defaultProps = {
  align: 'flex-start',
  bgColor: 'transparent',
  height: 'auto',
  justify: 'flex-start',
  margin: '0px',
  padding: '0px',
};

export default Row;

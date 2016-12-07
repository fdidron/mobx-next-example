import React from 'react';
import styled from 'styled-components';

const Row = styled.p`
  text-align:      ${props => props.align};
`;

Row.defaultProps = {
  align: 'left',
};

export default Row;

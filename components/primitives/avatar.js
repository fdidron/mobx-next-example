import React from 'react';
import styled from 'styled-components';

const App = styled.img`
  width: ${props => props.size};
  border-radius: ${props => props.size};
`;

App.defaultProps = {
  size: '64px',
};

export default App;

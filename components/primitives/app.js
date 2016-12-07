import React from 'react';
import styled from 'styled-components';

const App = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100%;
  width: 100%;
`;

App.defaultProps = {
  bgColor: '#FFFFFF',
};

export default App;

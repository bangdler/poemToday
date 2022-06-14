import React from 'react';
import styled from "styled-components";
import {app} from './app.css'

function App() {
    return (<>
        <div className="app">React App</div>
    <StyledDiv>styled div</StyledDiv>
    </>)
}

const StyledDiv = styled.div`
  color: blue;
`

export default App;
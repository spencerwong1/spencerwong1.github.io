import logo from './logo.svg';
import './App.css';

import BasicButtons from './button.js';
import BasicButtonGroup from './buttongrp.js'
import Checkboxes from './checkbox.js'
import RadioButtonsGroup from './buttongrp.js'

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          spencer wong!!!
        </a>
        <BasicButtons></BasicButtons>
        <BasicButtonGroup></BasicButtonGroup>
        <Checkboxes></Checkboxes>
        <RadioButtonsGroup></RadioButtonsGroup>
      </header>

    </div>
  );
}

export default App;

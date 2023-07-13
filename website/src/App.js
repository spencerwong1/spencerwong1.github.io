import './App.css';

import BasicButtons from './components/button.js';
import BasicButtonGroup from './components/buttongrp.js'
import Checkboxes from './components/checkbox.js'
import RadioButtonsGroup from './components/buttongrp.js'
import BasicRating from './components/rating.js'

function App() {
  return (
    
    <div className="App">
     
        <h1>SPENCERS PERSONAL PROJECT</h1>

        <BasicButtons></BasicButtons>
        <BasicButtonGroup></BasicButtonGroup>
        <Checkboxes></Checkboxes>
        <RadioButtonsGroup></RadioButtonsGroup>
        <BasicRating></BasicRating>

    </div>
  );
}

export default App;

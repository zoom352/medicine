import React, { Component } from 'react';

import Home from './components/Home/Home'
import Appointments from './components/Appointments/Appointments'
import './App.scss';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Appointments/>
        <ul>
        
          </ul>
      </div>
    );
  }
}

export default App;
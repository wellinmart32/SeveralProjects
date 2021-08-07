import React, { Component } from 'react';
import './App.css';
import Element from './element.js';

class App extends Component {
  state = {
    Elements: Elements
  }

  addElement = (title, definition) => {
    const element = {
      title: title,
      definition: definition
    }
  }

  render () {
    return(
      <div>

      </div>
    )
  }
}

export default App;

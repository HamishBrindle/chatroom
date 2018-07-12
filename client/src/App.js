import React, { Component } from 'react';
import './App.css';

import Main from './components/Main';
import Nav from './components/Nav';

/**
 * Our big, special boy. One thing to note here is the global stylings
 * being applied as a result of importing App.css
 * 
 * I'll be honest, fixing up the stylesheets is a major TODO
 */
class App extends Component {

  render() {
    return (
        <div>
          <Nav />
          <Main />
        </div>
    );
  }

}

export default App

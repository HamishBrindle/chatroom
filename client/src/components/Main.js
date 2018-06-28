import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

import Home from './Home';
import Chat from './Chat';

class Main extends Component {

  render() {
    
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/rooms' component={Chat}/>
        </Switch>
      </main>
    )
  }

}

export default Main
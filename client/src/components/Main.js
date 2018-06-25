import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

import Home from './Home';
import { Chat } from '../containers/Chat';

class Main extends Component {

  render() {
    
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/room' component={Chat}/>
        </Switch>
      </main>
    )
  }

}

export default Main
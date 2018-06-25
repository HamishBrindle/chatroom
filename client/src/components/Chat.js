import React from "react"
import { Switch, Route } from 'react-router-dom'

import RoomList from './RoomList';
import { Room } from '../containers/Room';

const Chat = (props) => (
    <div id="container">
        <h1 className="app-header">React + AWS Chat</h1>
        <Switch>
            <Route exact path='/room' component={RoomList}/>
            <Route path='/room/:id' component={Room}/>
        </Switch>
    </div>
)

export default Chat
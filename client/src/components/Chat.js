import React from "react"
import { Switch, Route } from 'react-router-dom'

import { RoomList } from '../containers/RoomList';
import { Room } from '../containers/Room';

const Chat = (props) => (
    <div id="container">
        <h1 className="app-header">Yummy Chat</h1>
        <Switch>
            <Route exact path='/rooms' component={RoomList}/>
            <Route exact path='/rooms/:id' component={Room}/>
        </Switch>
    </div>
)

export default Chat
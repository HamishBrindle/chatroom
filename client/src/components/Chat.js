import React from "react"
import { Switch, Route } from 'react-router-dom'

import { RoomList } from '../containers/RoomList';
import { Room } from '../containers/Room';

import { withAuthenticator } from 'aws-amplify-react';

import '../style/Chat.css';

/**
 * Entire Chat instance including RoomList and Room
 */
const Chat = (props) => (
    <div className="container chat">

        <Switch>
            <Route exact path='/rooms' component={RoomList}/>
            <Route exact path='/rooms/:id' component={Room}/>
        </Switch>

        <div className="card note-to-users">
            <div className="card-header">
                Disclaimer
            </div>
            <div className="card-body">
                <h5 className="card-title">Hey! Please Note...</h5>
                <p className="card-text">
                This site is just an excercise in React/Redux, Node/WebSockets, and AWS/Serverless. 
                It's really not meant for much more than demonstrating functionality.
                <br/><br/>
                It's also a lot more functional on bigger screens: the messaging is hard to use on mobile.
                <br/><br/>
                - Hamish <span role="img" aria-label="my-heart">❤️</span></p>
            </div>
        </div>
        
    </div>
)

export default withAuthenticator(Chat, { includeGreetings: true });

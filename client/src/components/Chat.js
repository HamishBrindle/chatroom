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
            <div className="card-body">
                <h5 className="card-title">Before You Start</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        <p className="card-text">
                            <span className="badge badge-warning">Important</span>&nbsp;
                            <strong>
                                If you don't see yourself in the userlist, just give it a few seconds, 
                                it may be the free Heroku server warming up!
                            </strong>
                            <span role="img" aria-label="my-heart">🙏🙏🙏</span>
                        </p>
                    </li>
                    <li className="list-group-item">
                        <p className="card-text">
                            <span className="badge badge-success">Note</span>&nbsp;
                            This site is just an excercise in React/Redux, Node/WebSockets, and AWS/Serverless. 
                            It's really not meant for much more than demonstrating functionality.
                        </p>
                    </li>
                    
                    <li className="list-group-item">
                        <p className="card-text">
                            <span className="badge badge-success">Note</span>&nbsp;
                            It's also a lot more functional on bigger screens: the messaging 
                            is hard to use on mobile.
                            <span role="img" aria-label="my-heart">😅</span>                            
                        </p>
                    </li>
                </ul>
                <br/><br/>
                <p className="card-text">- Hamish <span role="img" aria-label="my-heart">❤️</span></p>
            </div>
        </div>
        
    </div>
)

export default withAuthenticator(Chat, { includeGreetings: true });

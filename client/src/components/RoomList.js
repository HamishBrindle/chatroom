import React from "react";
import axios from 'axios';

import '../style/RoomList.css';

import RoomListItem from './RoomListItem';

class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.populateRoomsList = this.populateRoomsList.bind(this);
        this.roomSelect = this.roomSelect.bind(this);
        this.endpoint = 'https://y6bzexjalj.execute-api.us-east-1.amazonaws.com/dev/rooms'; // PUT THIS ENV
    }

    componentDidMount() {
        console.log("Populating Room List")
        this.populateRoomsList();
    }

    populateRoomsList() {
        console.log(`Fetching room list from ${this.endpoint}`);
        axios.get(this.endpoint)
            .then(response => {
                const data = response.data;
                this.props.populateRoomsList(data);
            })
            .catch(err => {
                console.log(`There was a fucking error: ${err}`);
            });
    }

    roomSelect(room) {
        this.props.history.push(`room/${room}`);
    }

    render() {
        return (
            <div>     

                <div className="alert alert-primary" role="alert">
                    <strong>Pick a room you'd like to to join!</strong>
                </div>

                <div className="msger">
                    <header className="msger-header">
                        <div className="msger-header-title">
                            <i className="fas fa-comment-alt"></i> Rooms
                        </div>
                        <div className="msger-header-options">
                            <span>
                                <i className="fas fa-cog"></i>
                            </span>
                        </div>
                    </header>
                    <main className="msger-chat">
                        <ul className="list">
                            {this.props.rooms.map(room => (
                                <RoomListItem key={room} onClick={this.roomSelect} room={room}/>
                            ))}
                        </ul>
                    </main>
                </div>
            </div>

            
        )
    }
}

export default RoomList
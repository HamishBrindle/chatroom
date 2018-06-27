import React from "react";

import getColor from '../utils/color'

import '../style/RoomList.css';

class RoomListItem extends React.Component {

    render() {
        return (
            <li onClick={() => this.props.onClick(this.props.room)}>
                <div className="valign-wrapper room">
                    <div className="room-icon" style={{ backgroundColor: '#' + getColor(this.props.room)}}></div>
                    <div className="room-title">
                        {this.props.room}
                    </div>
                    <p className="room-info">(Active Users)</p>
                </div>
                <hr className="list-divider"/>
            </li>
        )
    }
}

export default RoomListItem
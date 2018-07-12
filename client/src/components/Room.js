import React from "react"
import { UserList } from "../containers/UserList"
import { MessagesList } from "../containers/MessagesList"
import { AddMessage } from "../containers/AddMessage"
import { Link } from 'react-router-dom'
import '../style/Room.css';
import { Auth } from 'aws-amplify';

/**
 * Room contains MessagesList, AddMessage, and the UserList. It also dispatches
 * our Socket connection action (Sockets are only made inside individual rooms).
 */
class Room extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            userLoaded: false
        }
    }

    componentWillUnmount() {
        // console.log('Room: componentWillUnmount: Leaving room.');
        this.props.disconnectSocket(this.props.room);
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
            .then(res => {
                this.setState({ userName: res.username, userLoaded: true })
            });
    }

    componentDidUpdate() {
        if (this.state.userLoaded === true) {
            this.props.connectSocket(this.state.userName, this.props.room);
        }     
    }

    /**
     * Routes user back a page.
     */
    goBack() {
        this.props.history.goBack();   
    }

    render() {
        return (
            <div className="chat-window">
                <section className="msger">
                    <header className="msger-header">
                        <div className="msger-header-title">
                            <i className="fas fa-comment-alt"></i> Room: { this.props.room } {/* TODO: Introduce room selection */}
                        </div>
                        <div className="msger-header-options">
                            <span>
                                <i className="fas fa-cog"></i>
                            </span>
                        </div>
                    </header>
                    <main className="msger-chat">
                        <MessagesList />
                    </main>
                    {/* <AddMessage room={this.props.room} socket={this.socket}/> */}
                    <AddMessage room={this.props.room} />
                    <div className="user-list">
                        <header className="msger-header">
                            <div className="msger-header-title">
                                <i className="fas fa-comment-alt"></i>Online Users
                            </div>
                            <div className="msger-header-options">
                                <span>
                                    <i className="fas fa-cog"></i>
                                </span>
                            </div>
                        </header>
                        <UserList />
                    </div>
                </section>
                <Link to="/rooms"><button className="btn btn-success btn-lg btn-back">Back To Roomlist</button></Link>             
            </div>
        );
    }
}

export default Room
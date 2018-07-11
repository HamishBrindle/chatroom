import React from "react"

import { UserList } from "../containers/UserList"
import { MessagesList } from "../containers/MessagesList"
import { AddMessage } from "../containers/AddMessage"

import '../style/Room.css';

import { Auth } from 'aws-amplify';

class Room extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            userLoaded: false
        }
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
                <button className="btn btn-primary btn-lg btn-back" onClick={this.goBack.bind(this)}>Back To Roomlist</button>                
            </div>
        );
    }
}

export default Room
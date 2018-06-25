import React from "react"
import { Sidebar } from "../containers/Sidebar"
import { MessagesList } from "../containers/MessagesList"
import { AddMessage } from "../containers/AddMessage"

class Room extends React.Component {

    render() {
        return (
            <div>
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
                <AddMessage room={this.props.room}/>
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
                    <Sidebar />
                </div>
                </section>
            </div>
        );
    }
}

export default Room
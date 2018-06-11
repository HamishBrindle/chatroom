import React, { Component } from 'react';
import './App.css';

import { Sidebar } from "./containers/Sidebar"
import { MessagesList } from "./containers/MessagesList"
import { AddMessage } from "./containers/AddMessage"

class App extends Component {

  render() {
    return (
      
      <div id="container">
        <h1 className="app-header">React + AWS Chat</h1>
        <section className="msger">
           <header className="msger-header">
              <div className="msger-header-title">
                  <i className="fas fa-comment-alt"></i> Room: all
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
           <AddMessage />
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

export default App;

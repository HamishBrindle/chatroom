import React, { Component } from 'react';
import './App.css';

import { Sidebar } from "./containers/Sidebar"
import { MessagesList } from "./containers/MessagesList"
import { AddMessage } from "./containers/AddMessage"

class App extends Component {

  render() {
    return (
      
      <div id="container">
        
        <section className="msger">
          <header className="msger-header">
              <div className="msger-header-title">
                  <i className="fas fa-comment-alt"></i> React + AWS Chat
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
        </section>

      </div>
    );
  }

}

export default App;

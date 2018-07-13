import React, { Component } from 'react'

import '../style/Nav.css'
import '../style/Hamburger.css'

/**
 * Nav is the navigation but pretty much just contains a little bit about
 * the author and the chat, as well as some social links.
 */
export default class Nav extends Component {

    constructor() {
        super();

        this.state = {
            isActive: ''
        }

        this.toggleHamburger = this.toggleHamburger.bind(this);
    }

    /**
     * Clears className of 'is-active' from the hamburger to give animation
     */
    toggleHamburger() {
        if (this.state.isActive === 'is-active')
            this.setState({ isActive: '' });
        else
            this.setState({ isActive: 'is-active' });
            
    }

  render() {
    return (
        <div>
            <div className="collapse bg-colored" id="navbarHeader">
                <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                        <h4 className="text-white orange-juice"><strong>About This Chat</strong></h4>
                        <p className="text-white">My name is Hamish and I'm a student. I made this in hopes of snagging a summer job for a development company! It's not much, but I had fun making it :)</p>
                        <p className="text-white">This chat app features AWS for storing messages, rooms, as well as keeping track of users and Auth. I'm using React/Redux in combination with a Node.js WebSocket server.</p>
                    </div>
                    <div className="col-sm-4 offset-md-1 py-4">
                        <h4 className="text-white orange-juice"><strong>Contact</strong></h4>
                        <ul className="list-unstyled">
                            <li><a className="text-white" href="https://twitter.com/hamishbrindle">Twitter</a></li>
                            <li><a className="text-white" href="https://github.com/HamishBrindle/">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            <div className="navbar navbar-dark bg-colored box-shadow">
                <div className="container d-flex justify-content-between">
                <a href="/" className="navbar-brand">
                    <img src={require("../assets/icecream.svg")} alt="Pic of chat"/>
                    <strong>YC</strong>
                </a>
                <button onClick={this.toggleHamburger} className={`hamburger hamburger--squeeze ${this.state.isActive}`} type="button" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>

                </div>
            </div>
        </div>
    )
  }
}

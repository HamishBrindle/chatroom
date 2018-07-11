import React, { Component } from 'react'

import '../style/Nav.css'

console.log(require("../assets/icecream.svg"))

export default class Nav extends Component {


  render() {
    return (
        <div>
            <div className="collapse bg-green" id="navbarHeader">
                <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                    <h4 className="text-white"><strong>About This Chat</strong></h4>
                    <p className="text-white">My name is Hamish and I'm a student. I made this in hopes of snagging a summer job for a development company! It's not much, but I had fun making it :)</p>
                    </div>
                    <div className="col-sm-4 offset-md-1 py-4">
                    <h4 className="text-white"><strong>Contact</strong></h4>
                    <ul className="list-unstyled">
                        <li className="text-white"><a href="https://twitter.com/hamishbrindle">Twitter</a></li>
                        <li className="text-white"><a href="https://github.com/HamishBrindle/">GitHub</a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            <div className="navbar navbar-dark bg-green box-shadow">
                <div className="container d-flex justify-content-between">
                <a href="/" className="navbar-brand">
                    <img src={require("../assets/icecream.svg")} alt="Pic of chat"/>
                    <strong>YC</strong>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                </div>
            </div>
        </div>
    )
  }
}

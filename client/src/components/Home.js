import React from "react";
import { Link } from "react-router-dom"

/**
 * Our front-page of the app
 */
const Home = () => (
  <div className="container">
    <div className="row">

      <div className="col-md-6 col-sm-12">
        <div className="card">
          <div className="card-header">
            <h3><strong>Welcome to Yummy Chat!</strong></h3>
          </div>
          <div className="card-body">
            <p className="card-title">To enter a chatroom, please login.</p>
            <Link to="/rooms"><button className="btn btn-success btn-lg btn-join">Join Chatrooms</button></Link>            
            <p>And if you don't want to use Amazon's Amplify login system, <strong>use the following credentials for our guest account:</strong></p>
            <hr />

            <div className="credentials">
              <img src={require("../assets/icecream_pink.svg")} alt="Icecream"/>
              <blockquote className="blockquote">
                <p><strong>Username</strong>: yummyGuest</p>
                <p><strong>Password</strong>: TheYummiest1</p>
              </blockquote> 
            </div>
            <hr/>
            <p className="card-text">
              If you want to take a look at any of the code, it's all on my Github. 
              Let me know what you think (be gentle, it's my first React App! 
              <span role="img" aria-label="my-prayers"> 🙏 </span>
            </p>
            <a href="https://github.com/HamishBrindle/chatroom/" target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg btn-repo">See Repo</a>
      
          </div>
        </div>
      </div>

      <div className="col-md-6 col-sm-12">
        <div className="main-image">
          <img src={require("../assets/chatroom-pic.PNG")} alt="Pic of chat"/>
          <div className="color-overlay"></div>
          <p>Let's talk food!</p>
        </div>
      </div>

    </div>
  </div>
)

export default Home

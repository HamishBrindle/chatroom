import React from "react";
import { Link } from "react-router-dom"

const Home = () => (
  <div className="container">
    <div className="row">

      <div className="col-md-6 col-sm-12">
        <div className="landing-card">
          <h3><strong>Welcome to Yummy Chat!</strong><br />To enter a chatroom, please login.</h3>
          <Link to="/rooms"><button className="btn btn-success btn-lg btn-join">Join Chatrooms</button></Link>
        </div>
      </div>

      <div className="col-md-6 col-sm-12">
        <div className="main-image">
          <div className="color-overlay"></div>
          <p>Let's talk food!</p>
          <img src={require("../assets/chatroom-pic.PNG")} alt="Pic of chat"/>
        </div>
      </div>

    </div>
    <div className="row">

      <div className="col-md-12 col-sm-12 col-lg-12 social-card">
        <div class="card github">
          <div class="card-header">
            Check Out The Code
          </div>
          <div class="card-body">
            <h5 class="card-title">Everything is on Github</h5>
            <p class="card-text">
              If you want to take a look at any of the code, it's all on my Github. 
              Let me know what you think (be gentle, it's my first React App!
              <br/>
              <span role="img" aria-label="my-prayers">🙏🙏🙏</span>
            </p>
            <a href="https://github.com/HamishBrindle/chatroom/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">See Repo</a>
          </div>
        </div>
      </div>

   </div>
  </div>
)

export default Home

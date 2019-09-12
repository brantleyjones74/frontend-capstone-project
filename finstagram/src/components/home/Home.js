import React, { Component } from "react";
import { Link } from "react-router-dom";
import Profile from "../profile/ProfileCard";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>This is the home page.</h1>
        <Link to="/creels">Creels</Link>
        <Profile />
        <br />
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>This is the home page.</h1>
        <Link to="/creels">Creels</Link>
        <br />
        <Link to="/fish">Fish</Link>
      </div>
    );
  }
}

export default Home;

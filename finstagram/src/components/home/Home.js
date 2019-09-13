import React, { Component } from "react";
import CreelList from "../creel/CreelList";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>This is the home page.</h1>
        <CreelList {...this.props} />
        <br />
      </div>
    );
  }
}

export default Home;

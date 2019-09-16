import React, { Component } from "react";
import ProfileCard from "../profile/ProfileCard";
class Home extends Component {
  render() {
    return (
      <div>
        <h1>This is the home page.</h1>
        <ProfileCard {...this.props} />
        <br />
      </div>
    );
  }
}

export default Home;

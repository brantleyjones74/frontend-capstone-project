// Purpose: Renders the NavBar and Application Views components

import React, { Component } from "react";
// import the NavBar component
import NavBar from "./navbar/Navbar";
// imports ApplicationViews component
import ApplicationViews from "./ApplicationViews";
// import css
import "./Finstagram.css";

class Finstagram extends Component {
  // dummy state data
  // function that changes state trigger state true/false
  // pass this function to navbar for logout
  // after logout invoke function

  isUserAuthenticated = () => sessionStorage.getItem("activeUser") !== null;

  state = {
    logout: false
  };

  changeLogoutState = () => {
    this.setState({
      logout: !this.state.logout
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* inject the NavBar comopnent */}
        <NavBar
          changeLogoutState={this.changeLogoutState}
          userAuthenticated={this.isUserAuthenticated}
        />
        {/* inject the AppViews component */}
        <ApplicationViews changeLogoutState={this.changeLogoutState} />
      </React.Fragment>
    );
  }
}

export default Finstagram;

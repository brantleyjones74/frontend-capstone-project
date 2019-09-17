// Purpose: Renders the NavBar and Application Views components

import React, { Component } from "react";
// import the NavBar component
import NavBar from "./navbar/Navbar";
// imports ApplicationViews component
import ApplicationViews from "./ApplicationViews";
// import css
import "./Finstagram.css";

class Finstagram extends Component {
  render() {
    return (
      <React.Fragment>
        {/* inject the NavBar comopnent */}
        <NavBar />
        {/* inject the AppViews component */}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Finstagram;

import React, { Component } from "react";
import ApplicationViews from "./ApplicationViews";
import NavBar from "./navbar/Navbar";
import "./Finstagram.css";

class Finstagram extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Finstagram;

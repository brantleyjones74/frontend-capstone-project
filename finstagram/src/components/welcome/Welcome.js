import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Register from "../auth/Register";

class Welcome extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Welcome To Finstagram</h1>
        </div>
        <section>
          <Link to="/register">Register</Link>
        </section>
        or
        <section>
          <Link to="/login">Login</Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Welcome;

// Purpose: Sets the routes for the different pages that can be viewed in the app.

import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Welcome from "./welcome/Welcome";
// imports register component
import Register from "./auth/Register";
// import Login component
import Login from "./auth/Login";

class ApplicationViews extends Component {
  // function that checks to see if the user is logged in and stored in session storage
  isUserAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
  // function that converts the activeUser value in session storage to an integer
  activeUser = () => parseInt(sessionStorage.getItem("activeUser"));

  render() {
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* if the user is logged in then the Home componenet is rendered. if not then the welcome component is rendered where the can choose to login or create an account. */}
        <Route
          exact
          path="/"
          render={props => {
            if (this.isUserAuthenticated()) {
              return <Home />;
            } else {
              return <Welcome />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;

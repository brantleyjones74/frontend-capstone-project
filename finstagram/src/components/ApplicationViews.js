// Purpose: Sets the routes for the different pages that can be viewed in the app.

import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Register from "./auth/Register";

export default class ApplicationViews extends Component {
  // function that checks to see if the user is logged in and stored in session storage
  isUserAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
  // function that converts the activeUser value in session storage to an integer
  activeUser = () => parseInt(sessionStorage.getItem("activeUser"));

  render() {
    // logs the activeUser id value in the console
    console.log(this.activeUser());

    return (
      <React.Fragment>
        {/* if the user is logged in then the Home componenet is rendered. if not then the user is redirected to the welcome page where they can choose to login or create an account. */}
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

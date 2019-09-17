// Purpose: Sets the routes for the different pages that can be viewed in the app. When the page is visited it renders the component.

import { Route } from "react-router-dom";
import React, { Component } from "react";
// import the Home component
import Home from "./home/Home";
// import the Welcome component
import Welcome from "./welcome/Welcome";
// imports register component
import Register from "./auth/Register";
// import Login component
import Login from "./auth/Login";
// import CreelList component
import CreelList from "./creel/CreelList";
// import FishList component
import FishList from "./fish/FishList";
// import Profile components
import ProfileList from "./profile/ProfileList";
import ProfileCard from "./profile/ProfileCard";

export default class ApplicationViews extends Component {
  // function that checks to see if the user is logged in and stored in session storage
  isUserAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
  // function that converts the activeUser value in session storage to an integer
  activeUser = () => parseInt(sessionStorage.getItem("activeUser"));
  // if true it's the active user's data, if false it will only display other users info
  userpage = true;

  render() {
    return (
      <React.Fragment>
        {/* routes user to Register page and injects the Register component */}
        <Route path="/register" component={Register} />
        {/* routes user to login page and injects the Login component */}
        <Route path="/login" component={Login} />

        {/* route if the user is authenticated render the Home Component otherwise render the Welcome comopnent */}
        <Route
          exact
          path="/"
          render={props => {
            if (this.isUserAuthenticated()) {
              return (
                <Home
                  // pass activeUser, userpage, userId, and props into the Component
                  activeUser={this.activeUser}
                  userpage={this.userpage}
                  userId={parseInt(props.match.params.userId)}
                  {...props}
                />
              );
            } else {
              return <Welcome />;
            }
          }}
        />

        {/* route to render a specific CreelList component for a user */}
        <Route
          exact
          path="/creels"
          render={props => {
            return (
              <CreelList
                // pass activeUser, userpage, and props into the Component
                userpage={this.userpage}
                activeUser={this.activeUser}
                {...props}
              />
            );
          }}
        />

        {/* Route that renders the details of a creel with the FishList component */}
        <Route
          exact
          path="/creels/:creelId(\d+)"
          render={props => {
            return (
              <FishList
                userpage={this.userpage}
                // pass activeUser, creelId, and props into the Component
                activeUser={this.activeUser}
                {...props}
                // parses the creelId to an integer
                creelId={parseInt(props.match.params.creelId)}
              />
            );
          }}
        />

        {/* route that renders the ProfileList component */}
        <Route
          exact
          path="/users"
          render={props => {
            return (
              <ProfileList
                // passes activeUser and props into the component
                activeUser={this.activeUser}
                {...props}
              />
            );
          }}
        />

        {/* route that renders the ProfileCard component of a specific user. */}
        <Route
          exact
          path="/users/:userId(\d+)"
          render={props => {
            return (
              <ProfileCard
                // pass activeUser, props, and userId into the component
                activeUser={this.activeUser}
                {...props}
                // parses userId to an integer
                userId={parseInt(props.match.params.userId)}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

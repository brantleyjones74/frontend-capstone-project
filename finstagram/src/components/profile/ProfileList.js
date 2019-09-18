// Purpose: Export ProfileList Component that fetches all users, maps over them and passes the data into the ProfileViewList component

import React from "react";
import { ListGroup } from "reactstrap";
import ProfileListView from "./ProfileListView";
import UserManager from "../../modules/UserManager";
import FollowManager from "../../modules/FollowManager";

export default class ProfileList extends React.Component {
  // set initial state
  state = {
    users: []
  };

  // fetchAllUsers function that gets the users from the database and then sets state with the data
  fetchAllUsers = () => {
    UserManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  };

  // new follow
  addNewFollow = (obj) => {
    FollowManager.addNewFollow(obj);
  };

  // invokes fetchAllUsers when component is mounted into the route tree
  componentDidMount() {
    this.fetchAllUsers();
  }

  render() {
    return (
      <div>
        <h3>Users </h3>
        <ListGroup>
          {/* map over state and create a new array return ProfileListView and pass users.id and users */}
          {this.state.users.map(users => {
            return (
              <ProfileListView
                key={users.id}
                users={users}
                // addNewFollow={this.addNewFollow}
                // {...this.props}
              />
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

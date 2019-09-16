// Purpose: Creates a list to display all profile cards.

import React from "react";
import { ListGroup } from "reactstrap";
import ProfileListView from "./ProfileListView";
import UserManager from "../../modules/UserManager";

export default class Example extends React.Component {
  state = {
    users: []
  };

  fetchAllUsers = () => {
    UserManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  };

  componentDidMount() {
    this.fetchAllUsers();
  }

  render() {
    return (
      <div>
        <h3>Users </h3>
        <ListGroup>
          {this.state.users.map(users => {
            return (
              <ProfileListView
                key={users.id}
                users={users}
                editUser={this.editUser}
                {...this.props}
              />
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

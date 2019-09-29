import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserManager from "../../modules/UserManager";
import ConnectionManager from "../../modules/ConnectionManager";
import FollowListView from "../home/FollowListView";

export default class FollowList extends Component {
  state = {
    users: []
  };

  // fetch all users for followers
  fetchUsers = () => {
    UserManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
      console.log(this.state.users);
    });
  };

  componentDidMount() {
    this.fetchUsers();
  }

  unfollowUser = id => {
    ConnectionManager.deleteConnection(id).then(() => {
      this.fetchUsers();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.users.map(users => {
            return (
              <FollowListView
                key={users.id}
                unfollowUser={this.unfollowUser}
                users={users}
                {...this.props}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

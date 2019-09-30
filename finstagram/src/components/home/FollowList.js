import React, { Component } from "react";
import UserManager from "../../modules/UserManager";
import ConnectionManager from "../../modules/ConnectionManager";
import FollowListView from "../home/FollowListView";

export default class FollowList extends Component {
  state = {
    users: [],
    connections: []
  };

  // fetch users
  fetchUsers = () => {
    UserManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  };

  // fetch all users for followers
  fetchConnections = () => {
    ConnectionManager.getConnections(this.props.activeUser()).then(
      connections => {
        this.setState({
          connections: connections
        });
      }
    );
  };

  componentDidMount() {
    this.fetchUsers();
    this.fetchConnections();
  }

  // unfollow user
  unfollowUser = id => {
    ConnectionManager.deleteConnection(id).then(() => {
      this.fetchConnections();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.users.map(user => {
            return (
              <FollowListView
                key={user.id}
                unfollowUser={this.unfollowUser}
                user={user}
                connection={this.state.connections}
                {...this.props}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

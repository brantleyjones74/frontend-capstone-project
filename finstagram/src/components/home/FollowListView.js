import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default class FollowListView extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.users.id === this.props.connections.otherUserId ? (
          <React.Fragment>
            <Link to={`/users/${this.props.users.id}`}>
              <Button>View Profile</Button>
            </Link>
            <Button
              onClick={() => this.props.unfollowUser(this.props.connections.id)}
            >
              Unfollow
            </Button>
            <div>{this.props.users.username}</div>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

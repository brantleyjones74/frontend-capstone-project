// Purpose: Export the ProfileListView (lists a summary of users) Component

import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Card, CardTitle, CardText } from "reactstrap";
import "../profile/ProfileListView.css";

export default class ProfileListView extends React.Component {
  // WORKING ON FOLLOWING FOR STRETCH GOAL.
  state = {
    follow: [],
    userId: "",
    otherUserId: "",
    timeStamp: Date.now()
  };

  // followUser = evt => {
  //   evt.preventDefault();
  //   const newFollowObj = {
  //     userId: this.props.activeUser(),
  //     otherUserId: this.props.userId
  //   };
  //   this.props.addNewFollow(newFollowObj);
  // };

  render() {
    return (
      <Container id="cardContainer">
        <Card className="profileSummaryCard">
          <CardTitle>
            {/* renders first and last name of users through props */}
            {this.props.users.firstName} {this.props.users.lastName}
          </CardTitle>
          {/* renders username through props */}
          <CardText>Username: {this.props.users.username}</CardText>
          <CardText>
            Location: {this.props.users.city}, {this.props.users.state}
          </CardText>
          {/* Nest a Button inside of a Link that routes active user to a specific user's profile using the id of the user */}
          <Link {...this.props} to={`/users/${this.props.users.id}`}>
            <Button>View Profile</Button>
          </Link>
          {/* Eventually this will allow active user to follow another user STRETCH */}
          <Button>Follow</Button>
        </Card>
      </Container>
    );
  }
}

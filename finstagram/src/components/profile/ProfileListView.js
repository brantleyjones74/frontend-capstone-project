// Purpose: Export the ProfileListView (lists a summary of users) Component

import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Card, CardTitle, CardText } from "reactstrap";
import "../profile/ProfileListView.css";
import FollowManager from "../../modules/FollowManager";

export default class ProfileListView extends React.Component {
  // set initial state
  state = {
    follow: [],
    userId: "",
    otherUserId: "",
    timeStamp: Date.now()
  };

  // FOLLOWING FOR STRETCH GOAL
  // function that makes a new follow connection
  followUser = evt => {
    evt.preventDefault();
    // create new object to pass through addNewFollow
    const newFollowObj = {
      userId: this.props.activeUser(),
      otherUserId: this.props.users.id,
      timeStamp: Date.now()
    };
    // invokes addNewFollow method from FollowManager module.
    FollowManager.addNewFollow(newFollowObj).then(
      FollowManager.getFollowers(
        this.props.activeUser(),
        this.props.users.id
      ).then(follow => {
        this.setState({
          follow: follow
        });
        console.log(this.state);
      })
    );
  };

  // function that checks for followers
  // console logged response and state was only empty arrays
  // checkFollow = () => {
  //   FollowManager.getFollowers(
  //     this.props.activeUser(),
  //     this.props.users.id
  //   ).then(follow => {
  //     this.setState({
  //       follow: follow
  //     });
  // console.log(this.state)
  //   });
  // };

  componentDidMount() {
    // this.checkFollow();
  }

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
          <Link to={`/users/${this.props.users.id}`}>
            <Button>View Profile</Button>
          </Link>
          {/* CONDITIONAL RENDERING OF BUTTON */}
          {/* {this.props.userpage ? (
          ) : this.state.follow.userId === this.props.activeUser() ? (
          ) : (
            ""
          )} */}
          <Button onClick={this.followUser}>Follow</Button>
        </Card>
      </Container>
    );
  }
}

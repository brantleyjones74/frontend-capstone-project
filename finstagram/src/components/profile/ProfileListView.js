// Purpose: Export the ProfileListView (lists a summary of users) Component

import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Container,
  Card,
  CardTitle,
  CardText
} from "reactstrap";
import "../profile/ProfileListView.css";
import ConnectionManager from "../../modules/ConnectionManager";

export default class ProfileListView extends React.Component {
  // set initial state
  state = {
    follow: [],
    userId: "",
    otherUserId: ""
  };

  // FOLLOWING FOR STRETCH GOAL
  // function that makes a new follow connection
  followUser = evt => {
    evt.preventDefault();
    // create new object to pass through addNewFollow
    const newConnectionObj = {
      userId: this.props.activeUser(),
      otherUserId: this.props.users.id,
      timeStamp: Date.now()
    };
    // invokes addNewFollow method from FollowManager module.
    ConnectionManager.addNewConnection(newConnectionObj);
  };

  render() {
    return (
      <Container id="cardContainer">
        <Card className="profileSummaryCard">
          {/* don't render active user */}
          {this.props.activeUser() === this.props.user.id ? (
            ""
          ) : (
            <div>
              <CardTitle>{this.props.user.username}</CardTitle>
              <CardText>
                {this.props.user.city}
                {this.props.user.state}
              </CardText>
              <Row>
                {/* Nest a Button inside of a Link that routes active user to a specific user's profile using the id of the user */}
                <Col sm={4}>
                  <Link to={`/users/${this.props.user.id}`}>
                    <Button size="sm">View</Button>
                  </Link>
                </Col>
                <Col sm={4}>
                  {this.props.user.friend ? (
                    ""
                  ) : (
                    <Button size="sm" onClick={this.followUser}>
                      Follow
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Card>
      </Container>
    );
  }
}

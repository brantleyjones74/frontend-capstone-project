// Purpose: Display a summary of data of all users.

import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Card, CardTitle, CardText } from "reactstrap";

export default class ProfileCard extends React.Component {
  render() {
    return (
      <Container>
        <Card>
          <CardTitle>
            {this.props.users.firstName} {this.props.users.lastName}
          </CardTitle>
          <CardText>Username: {this.props.users.username}</CardText>
          <CardText>
            Location: {this.props.users.city}, {this.props.users.state}
          </CardText>
          <Link {...this.props} to={`/users/${this.props.users.id}`}>
            <Button>View Profile</Button>
          </Link>
          <Button>Follow</Button>
        </Card>
      </Container>
    );
  }
}

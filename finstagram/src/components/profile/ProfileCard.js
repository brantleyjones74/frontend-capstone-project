// Purpose: Display user data on a profile page.

import React from "react";
import { Container, Card, CardTitle, CardText } from "reactstrap";

export default class ProfileCard extends React.Component {
  state = {};

  render() {
    return (
      <Container>
        <Card>
          <CardTitle>
            {this.props.users.firstName} {this.props.users.lastName}
          </CardTitle>
          <CardText>Username: {this.props.users.username}</CardText>
        </Card>
      </Container>
    );
  }
}

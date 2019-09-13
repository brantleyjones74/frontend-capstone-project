import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import UserManager from "../../modules/UserManager";

export default class ProfileCard extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    bio: "",
    photoUrl: ""
  };

  componentDidMount() {
    UserManager.getUsers(this.props.userId).then(user => {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        city: user.city,
        state: user.state
      });
    });
  }

  render() {
    return (
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle className="text-danger">{this.state.username}</CardTitle>
            <CardText className="text-danger">
              {this.state.firstName} {this.state.lastName}
              <br />
              {this.state.city}, {this.state.state}
              <br />
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}

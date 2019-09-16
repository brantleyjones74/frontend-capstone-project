import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
  Card,
  // CardImg,
  // Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import ProfileEditModal from "../profile/ProfileEditModal";
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

  fetchActiveUser = () => {
    UserManager.getUsers(this.props.activeUser()).then(user => {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        city: user.city,
        state: user.state,
        bio: user.bio,
        photoUrl: user.photoUrl
      });
    });
  };

  componentDidMount() {
    this.fetchActiveUser();
  }

  editUser = (obj, id) => {
    return UserManager.updateUser(obj, id).then(() => {
      this.fetchActiveUser();
    });
  };

  render() {
    return (
      <Row>
        <Col sm="6">
          <Card body>
            <ProfileEditModal editUser={this.editUser} {...this.props} />
            <CardTitle className="text-danger">{this.state.username}</CardTitle>
            <CardText className="text-danger">
              {this.state.firstName} {this.state.lastName}
              <br />
              {this.state.city}, {this.state.state}
              <br />
              {this.state.bio}
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}

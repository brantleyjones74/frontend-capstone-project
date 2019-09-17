import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  // Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import UserManager from "../../modules/UserManager";
import ProfileEditModal from "../profile/ProfileEditModal";
import CreelList from "../creel/CreelList";

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
    console.log(obj);
    return UserManager.updateUser(obj, id).then(() => {
      this.fetchActiveUser();
    });
  };

  userpage = false;

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="6">
            <Card body>
              <ProfileEditModal editUser={this.editUser} {...this.props} />
              <CardImg src={this.state.photoUrl}></CardImg>
              <CardTitle className="text-danger">
                {this.state.username}
              </CardTitle>
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
        <CreelList {...this.props} />
      </React.Fragment>
    );
  }
}

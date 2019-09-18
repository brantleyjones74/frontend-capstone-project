// Purpose: Export ProfileCard that renders the details of a specific user and displays their CreelList component.

import React, { Component } from "react";
import {
  Card,
  Container,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import UserManager from "../../modules/UserManager";
import CreelList from "../creel/CreelList";
import ProfileEditModal from "../profile/ProfileEditModal";
import "../profile/ProfileCard.css";

export default class ProfileCard extends Component {
  // set initial state
  state = {
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    bio: "",
    photoUrl: ""
  };

  // fetches the user's data for the specific card. Set state with data from API call
  fetchUserInfo = () => {
    UserManager.getUser(this.props.userId).then(user => {
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
    this.fetchUserInfo();
  }

  // edit user method passing new user obj and id through function. then fetch updated data.
  editUser = (obj, id) => {
    return UserManager.updateUser(obj, id).then(() => {
      this.fetchUserInfo();
    });
  };

  // sets userpage to false. use this to hide buttons for user that's not logged in.
  userpage = false;

  render() {
    return (
      <Container id="profileCardContainer">
        <React.Fragment>
          <Row>
            <Col sm="6">
              <Card id="profileCardBody" body>
                {/* inject ProfileEditModal. pass edit user function to it. */}
                {this.props.userpage ? (
                  <ProfileEditModal
                    id="profileEditModal"
                    editUser={this.editUser}
                    {...this.props}
                  />
                ) : this.props.userId === this.props.activeUser() ? (
                  <ProfileEditModal
                    id="profileEditModal"
                    editUser={this.editUser}
                    {...this.props}
                  />
                ) : (
                  ""
                )}
                <CardImg id="profileImage" src={this.state.photoUrl}></CardImg>
                <CardTitle>{this.state.username}</CardTitle>
                <CardText className="text-success">
                  {this.state.firstName} {this.state.lastName}
                  <br />
                  {this.state.city}
                  {this.state.state}
                  <br />
                  {this.state.bio}
                </CardText>
              </Card>
            </Col>
          </Row>
          <div>
            {/* inject CreelList into the component and pass props and userpage into the component */}
            <CreelList userpage={this.props.userpage} {...this.props} />
          </div>
        </React.Fragment>
      </Container>
    );
  }
}

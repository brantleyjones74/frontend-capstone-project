// Purpose: Displays the details of the active user.
// Similar to ProfileCard. Refactor to inject ProfileCard???

import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardText, Row, Col } from "reactstrap";
import UserManager from "../../modules/UserManager";
import ProfileEditModal from "../profile/ProfileEditModal";
import CreelList from "../creel/CreelList";

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
  fetchActiveUser = () => {
    UserManager.getUser(this.props.activeUser()).then(user => {
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

  // edit user method passing new user obj and id through function. then fetch updated data.
  editUser = (obj, id) => {
    console.log(obj);
    return UserManager.updateUser(obj, id).then(() => {
      this.fetchActiveUser();
    });
  };

  // sets userpage to false. use this to hide buttons for user that's not logged in.
  userpage = false;

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="6">
            <Card body>
              {/* inject ProfileEditModal. pass edit user function to it. */}
              <ProfileEditModal editUser={this.editUser} {...this.props} />
              <CardImg src={this.state.photoUrl}></CardImg>
              <CardTitle className="text-danger">
                {this.state.username}
              </CardTitle>
              <CardText className="text-danger">
                {this.state.firstName} {this.state.lastName}
                <br />
                {this.state.city}{this.state.state}
                <br />
                {this.state.bio}
              </CardText>
            </Card>
          </Col>
        </Row>
        {/* inject CreelList component */}
        <CreelList {...this.props} />
      </React.Fragment>
    );
  }
}

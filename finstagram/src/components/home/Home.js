// Purpose: Displays the details of the active user.
// I didn't import the ProfileCard component because the data wasn't rendering. Clean this up for stretch goal?
import React, { Component } from "react";
import {
  Card,
  // Container,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import UserManager from "../../modules/UserManager";
import FollowManager from "../../modules/FollowManager";
import ProfileEditModal from "../profile/ProfileEditModal";
import CreelList from "../creel/CreelList";
import "../home/Home.css";

export default class Home extends Component {
  // set initial state
  state = {
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    bio: "",
    photoUrl: "",
    connectionId: ""
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
  // Not sure if needed for Home.js
  userpage = false;

  render() {
    return (
      <React.Fragment>
        <div id="homeContainer">
          <Row>
            <Col>
              <div id="profileCardContainer">
                <Card id="profileCard" body inverse color="info">
                  <ProfileEditModal
                    id="profileEditModal"
                    editUser={this.editUser}
                    {...this.props}
                  />
                  <CardImg
                    top
                    width="100%"
                    alt="Card image cap"
                    id="profilePic"
                    src={this.state.photoUrl}
                  ></CardImg>
                  <CardTitle className="">{this.state.username}</CardTitle>
                  <CardText className="">
                    {this.state.firstName} {this.state.lastName}
                    <br />
                    {this.state.city}
                    {this.state.state}
                    <br />
                    {this.state.bio}
                  </CardText>
                </Card>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <CreelList userpage={this.props.userpage} {...this.props} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

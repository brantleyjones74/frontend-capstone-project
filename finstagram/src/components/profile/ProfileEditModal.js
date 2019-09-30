// Purpose: Export ProfileEditModal that can allow a user to add a profile picture and a biography.

import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form
} from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/storage";
import UserManager from "../../modules/UserManager";
import "../profile/ProfileEditModal.css";

export default class ProfileEditModal extends React.Component {
  // set initial state with constructor(props) and super(props)
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      // put properties here
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      city: "",
      state: "",
      password: "",
      bio: "",
      photoUrl: "",
      timeStamp: ""
    };

    this.toggle = this.toggle.bind(this);
    this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
  }

  // toggle method from ReactStrap
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // unmount on close method from ReactStrap
  changeUnmountOnClose(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
  }

  // updates state when input field is changed
  inputFieldHandler = evt => {
    const stateChange = {};
    stateChange[evt.target.id] = evt.target.value;
    this.setState(stateChange);
  };

  // fetches user data then sets state to values from database.
  componentDidMount() {
    // this.props.activeUser = id
    UserManager.getUser(this.props.activeUser()).then(user => {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        city: user.city,
        state: user.state,
        password: user.password,
        bio: user.bio,
        photoUrl: user.photoUrl,
        timeStamp: Date.now()
      });
    });
  }

  // update profile handler
  updateProfile = evt => {
    // prevent page from reloading
    evt.preventDefault();
    /* FIREBASE IMAGE */
    // if type photoUrl is an object then store the object in images folder that lives in Firebase. Take the child reference and give the image a unique name with username and a timestamp. When file is first chosen it is an object.
    if (typeof this.state.photoUrl === "object") {
      const imagesRef = firebase.storage().ref("images");
      const childRef = imagesRef.child(`${this.state.username}-${Date.now()}`);
      childRef
        // fetch the download URL for the photo and pass it into an editedProfile object.
        .put(this.state.photoUrl)
        .then(response => response.ref.getDownloadURL())
        .then(url => {
          const editedProfile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            city: this.state.city,
            state: this.state.state,
            password: this.state.password,
            bio: this.state.bio,
            photoUrl: url,
            timeStamp: this.state.timeStamp
          };
          // invoke editUser function from props. pass editedProfile obj and id from activeUser as the parameters. then close the modal
          this.props
            .editUser(editedProfile, this.props.activeUser())
            .then(() => this.toggle());
        });
    } else {
      // create editedProfile obj
      const editedProfile = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        city: this.state.city,
        state: this.state.state,
        password: this.state.password,
        bio: this.state.bio,
        photoUrl: this.state.photoUrl,
        timeStamp: this.state.timeStamp
      };
      // pass editedProfile obj through editUser function. use the obj and activeUser value as an id. invoke edit User function and close the modal
      this.props
        .editUser(editedProfile, this.props.activeUser())
        .then(() => this.toggle());
    }
  };

  render() {
    return (
      <div>
        {/* Form and Button that will invoke toggle method and open the modal. */}
        <Form inline onSubmit={e => e.preventDefault()}>
          <Button id="editProfileButton" to="#" onClick={this.toggle}>
            Edit Profile
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
            First Name:
            <Input
              id="firstName"
              type="text"
              // inject inputFieldHandler method into the input. This will update state when the value changes
              onChange={this.inputFieldHandler}
              defaultValue={this.state.firstName}
            />
            Last Name:
            <Input
              id="lastName"
              type="text"
              // inject inputFieldHandler method into the input. This will update state when the value changes
              onChange={this.inputFieldHandler}
              defaultValue={this.state.lastName}
            />
            City:
            <Input
              id="city"
              type="text"
              // inject inputFieldHandler method into the input. This will update state when the value changes
              onChange={this.inputFieldHandler}
              defaultValue={this.state.city}
            />
            State:
            <Input
              className="registerInputs"
              // inject inputFieldHandler method into the input. This will update state when the value changes
              onChange={this.inputFieldHandler}
              type="select"
              name="state"
              id="state"
              defaultValue={this.state.state}
            >
              {/* option values for select the state user lives in */}
              <option value=", AL">Alabama</option>
              <option value=", AK">Alaska</option>
              <option value=", AZ">Arizona</option>
              <option value=", AR">Arkansas</option>
              <option value=", CA">California</option>
              <option value=", CO">Colorado</option>
              <option value=", CT">Connecticut</option>
              <option value=", DE">Delaware</option>
              <option value=", DC">D.C.</option>
              <option value=", FL">Florida</option>
              <option value=", GA">Georgia</option>
              <option value=", HI">Hawaii</option>
              <option value=", ID">Idaho</option>
              <option value=", IL">Illinois</option>
              <option value=", IN">Indiana</option>
              <option value=", IA">Iowa</option>
              <option value=", KS">Kansas</option>
              <option value=", KY">Kentucky</option>
              <option value=", LA">Louisiana</option>
              <option value=", ME">Maine</option>
              <option value=", MD">Maryland</option>
              <option value=", MA">Massachusetts</option>
              <option value=", MI">Michigan</option>
              <option value=", MN">Minnesota</option>
              <option value=", MS">Mississippi</option>
              <option value=", MO">Missouri</option>
              <option value=", MT">Montana</option>
              <option value=", NE">Nebraska</option>
              <option value=", NV">Nevada</option>
              <option value=", NH">New Hampshire</option>
              <option value=", NJ">New Jersey</option>
              <option value=", NM<">New Mexico</option>
              <option value=", NY">New York</option>
              <option value=", NC">North Carolina</option>
              <option value=", ND">North Dakota</option>
              <option value=", OH">Ohio</option>
              <option value=", OK">Oklahoma</option>
              <option value=", OR">Oregon</option>
              <option value=", PA">Pennsylvania</option>
              <option value=", RI">Rhode Island</option>
              <option value=", SC">South Carolina</option>
              <option value=", SD">South Dakota</option>
              <option value=", TN">Tennessee</option>
              <option value=", TX">Texas</option>
              <option value=", UT">Utah</option>
              <option value=", VT">Vermont</option>
              <option value=", VA">Virginia</option>
              <option value=", WA">Washington</option>
              <option value=", WV">West Virginia</option>
              <option value=", WI">Wisconsin</option>
              <option value=", WY">Wyoming</option>
            </Input>
            Bio:
            <Input
              id="bio"
              type="textarea"
              // inject inputFieldHandler method into the input. This will update state when the value changes
              onChange={this.inputFieldHandler}
              defaultValue={this.state.bio}
            />
            Image:
            <Input
              id="photoUrl"
              type="file"
              // set state with file that's been uploaded. This file will be an object.
              onChange={e => this.setState({ photoUrl: e.target.files[0] })}
            />
          </ModalBody>
          <ModalFooter>
            {/* onclick invoke the update profile method */}
            <Button color="primary" onClick={this.updateProfile}>
              Submit Edit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

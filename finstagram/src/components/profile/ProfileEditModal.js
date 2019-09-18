// Purpose: component for a modal that allows user to edit their profile.
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/storage";
import UserManager from "../../modules/UserManager";
import "../profile/ProfileEditModal.css"

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
          <Link id="editProfileLink" to="#" onClick={this.toggle}>
            Edit Profile
          </Link>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
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
              Do Something
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

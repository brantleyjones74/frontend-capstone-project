import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  // Label,
  Form
  // FormGroup
} from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/storage";
import UserManager from "../../modules/UserManager";

export default class ProfileEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      // put properties here
      firstName: "",
      lastName: "",
      username: "",
      city: "",
      state: "",
      bio: "",
      photoUrl: "",
      timeStamp: ""
    };

    this.toggle = this.toggle.bind(this);
    this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeUnmountOnClose(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
  }

  inputFieldHandler = evt => {
    const stateChange = {};
    stateChange[evt.target.id] = evt.target.value;
    this.setState(stateChange);
  };

  componentDidMount() {
    UserManager.getUsers(this.props.activeUser()).then(user => {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        city: user.city,
        state: user.state,
        bio: user.bio,
        photoUrl: user.photoUrl,
        timeStamp: Date.now()
      });
    });
  }

  updateProfile = evt => {
    console.log("update the profile");
    evt.preventDefault();
    if (typeof this.state.photoUrl === "object") {
      const imagesRef = firebase.storage().ref("images");
      const childRef = imagesRef.child(`${this.state.username}-${Date.now()}`);
      childRef
        .put(this.state.photoUrl)
        .then(response => response.ref.getDownloadURL())
        .then(url => {
          const editedProfile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            city: this.state.city,
            state: this.state.state,
            bio: this.state.bio,
            photoUrl: url,
            timeStamp: this.state.timeStamp
          };
          this.props
            .editUser(editedProfile, this.props.activeUser())
            .then(() => this.toggle());
        });
    } else {
      const editedProfile = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        city: this.state.city,
        state: this.state.state,
        bio: this.state.bio,
        photoUrl: this.state.photoUrl,
        timeStamp: this.state.timeStamp
      };
      this.props
        .editUser(editedProfile, this.props.activeUser())
        .then(() => this.toggle());
    }
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          <Button color="danger" onClick={this.toggle}>
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
            Bio:
            <Input
              id="bio"
              type="textarea"
              onChange={this.inputFieldHandler}
              defaultValue={this.state.bio}
            />
            Image:
            <Input
              id="photoUrl"
              type="file"
              onChange={e => this.setState({ photoUrl: e.target.files[0] })}
            />
          </ModalBody>
          <ModalFooter>
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

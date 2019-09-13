import React from "react";
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

export default class ProfileAddBioModal extends React.Component {
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
      photoUrl: ""
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

  updateProfile = evt => {
    evt.preventDefault();
    if (this.state.username === "") {
      window.alert("Please fill out a username.");
    } else if (typeof this.state.photo === "object") {
      const imagesRef = firebase.storage().ref("images");
      const childRef = imagesRef.child(
        `${this.state.fishSpecies}-${Date.now()}`
      );
      childRef
        .put(this.state.photo)
        .then(response => response.ref.getDownloadURL())
        .then(url => {
          const editedProfile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            city: this.state.city,
            state: this.state.state,
            bio: this.state.bio,
            photoUrl: this.state.photoUrl
          };
          this.props
            .editFish(editedProfile, this.props.user.id)
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
        photoUrl: this.state.photoUrl
      };
      this.props
        .editProfile(editedProfile, this.props.user.id)
        .then(() => this.toggle());
    }
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          <FormGroup>
            <Label for="unmountOnClose">UnmountOnClose value</Label>{" "}
            <Input
              type="select"
              name="unmountOnClose"
              id="unmountOnClose"
              onChange={this.changeUnmountOnClose}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </Input>
          </FormGroup>{" "}
          <Button color="danger" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Input
              type="textarea"
              placeholder="Write something (data should remain in modal if unmountOnClose is set to false)"
              rows={5}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
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

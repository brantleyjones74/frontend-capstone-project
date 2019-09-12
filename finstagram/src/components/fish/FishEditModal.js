// Purpose: Builds a modal that allows user to edit a fish.

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
import FishManager from "../../modules/FishManager";

export default class FishEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      // put properties here
      fishSpecies: "",
      fishLength: "",
      fishWeight: "",
      fishLure: "",
      catchOfDay: false,
      photo: "",
      timeStamp: Date.now()
    };

    this.toggle = this.toggle.bind(this);
    this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
  }

  // toggle function from ReactStrap
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // function that unmounts the modal from ReactStrap
  changeUnmountOnClose(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
  }

  // updates state when input field values are changed.
  inputFieldHandler = evt => {
    const stateChange = {};
    stateChange[evt.target.id] = evt.target.value;
    this.setState(stateChange);
  };

  // fetches data and fills out data in the form from json database
  componentDidMount() {
    FishManager.getFish(this.props.fish.id).then(fish => {
      this.setState({
        fishSpecies: fish.species,
        fishLength: fish.length,
        fishWeight: fish.weight,
        fishLure: fish.lure,
        catchOfDay: fish.catchOfDay,
        photo: fish.photoUrl,
        timeStamp: Date.now()
      });
    });
  }

  // creates an edited fish object, then invokes editFish function passed in props from FishList.js
  updateExistingFish = evt => {
    evt.preventDefault();
    // if species, length, or weight are empty alert user to fill out all fields
    if (
      this.state.fishSpecies === "" ||
      this.state.fishLength === "" ||
      this.state.fishWeight === ""
    ) {
      window.alert("Please fill out all fields.");
      //   if type of photo in state is an object
    } else if (typeof this.state.photo === "object") {
      /* SAVE IMAGE USING FIREBASE */
      // saves the reference of the image stored in firebase
      const imagesRef = firebase.storage().ref("images");
      // stores the child of the imagesRef. names the photo after what is typed into the species input & a timestamp
      const childRef = imagesRef.child(
        `${this.state.fishSpecies}-${Date.now()}`
      );
      // for child reference change the state of photo using put method
      // fetch the download URL of the response from firebase
      // pass the URL down to editedFish object and store url in photoUrl. also makes a new obj named editedFish and updates the keys with values from state
      childRef
        .put(this.state.photo)
        .then(response => response.ref.getDownloadURL())
        .then(url => {
          // store edited fish w/ url for photo
          const editedFish = {
            species: this.state.fishSpecies,
            length: this.state.fishLength,
            weight: this.state.fishWeight,
            lure: this.state.fishLure,
            catchOfDay: this.state.catchOfDay,
            photoUrl: url,
            timeStamp: this.state.timeStamp
          };
          // edits the existing fish in the json database && closes the modal w/ toggle function
          this.props
            .editFish(editedFish, this.props.fish.id)
            .then(() => this.toggle());
        });
    } else {
      /* IF THERE IS NOT A PHOTO */
      // creates an editedFish object and updates keys w/ values from state
      const editedFish = {
        species: this.state.fishSpecies,
        length: this.state.fishLength,
        weight: this.state.fishWeight,
        lure: this.state.fishLure,
        catchOfDay: this.state.catchOfDay,
        timeStamp: this.state.timeStamp,
        photoUrl: this.state.photo
      };
      // updates existing fish w/ new data && closes the modal w/ toggle function
      this.props
        .editFish(editedFish, this.props.fish.id)
        .then(() => this.toggle());
    }
  };
  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          {" "}
          <Button color="primary" onClick={this.toggle}>
            {/* when the button is clicked toggle the edit fish modal */}
            Edit Fish
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Edit Fish</ModalHeader>
          <ModalBody>
            <Input
              id="fishSpecies"
              type="text"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.fishSpecies}
            />
            <Input
              id="fishLength"
              type="number"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.fishLength}
            />
            <Input
              id="fishWeight"
              type="number"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.fishWeight}
            />
            <Input
              id="fishLure"
              type="select"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.fishLure}
            >
              <option value="Live Bait">Live Bait</option>
              <option value="Soft Plastic">Soft Plastic</option>
              <option value="Hard Plastic">Hard Plastic</option>
              <option value="Other">Other</option>
            </Input>
            <Input
              type="file"
              id="photo"
              onChange={e => this.setState({ photo: e.target.files[0] })}
            />
          </ModalBody>
          <ModalFooter>
            {/* when button is clicked update the existing fish info in json database */}
            <Button color="primary" onClick={this.updateExistingFish}>
              Update Fish
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

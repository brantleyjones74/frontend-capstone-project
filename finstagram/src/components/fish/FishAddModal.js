// Purpose: Uses ReactStrap for a modal to add a new fish.

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

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
import * as firebase from "firebase/app";
import "firebase/storage";

export default class FishAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      // add key values here. set initial state to empty string.
      fishSpecies: "",
      fishLength: "",
      fishWeight: "",
      fishLure: "",
      catchOfDay: false,
      photoUrl: "",
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

  // submit new fish function
  submitNewFish = evt => {
    // prevents page from reloading when event happens
    evt.preventDefault();
    // basic input validation. if any field is empty alerts the user to fill out all fields.
    if (
      this.state.fishSpecies === "" ||
      this.state.fishLength === "" ||
      this.state.fishWeight === ""
    ) {
      window.alert("Please fill out all fields.");
      // if photo in state is NOT equal to an empty string
    } else if (this.state.photo !== "") {
      /* SAVE IMAGE USING FIREBASE */
      // saves the reference of the image stored in firebase
      const imagesRef = firebase.storage().ref("images");
      // stores the child of the imagesRef. names the photo after what is typed into the species input & a timestamp
      const childRef = imagesRef.child(
        `${this.state.fishSpecies}-${Date.now()}`
      );
      // for child reference change the state of photo. use put method from firebase
      // fetch the download URL of the response from firebase
      // pass the URL down to fish object and store url in photoUrl. makes a new object named fish. updates keys with values from state
      childRef
        .put(this.state.photo)
        .then(response => response.ref.getDownloadURL())
        .then(url => {
          const fish = {
            species: this.state.fishSpecies,
            length: this.state.fishLength,
            weight: this.state.fishWeight,
            lure: this.state.fishLure,
            catchOfDay: this.state.catchOfDay,
            timeStamp: this.state.timeStamp,
            photoUrl: url
          };
          // adds the new fish to the json database && closes the modal w/ toggle function
          this.props.addNewFish(fish).then(() => this.toggle());
        });
    } else {
      /* IF THERE IS NOT A PHOTO */
      // creates a new fish object using the values from state
      const fish = {
        species: this.state.fishSpecies,
        length: this.state.fishLength,
        weight: this.state.fishWeight,
        lure: this.state.fishLure,
        catchOfDay: this.state.catchOfDay,
        timeStamp: this.state.timeStamp,
        photoUrl: ""
      };
      // adds the new fish to the API && closes the modal w/ toggle function
      this.props.addNewFish(fish).then(() => this.toggle());
    }
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          <Button color="success" onClick={this.toggle}>
            {/* when the button is clicked use toggle method to open modal */}
            Catch a Fish!
          </Button>
        </Form>
        {/* Modal from ReactStrap. Contains inputs for new fish values */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>New Fish</ModalHeader>
          <ModalBody>
            <Input
              id="fishSpecies"
              type="text"
              placeholder="Fish Species"
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            />
            <Input
              id="fishLength"
              type="number"
              placeholder="Fish Length in inches"
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            />
            <Input
              id="fishWeight"
              type="number"
              placeholder="Fish Weight in pounds"
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            />
            <Input
              id="fishLure"
              type="select"
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            >
              <option value="Live Bait">Live Bait</option>
              <option value="Soft Plastic">Soft Plastic</option>
              <option value="Hard Plastic">Hard Plastic</option>
              <option value="Other">Other</option>
            </Input>
            <Input
              id="fishPic"
              type="file"
              // on change of input set state of photo to file being chosen
              onChange={e => this.setState({ photo: e.target.files[0] })}
            ></Input>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="catchOfDay" />
                Catch of the Day
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {/* when button is clicked submit new fish to database */}
            <Button color="primary" onClick={this.submitNewFish}>
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

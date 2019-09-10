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

export default class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      // add key values here
      fishSpecies: "",
      fishLength: "",
      fishWeight: "",
      fishLure: "",
      catchOfDay: false
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

  // factory function that creates a new fish obj to be added to API
  createNewFish = evt => {
    evt.preventDefault();

    // prevents blank input from being added to API
    if (
      this.state.fishSpecies === "" ||
      this.state.fishLength === "" ||
      this.state.fishWeight === "" ||
      this.state.fishLure === ""
    ) {
      window.alert("Please fill out all fields.");
    } else {
      const fish = {
        species: this.state.fishSpecies,
        length: this.state.fishLength,
        weight: this.state.fishWeight,
        lure: this.state.fishLure,
        catchOfDay: this.state.catchOfDay
        // timeStamp: ???
      };
      this.props.addNewFish(fish).then(() => this.toggle());
    }
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          <Button color="danger" onClick={this.toggle}>
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
              onChange={this.inputFieldHandler}
            />
            <Input
              id="fishLength"
              type="number"
              placeholder="Fish Length in inches"
              onChange={this.inputFieldHandler}
            />
            <Input
              id="fishWeight"
              type="number"
              placeholder="Fish Weight in pounds"
              onChange={this.inputFieldHandler}
            />
            <Input
              id="fishLure"
              type="select"
              placeholder="Lure Type"
              onChange={this.inputFieldHandler}
            >
              <option value="liveBait">Live Bait</option>
              <option value="softPlastic">Soft Plastic</option>
              <option value="hardPlastic">Hard Plastic</option>
              <option value="other">Other</option>
            </Input>
            <Input id="fishPic" type="file"></Input>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="catchOfDay" />
                Catch of the Day
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createNewFish}>
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

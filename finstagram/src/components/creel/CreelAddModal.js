// Purpose: Exports CreelAddModal.

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
import "firebase/storage";

export default class CreelAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      // add key values here. set initial state to empty string.
      name: "",
      date: "",
      location: "",
      notes: "",
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
  submitNewCreel = evt => {
    // prevents page from reloading when event happens
    evt.preventDefault();
    // basic input validation. if any field is empty alerts the user to fill out all fields.
    if (
      this.state.name === "" ||
      this.state.date === "" ||
      this.state.location === "" ||
      this.state.notes === ""
    ) {
      window.alert("Please fill out all fields.");
    } else {
      // creates a new creel object using the values from state
      const creel = {
        name: this.state.name,
        date: this.state.date,
        location: this.state.location,
        notes: this.state.notes,
        timeStamp: this.state.timeStamp,
        userId: this.props.activeUser()
      };
      // adds the new fish to the API && closes the modal w/ toggle function
      this.props.addNewCreel(creel).then(() => this.toggle());
    }
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          <Button size="sm" color="success" onClick={this.toggle}>
            {/* when the button is clicked use toggle method to open modal */}
            Log New Trip
          </Button>
        </Form>
        {/* Modal from ReactStrap. Contains inputs for new fish values */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>New Creel</ModalHeader>
          <ModalBody>
            Name:
            <Input
              id="name"
              type="text"
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            />
            Date:
            <Input
              id="date"
              type="date"
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            />
            Location:
            <Input
              id="location"
              type="text"
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            />
            Notes:
            <Input
              id="notes"
              type="textarea"
              placeholder="Notes for your trip."
              // invoke inputFieldHandler function when input field is changed.
              onChange={this.inputFieldHandler}
            />
          </ModalBody>
          <ModalFooter>
            {/* when button is clicked submit new fish to database */}
            <Button color="primary" onClick={this.submitNewCreel}>
              Save Creel
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

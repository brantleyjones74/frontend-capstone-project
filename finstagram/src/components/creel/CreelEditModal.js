// Purpose: Builds a modal that allows user to edit a creel.

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
import CreelManager from "../../modules/CreelManager";

export default class CreelEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      // put properties here
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

  // fetches data and fills out data in the form from json database
  componentDidMount() {
    CreelManager.getCreel(this.props.creel.id).then(creel => {
      this.setState({
        name: creel.name,
        date: creel.date,
        location: creel.location,
        notes: creel.notes
      });
    });
  }

  // creates an edited fish object, then invokes editFish function passed in props from FishList.js
  updateExistingCreel = evt => {
    evt.preventDefault();
    if (
      this.state.name === "" ||
      this.state.date === "" ||
      this.state.location === "" ||
      this.state.notes === ""
    ) {
      window.alert("Please fill out all fields.");
    } else {
      // creates an editedCreel object and updates keys w/ values from state
      const editedCreel = {
        name: this.state.name,
        date: this.state.date,
        location: this.state.location,
        notes: this.state.notes
      };
      this.props
        .editCreel(editedCreel, this.props.creel.id)
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
            Edit Creel
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Edit Creel</ModalHeader>
          <ModalBody>
            <Input
              id="name"
              type="text"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.name}
            />
            <Input
              id="date"
              type="date"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.date}
            />
            <Input
              id="location"
              type="text"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.location}
            />
            <Input
              id="notes"
              type="textarea"
              // invoke inputFieldHandler function when input field is changed
              onChange={this.inputFieldHandler}
              defaultValue={this.state.notes}
            />
          </ModalBody>
          <ModalFooter>
            {/* when button is clicked update the existing fish info in json database */}
            <Button color="primary" onClick={this.updateExistingCreel}>
              Update Creel
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

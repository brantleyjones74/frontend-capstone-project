// Purpose: handles the registration of a new user.

import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Authentication from "../../modules/AuthenticationManager";

// register form imported from ReactStrap. Modified for Finstagram.
class Register extends React.Component {
  // Set initial state
  state = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "" // will this value be passed to the json?
  };

  // Updates state whenever input field has a new value
  inputFieldHandler = evt => {
    const stateChange = {};
    stateChange[evt.target.id] = evt.target.value;
    this.setState(stateChange);
  };

  // Handles the registration of a new account
  handleRegistration = evt => {
    evt.preventDefault(); // prevents page from reloading
    if (
      // checks to see if all fields have a value or not. if there's an empty field alerts user to fill out all fields
      this.state.email === "" ||
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      window.alert("Please fill out all fields.");
    } else if (
      // checks to see if password input and confirm password input are equal. alert user if they do not match.
      this.state.password !== this.state.confirmPassword
    ) {
      window.alert("Password and Confirm Password must match.");
    } else {
      // checks to see if username and email already exist.
      Authentication.checkEmail(this.state.email).then(emailsArray => {
        if (emailsArray.length > 0) {
          window.alert("Account already exists.");
        } else {
          const newUserObject = {
            // creates new object to pass through API method
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
          };
          // invokes the postNewUser API method to log new user to database.
          Authentication.addNewUser(newUserObject).then(userObject => {
            sessionStorage.setItem("activeUser", JSON.stringify(userObject.id));
            this.props.history.push("/");
          });
        }
      });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleRegistration}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            onChange={this.inputFieldHandler}
            type="email"
            name="email"
            id="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            onChange={this.inputFieldHandler}
            type="text"
            name="username"
            id="username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={this.inputFieldHandler}
            type="password"
            name="password"
            id="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            onChange={this.inputFieldHandler}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    );
  }
}

export default Register;

// Purpose: handles the login functionality for an existing user.

import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Authentication from "../../modules/AuthenticationManager";

// login form imported from ReactStrap. Modified for Finstagram.
class Login extends React.Component {
  // Set initial state
  state = {
    loginUsername: "",
    loginPassword: ""
  };

  // Updates state whenever input field has a new value
  inputFieldHandler = evt => {
    const stateChange = {};
    stateChange[evt.target.id] = evt.target.value;
    this.setState(stateChange);
  };

  // handles the login of an existing account by setting the user id into session storage
  handleLogin = evt => {
    evt.preventDefault();
    if (
      // if state of username and password is empty then alert the user to fill out both fields.
      this.state.loginUsername === "" ||
      this.state.loginPassword === ""
    ) {
      window.alert("Please fill out a username and password.");
    } else {
      // fetch call to check to see if a user and password exists. passes in the state of username and password in as parameters
      Authentication.checkUser(
        this.state.loginUsername,
        this.state.loginPassword
      ).then(
        // with the response from check user, if there is an item in the array then take the id of that item and store it as an activeUser in session storage
        userArray => {
          if (userArray.length > 0) {
            sessionStorage.setItem(
              "activeUser",
              JSON.stringify(userArray[0].id)
            );
            this.props.history.push("/");
            // routes back to /home after user id is stored in session storage
            // this.props.history.push("/home");
          } else {
            // if nothing is returned from the fetch alert user of invalid username and/or password
            window.alert("Invalid username and/or password.");
          }
        }
      );
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleLogin}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            onChange={this.inputFieldHandler}
            type="text"
            name="username"
            id="loginUsername"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={this.inputFieldHandler}
            type="password"
            name="password"
            id="loginPassword"
          />
        </FormGroup>
        <Button id="loginButton" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}

export default Login;

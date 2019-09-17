// Purpose: handles the login functionality for an existing user.

import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "../auth/Login.css";
import Authentication from "../../modules/AuthenticationManager";

export default class Login extends React.Component {
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

  // Handles the login of an existing user
  handleLogin = evt => {
    // prevents page from reloading.
    evt.preventDefault();
    if (
      // If any of these values are left empty, alert user to fill out all fields.
      this.state.loginUsername === "" ||
      this.state.loginPassword === ""
    ) {
      window.alert("Please fill out a username and password.");
    } else {
      // fetch call that checks database for username and password.
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
      <React.Fragment>
        <Container id="formContainer">
          <Container id="inputContainer">
            <Form>
              {/* Form group for username */}
              <FormGroup row>
                <Label sm={4} for="username">
                  Username
                </Label>
                <Col>
                  <Input
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="username"
                    id="loginUsername"
                  />
                </Col>
              </FormGroup>
              {/* Form Group for Password */}
              <FormGroup row>
                <Label sm={4} for="password">
                  Password
                </Label>
                <Col>
                  <Input
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="password"
                    name="password"
                    id="loginPassword"
                  />
                </Col>
              </FormGroup>
            </Form>
          </Container>
          <Container id="loginBtnContainer">
            <Button
              // inject handleLogin method into the button. Function is invoked onClick
              onClick={this.handleLogin}
              id="loginBtn"
              type="submit"
            >
              Login
            </Button>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

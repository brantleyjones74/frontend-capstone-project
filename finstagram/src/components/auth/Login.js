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
      <React.Fragment>
        <Container id="formContainer">
          <Container id="inputContainer">
            <Form>
              <FormGroup row>
                <Label sm={4} for="username">
                  Username
                </Label>
                <Col>
                  <Input
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="username"
                    id="loginUsername"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="password">
                  Password
                </Label>
                <Col>
                  <Input
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
            <Button onClick={this.handleLogin} id="loginBtn" type="submit">
              Login
            </Button>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;

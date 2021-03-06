// Purpose: Exports Login Component.

import React from "react";
import {
  Button,
  Col,
  Row,
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
            this.props.changeLogoutState();
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

  // loginOnClick = evt => {
  //   this.handleLogin();
  //   this.props.changeLogoutState();
  // };

  render() {
    return (
      <React.Fragment>
        <Container id="formContainer">
          <Container id="inputContainer">
            <Form>
              <Row form>
                <Col md={6}>
                  {/* Form group for username */}
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      // inject inputFieldHandler method into the input. This will update state when the value changes
                      onChange={this.inputFieldHandler}
                      type="text"
                      name="username"
                      id="loginUsername"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  {/* Form Group for Password */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      // inject inputFieldHandler method into the input. This will update state when the value changes
                      onChange={this.inputFieldHandler}
                      type="password"
                      name="password"
                      id="loginPassword"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Container>
          <Container id="loginBtnContainer">
            <Button
              id="loginBtn"
              // inject handleLogin method into the button. Function is invoked onClick
              onClick={this.handleLogin}
              color="success"
            >
              Login
            </Button>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

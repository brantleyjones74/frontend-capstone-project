// Purpose: Exports Register Component.

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
import Authentication from "../../modules/AuthenticationManager";
import "../auth/Register.css";

export default class Register extends React.Component {
  // Set initial state
  state = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    state: "",
    confirmPassword: ""
  };

  // Updates state whenever input field has a new value.
  inputFieldHandler = evt => {
    const stateChange = {};
    stateChange[evt.target.id] = evt.target.value;
    this.setState(stateChange);
  };

  // Handles the registration of a new account
  handleRegistration = evt => {
    // prevents page from reloading
    evt.preventDefault();
    // If any of these values are left empty, alert user to fill out all fields.
    if (
      this.state.email === "" ||
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      window.alert("Please fill out all fields.");
    } else if (
      // if the state of password doesn't match state of confirmPassword, alert user that Password and Confirm Password must match.
      this.state.password !== this.state.confirmPassword
    ) {
      window.alert("Password and Confirm Password must match.");
    } else {
      // Checks to see if email exists in database. If an array is returned, then alert the user that an account already exists.
      Authentication.checkEmail(this.state.email).then(emailsArray => {
        if (emailsArray.length > 0) {
          window.alert("Account already exists.");
        } else {
          // creates new object to pass through API method. Values are whats in state (the form)
          const newUserObject = {
            email: this.state.email,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            state: this.state.state,
            password: this.state.password
          };
          // Invokes addNewUser function (POST api method). Then take the userObject and set "activeUser" in sessionStorage w/ userObject Id. Convert userObjectId to a string. Then route to root page
          Authentication.addNewUser(newUserObject).then(userObject => {
            sessionStorage.setItem("activeUser", JSON.stringify(userObject.id));
            this.props.history.push("/");
            this.props.changeLogoutState();
          });
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container id="formContainer">
          <Container id="inputContainer">
            <Form>
              {/* Form Group for Email */}
              <FormGroup row>
                <Label sm={4} for="email">
                  Email
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="email"
                    name="email"
                    id="email"
                  />
                </Col>
              </FormGroup>
              {/* Form Group for username */}
              <FormGroup row>
                <Label sm={4} for="username">
                  Username
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="username"
                    id="username"
                  />
                </Col>
              </FormGroup>
              {/* Form Group for first name */}
              <FormGroup row>
                <Label sm={4} for="firstName">
                  First Name
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="firstName"
                    id="firstName"
                  />
                </Col>
              </FormGroup>
              {/* FormGroup for last name */}
              <FormGroup row>
                <Label sm={4} for="lastName">
                  Last Name
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="lastName"
                    id="lastName"
                  />
                </Col>
              </FormGroup>
              {/* FormGroup for City */}
              <FormGroup row>
                <Label sm={4} for="city">
                  City
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="city"
                    id="city"
                  />
                </Col>
              </FormGroup>
              {/* FormGroup for states */}
              <FormGroup row>
                <Label sm={4} for="state">
                  State
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="select"
                    name="state"
                    id="state"
                  >
                    {/* option values for select the state user lives in */}
                    <option value=", AL">Alabama</option>
                    <option value=", AK">Alaska</option>
                    <option value=", AZ">Arizona</option>
                    <option value=", AR">Arkansas</option>
                    <option value=", CA">California</option>
                    <option value=", CO">Colorado</option>
                    <option value=", CT">Connecticut</option>
                    <option value=", DE">Delaware</option>
                    <option value=", DC">D.C.</option>
                    <option value=", FL">Florida</option>
                    <option value=", GA">Georgia</option>
                    <option value=", HI">Hawaii</option>
                    <option value=", ID">Idaho</option>
                    <option value=", IL">Illinois</option>
                    <option value=", IN">Indiana</option>
                    <option value=", IA">Iowa</option>
                    <option value=", KS">Kansas</option>
                    <option value=", KY">Kentucky</option>
                    <option value=", LA">Louisiana</option>
                    <option value=", ME">Maine</option>
                    <option value=", MD">Maryland</option>
                    <option value=", MA">Massachusetts</option>
                    <option value=", MI">Michigan</option>
                    <option value=", MN">Minnesota</option>
                    <option value=", MS">Mississippi</option>
                    <option value=", MO">Missouri</option>
                    <option value=", MT">Montana</option>
                    <option value=", NE">Nebraska</option>
                    <option value=", NV">Nevada</option>
                    <option value=", NH">New Hampshire</option>
                    <option value=", NJ">New Jersey</option>
                    <option value=", NM<">New Mexico</option>
                    <option value=", NY">New York</option>
                    <option value=", NC">North Carolina</option>
                    <option value=", ND">North Dakota</option>
                    <option value=", OH">Ohio</option>
                    <option value=", OK">Oklahoma</option>
                    <option value=", OR">Oregon</option>
                    <option value=", PA">Pennsylvania</option>
                    <option value=", RI">Rhode Island</option>
                    <option value=", SC">South Carolina</option>
                    <option value=", SD">South Dakota</option>
                    <option value=", TN">Tennessee</option>
                    <option value=", TX">Texas</option>
                    <option value=", UT">Utah</option>
                    <option value=", VT">Vermont</option>
                    <option value=", VA">Virginia</option>
                    <option value=", WA">Washington</option>
                    <option value=", WV">West Virginia</option>
                    <option value=", WI">Wisconsin</option>
                    <option value=", WY">Wyoming</option>
                  </Input>
                </Col>
              </FormGroup>
              {/* Form Group for password */}
              <FormGroup row>
                <Label sm={4} for="password">
                  Password
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="password"
                    name="password"
                    id="password"
                  />
                </Col>
              </FormGroup>
              {/* Form Group for confirm password */}
              <FormGroup row>
                <Label sm={4} for="confirmPassword">
                  Confirm Password
                </Label>
                <Col sm={8}>
                  <Input
                    className="registerInputs"
                    // inject inputFieldHandler method into the input. This will update state when the value changes
                    onChange={this.inputFieldHandler}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                </Col>
              </FormGroup>
            </Form>
          </Container>
          <Container id="registerBtnContainer">
            <Button
              id="registerBtn"
              // inject HandleRegistration method into the button and on click invokes the function. This will post the data to the API on click
              onClick={this.handleRegistration}
            >
              Register
            </Button>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

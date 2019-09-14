// Purpose: handles the registration of a new user.

import React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";
import Authentication from "../../modules/AuthenticationManager";
import "../auth/Register.css";

// register form imported from ReactStrap. Modified for Finstagram.
class Register extends React.Component {
  // Set initial state
  state = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    state: "",
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            state: this.state.state,
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
      <React.Fragment>
        <Container id="formContainer">
          <Container id="inputContainer">
            <Form>
              <FormGroup row>
                <Label sm={4} for="email">
                  Email
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="email"
                    name="email"
                    id="email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="username">
                  Username
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="username"
                    id="username"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="firstName">
                  First Name
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="firstName"
                    id="firstName"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="lastName">
                  Last Name
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="lastName"
                    id="lastName"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="city">
                  City
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="text"
                    name="city"
                    id="city"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="state">
                  State
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="select"
                    name="state"
                    id="state"
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">D.C.</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM<">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="password">
                  Password
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
                    onChange={this.inputFieldHandler}
                    type="password"
                    name="password"
                    id="password"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4} for="confirmPassword">
                  Confirm Password
                </Label>
                <Col>
                  <Input
                    className="registerInputs"
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
            <Button id="registerBtn" onClick={this.handleRegistration}>
              Register
            </Button>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

export default Register;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "../welcome/Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <React.Fragment>
        <Container id="welcomeContainer">
          <Row>
            <Col className="welcomePage">
              <h1 id="header">Welcome To Finstagram</h1>
            </Col>
          </Row>
          <Row>
            <Col className="welcomePage">
              <Link to="/register">
                <p>Register</p>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col className="welcomePage">
              <p>or</p>
            </Col>
          </Row>
          <Row>
            <Col className="welcomePage">
              <Link to="/login">
                <p>Login</p>
              </Link>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Welcome;

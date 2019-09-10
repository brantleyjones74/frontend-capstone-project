// Purpose: Renders a "card" that contains the info for a single creel.

import React, { Component } from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

// import CreelEditModal from "./CreelEditModal"

// CHANGE COLOR OF TEXT.
export default class CreelCard extends Component {
  render() {
    return (
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle className="text-danger">
              Special Title Treatment
            </CardTitle>
            <CardText className="text-danger">
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Creel Details</Button>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle className="text-danger">
              Special Title Treatment
            </CardTitle>
            <CardText className="text-danger">
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Creel Details</Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

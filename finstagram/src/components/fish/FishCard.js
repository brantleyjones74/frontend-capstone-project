// Purpose: Renders a "card" that contains the info for a single fish.

import React, { Component } from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

// import FishEditModal from "./FishEditModal"

// CHANGE COLOR OF TEXT.
export default class FishCard extends Component {
  render() {
    return (
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle className="text-danger">Fish Card</CardTitle>
            <CardText className="text-danger">
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Fish Details</Button>
            <Button>Edit Fish</Button>
            <Button>Delete Fish</Button>
          </Card>
        </Col><Col sm="6">
          <Card body>
            <CardTitle className="text-danger">Fish Card</CardTitle>
            <CardText className="text-danger">
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Fish Details</Button>
            <Button>Edit Fish</Button>
            <Button>Delete Fish</Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

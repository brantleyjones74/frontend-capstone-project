// Purpose: Renders a "card" that contains the info for a single creel.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import CreelEditModal from "./CreelEditModal";

// CHANGE COLOR OF TEXT.
export default class FishCard extends Component {
  render() {
    return (
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle className="text-danger">
              {this.props.creel.name}
            </CardTitle>
            <CardText className="text-danger">
              {this.props.creel.date}
              <br />
              {this.props.creel.location}
              <br />
              {this.props.creel.notes}
            </CardText>
            {/* link to all fish in a specific creel */}
            <Link to={`/creels/${this.props.creel.id}`}>
              <Button>Details</Button>
            </Link>
            <CreelEditModal {...this.props} />
            <Button onClick={() => this.props.deleteCreel(this.props.creel.id)}>
              Delete
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

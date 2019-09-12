// Purpose: Renders a "card" that contains the info for a single creel.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardImg,
  CardText,
  Row,
  Col
} from "reactstrap";
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
            <Button>
              <Link to="/fish">Details</Link>
            </Button>
            <CreelEditModal {...this.props} />
            <Button>Delete</Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

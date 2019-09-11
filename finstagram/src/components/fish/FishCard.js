// Purpose: Renders a "card" that contains the info for a single fish.

import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardImg,
  CardText,
  Row,
  Col
} from "reactstrap";
import FishEditModal from "./FishEditModal";

// CHANGE COLOR OF TEXT.
export default class FishCard extends Component {
  render() {
    return (
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle className="text-danger">
              {this.props.fish.species}
            </CardTitle>
            <CardImg src={this.props.fish.photoUrl}></CardImg>
            <CardText className="text-danger">
              {this.props.fish.length} inches
              <br />
              {this.props.fish.weight} pounds
              <br />
              {this.props.fish.lure} {/*change how displayed. not camel case*/}
            </CardText>
            <FishEditModal {...this.props} />
            <Button onClick={() => this.props.deleteFish(this.props.fish.id)}>
              Delete Fish
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

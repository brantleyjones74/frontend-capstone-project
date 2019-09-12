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
              {/* the title of the card is the species. species is coming from props */}
              {this.props.fish.species}
            </CardTitle>
            <CardImg
              src={this.props.fish.photoUrl}
            ></CardImg>
            <CardText className="text-danger">
              {/* length of fish coming from props. inches hard coded in */}
              {this.props.fish.length} inches
              <br />
              {/* weight of fish coming from props. pounds hard coded in */}
              {this.props.fish.weight} pounds
              <br />
              {/* caught with hard coded in and fish lure coming from props. */}
              Caught with {this.props.fish.lure}{" "}
            </CardText>
            {/* inject FishEditModal and pass props into it. */}
            <FishEditModal {...this.props} />
            {/* delete button. on click invoke the delete function passed from FishList through props */}
            <Button onClick={() => this.props.deleteFish(this.props.fish.id)}>
              Delete Fish
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

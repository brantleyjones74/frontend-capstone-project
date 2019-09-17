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
              Caught with {this.props.fish.lure}{" "}
            </CardText>
            {this.props.userpage ? (
              <React.Fragment>
                <FishEditModal {...this.props} />
                <Button
                  onClick={() => this.props.deleteFish(this.props.fish.id)}
                >
                  Delete Fish
                </Button>
              </React.Fragment>
            ) : this.props.userId === this.props.activeUser() ? (
              <React.Fragment>
                <FishEditModal {...this.props} />
                <Button
                  onClick={() => this.props.deleteFish(this.props.fish.id)}
                >
                  Delete Fish
                </Button>
              </React.Fragment>
            ) : (
              ""
            )}
          </Card>
        </Col>
      </Row>
    );
  }
}

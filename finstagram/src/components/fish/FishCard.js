// Purpose: Renders a "card" that contains the info for a single fish.

import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
  Row,
  Col
} from "reactstrap";
import FishManager from "../../modules/FishManager";

// import FishEditModal from "./FishEditModal"

// CHANGE COLOR OF TEXT.
export default class FishCard extends Component {
  state = {
    fish: []
  };

  componentDidMount() {
    FishManager.getAllFish().then(fish => {
      this.setState({ fish: fish });
    });
  }

  render() {
    return (
      <div>
        {this.state.fish.map(fish => {
          return (
            <Card>
              <CardBody>
                <CardImg src={fish.photoUrl}></CardImg>
                <CardText>{fish.species}</CardText>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  }
}

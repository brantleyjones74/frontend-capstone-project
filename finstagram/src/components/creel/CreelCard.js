// Purpose: Exports CreelCard Component.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button, CardTitle, CardText } from "reactstrap";
import CreelEditModal from "./CreelEditModal";
import "../creel/CreelCard.css";

export default class FishCard extends Component {
  render() {
    return (
      <Card className="creelCard" body>
        <CardTitle className="text-info">{this.props.creel.name}</CardTitle>
        <CardText className="text-info">
          {this.props.creel.date}
          <br />
          {this.props.creel.location}
          <br />
          {this.props.creel.notes}
        </CardText>
        {/* link to all fish in a specific creel */}
        <Container className="buttonContainer">
          <Link to={`/creels/${this.props.creel.id}`}>
            <Button size="sm">Details</Button>
          </Link>
        </Container>
        {/* if statement injected into JSX */}
        {this.props.userpage ? (
          <Container className="buttonContainer">
            <CreelEditModal {...this.props} />
            <Button
              color="danger"
              onClick={() => this.props.deleteCreel(this.props.creel.id)}
            >
              Delete
            </Button>
          </Container>
        ) : this.props.userId === this.props.activeUser() ? (
          <React.Fragment>
            <CreelEditModal {...this.props} />
            <Button
              color="danger"
              onClick={() => this.props.deleteCreel(this.props.creel.id)}
            >
              Delete
            </Button>
          </React.Fragment>
        ) : (
          ""
        )}
      </Card>
    );
  }
}

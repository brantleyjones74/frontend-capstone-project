// Purpose: Exports CreelCard Component.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  // Row,
  Col
} from "reactstrap";
import CreelEditModal from "./CreelEditModal";

export default class FishCard extends Component {
  render() {
    return (
      <Col sm={4}>
        <Card body>
          <CardTitle className="text-danger">{this.props.creel.name}</CardTitle>
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
          {/* if statement injected into JSX */}
          {this.props.userpage ? (
            <React.Fragment>
              <CreelEditModal {...this.props} />
              <Button
                onClick={() => this.props.deleteCreel(this.props.creel.id)}
              >
                Delete
              </Button>
            </React.Fragment>
          ) : this.props.userId === this.props.activeUser() ? (
            <React.Fragment>
              <CreelEditModal {...this.props} />
              <Button
                onClick={() => this.props.deleteCreel(this.props.creel.id)}
              >
                Delete
              </Button>
            </React.Fragment>
          ) : (
            ""
          )}
        </Card>
      </Col>
    );
  }
}

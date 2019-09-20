// Purpose: Exports CreelCard Component.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Container, Button } from "reactstrap";
import CreelEditModal from "./CreelEditModal";
import "../creel/CreelCard.css";

export default class FishCard extends Component {
  render() {
    return (
      <ListGroup className="creelCard" body>
        {/* link to all fish in a specific creel */}
        <ListGroupItem action>
          <Link to={`/creels/${this.props.creel.id}`}>
            {this.props.creel.name} <br />
            {this.props.creel.date} <br />
            {this.props.creel.location} <br />
            {this.props.creel.notes}
            {/* if statement injected into JSX */}
          </Link>
          {this.props.userpage ? (
            <Container className="buttonContainer">
              <CreelEditModal {...this.props} />
              <Button
                size="sm"
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
                size="sm"
                onClick={() => this.props.deleteCreel(this.props.creel.id)}
              >
                Delete
              </Button>
            </React.Fragment>
          ) : (
            ""
          )}
        </ListGroupItem>
      </ListGroup>
    );
  }
}

// Purpose: Exports CreelCard Component.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  CardTitle,
  CardText
} from "reactstrap";
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
          <Row>
            <Col>
              <Link to={`/creels/${this.props.creel.id}`}>
                <Button size="sm">Details</Button>
              </Link>
            </Col>
            {/* if statement injected into JSX */}
            {this.props.userpage ? (
              <React.Fragment>
                <Col>
                  <CreelEditModal {...this.props} />
                </Col>
                <Col>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => this.props.deleteCreel(this.props.creel.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </React.Fragment>
            ) : this.props.userId === this.props.activeUser() ? (
              <React.Fragment>
                <Col>
                  <CreelEditModal {...this.props} />
                </Col>
                <Col>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => this.props.deleteCreel(this.props.creel.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </React.Fragment>
            ) : (
              ""
            )}
            <Col></Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

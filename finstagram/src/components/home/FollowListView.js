import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container, Card } from "reactstrap";

export default class FollowListView extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.user.id === this.props.connections.otherUserId ? (
          <Container>
            <Card>
              <Row>
                <Col>
                  <div>{this.props.user.username}</div>
                </Col>
                <Col>
                  <Link to={`/users/${this.props.user.id}`}>
                    <Button size="sm">View Profile</Button>
                  </Link>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() =>
                      this.props.unfollowUser(this.props.connections.id)
                    }
                  >
                    Unfollow
                  </Button>
                </Col>
              </Row>
            </Card>
          </Container>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

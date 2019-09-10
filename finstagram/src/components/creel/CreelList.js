// Purpose: Creates a list displaying all Creel Cards.

import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

import CreelCard from "./CreelCard";
// import CreelManager from "../../modules/CreelManager"
// import CreelAddModal from "./CreelAddModal";

export default class CreelList extends Component {
  render() {
    return (
      <div>
        <h3>Creels </h3>
        <p>
          Be sure to{" "}
          <strong>
            not use the standard <code>.btn</code> classes here
          </strong>
          .
        </p>
        <ListGroup>
          <ListGroupItem active tag="a" href="#" action>
            <CreelCard />
          </ListGroupItem>
        </ListGroup>
        <p />
      </div>
    );
  }
}

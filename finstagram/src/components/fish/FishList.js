// Purpose: Creates a list displaying all Fish Cards.

import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import FishCard from "./FishCard";
import FishManager from "../../modules/FishManager";
import FishAddModal from "./FishAddModal";

export default class FishList extends Component {
  // set initial state (fish object) to an empty array
  state = {
    fish: []
  };

  // fetches all fish for the active user. changes state to the response from the api
  componentDidMount() {
    FishManager.getAllFish(this.props.activeUser()).then(fish => {
      this.setState({
        fish: fish
      });
    });
  }

  // method to add new fish and then fetch the updated API. updates state with the new data.
  addNewFish = obj => {
    return FishManager.addNewFish(obj).then(() => {
      this.componentDidMount();
    });
  };

  // method to handle updating an existing fish from the API. update state w/ updated data.
  editFish = (obj, id) => {
    return FishManager.editFish(obj, id).then(() => {
      this.componentDidMount();
    });
  };

  // method to delete an existing fish from the API. update state after deleting fish.
  deleteFish = id => {
    FishManager.deleteFish(id).then(() => {
      this.componentDidMount();
    });
  };

  render() {
    return (
      <React.Fragment>
        <section>
          <FishAddModal addNewFish={this.addNewFish} {...this.props} />
        </section>
        <div>
          <h3>Fishes </h3>
          <ListGroup>
            <ListGroupItem active tag="a" href="#" action>
              {this.state.fish.map(fish => {
                return <FishCard
                  key={fish.id}
                  fish={fish}
                  editFish={this.editFish}
                  deleteFish={this.deleteFish}
                  {...this.props}
                />;
              })}
            </ListGroupItem>
          </ListGroup>
          <p />
        </div>
      </React.Fragment>
    );
  }
}

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

  // fetch all fish for the active user. updates state to the response from the api
  fetchAllFish = () => {
    FishManager.getAllFish(this.props.activeUser()).then(fish => {
      this.setState({
        fish: fish
      });
    });
  };

  // mounts component to the page and displays state.
  componentDidMount() {
    this.fetchAllFish();
  }

  // method to add new fish and then fetch the updated API. updates state with the new data.
  addNewFish = obj => {
    return FishManager.addNewFish(obj).then(() => {
      this.fetchAllFish();
    });
  };

  // method to handle updating an existing fish from the API. update state w/ updated data.
  editFish = (obj, id) => {
    return FishManager.updateFish(obj, id).then(() => {
      this.fetchAllFish();
    });
  };

  // method to delete an existing fish from the API. update state after deleting fish.
  deleteFish = id => {
    FishManager.deleteFish(id).then(() => {
      this.fetchAllFish();
    });
  };

  render() {
    return (
      <React.Fragment>
        <section>
          {/* inject the add fish modal and pass addNewFish and props to it */}
          <FishAddModal addNewFish={this.addNewFish} {...this.props} />
        </section>
        <div>
          <h3>Fishes </h3>
          <ListGroup>
            <ListGroupItem active tag="a" href="#" action>
              {/* map over array of fish and then pass fish into the FishCard component */}
              {this.state.fish.map(fish => {
                return (
                  <FishCard
                    // id of fish being displayed
                    key={fish.id}
                    // passes fish down to props
                    fish={fish}
                    // pass editFish function into FishCard component
                    editFish={this.editFish}
                    // pass deleteFish function into FishCard component
                    deleteFish={this.deleteFish}
                    // pass props into Fish Card component
                    {...this.props}
                  />
                );
              })}
            </ListGroupItem>
          </ListGroup>
          <p />
        </div>
      </React.Fragment>
    );
  }
}

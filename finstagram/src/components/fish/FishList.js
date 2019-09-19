// Purpose: Exports FishList component

import React, { Component } from "react";
// import { Col, Row } from "reactstrap";
import FishCard from "./FishCard";
import FishManager from "../../modules/FishManager";
import FishAddModal from "./FishAddModal";
import CreelManager from "../../modules/CreelManager";
import "../fish/FishList.css";

export default class FishList extends Component {
  // set initial state (fish object) to an empty array
  state = {
    creel: {},
    fish: []
  };

  // fetch a single creel using creelId from props. update state of creel
  fetchCreel = () => {
    CreelManager.getCreel(this.props.creelId).then(creel => {
      this.setState({
        creel: creel
      });
    });
  };

  // fetch all fish for a specific creel and then set state for empty fish array.
  fetchAllFish = () => {
    FishManager.getAllFish(this.props.creelId).then(fish => {
      this.setState({
        fish: fish
      });
    });
  };

  componentDidMount() {
    this.fetchCreel();
    this.fetchAllFish();
  }

  // method to add new fish and then fetch the updated API. updates state with the new data. Pass to FishAddModal component
  addNewFish = obj => {
    return FishManager.addNewFish(obj).then(() => {
      this.fetchAllFish();
    });
  };

  // method to handle updating an existing fish from the API. update state w/ updated data. Pass to FishEditModal component
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
          {/* ternary conditional statement. if the userId in the creelobj from state is = to the activeUser then render the FishAddModal. if not render an empty string */}
          {this.state.creel.userId === this.props.activeUser() ? (
            <FishAddModal addNewFish={this.addNewFish} {...this.props} />
          ) : (
            ""
          )}
        </section>
        <div id="fishListContainer">
          <h3>Fish</h3>
          {/* map over array of fish and then pass fish into the FishCard component */}
          {this.state.fish.map(fish => {
            return (
              <div
                // passes fish down to props. key has to be on div
                key={fish.id}
                className="fishCardContainer"
              >
                <FishCard
                  userpage={this.props.userpage}
                  // id of fish being displayed
                  fish={fish}
                  // pass editFish function into FishCard component
                  editFish={this.editFish}
                  // pass deleteFish function into FishCard component
                  deleteFish={this.deleteFish}
                  // pass props into Fish Card component
                  {...this.props}
                />
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

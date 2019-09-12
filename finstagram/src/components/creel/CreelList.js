// Purpose: Creates a list displaying all Creel Cards.

import React, { Component } from "react";
import CreelManager from "../../modules/CreelManager";
import FishList from "../fish/FishList";

export default class CreelList extends Component {
  state = {
    creel: []
  };

  fetchAllCreel = () => {
    CreelManager.getAllCreels(this.props.activeUser()).then(creel => {
      this.setState({
        creel: creel
      });
    });
  };

  componentDidMount() {
    this.fetchAllCreel();
  }

  addNewCreel = obj => {
    return CreelManager.addNewCreel(obj).then(() => {
      this.fetchAllCreel();
    });
  };

  editCreel = (obj, id) => {
    return CreelManager.updateCreel(obj, id).then(() => {
      this.fetchAllCreel();
    });
  };

  deleteCreel = id => {
    CreelManager.deleteCreel(id).then(() => {
      this.fetchAllCreel();
    });
  };

  render() {
    return (
      <div>
        <h3>Creels </h3>
        {this.state.creel.map(creel => {
          return (
            <FishList
              key={creel.id}
              creel={creel}
              editCreel={this.editCreel}
              deleteCreel={this.deleteCreel}
              {...this.props}
            />
          );
        })}
      </div>
    );
  }
}

// Purpose: Creates a list displaying all Creel Cards.

import React, { Component } from "react";
import CreelCard from "./CreelCard";
import CreelManager from "../../modules/CreelManager";
import CreelAddModal from "./CreelAddModal";

export default class CreelList extends Component {
  state = {
    creel: []
  };

  // fetch all creels for active user. updates state to the response from the API
  fetchAllCreel = () => {
    if (this.props.userpage) {
      CreelManager.getAllCreels(this.props.activeUser()).then(creel => {
        this.setState({
          creel: creel
        });
      });
    } else {
      CreelManager.getAllCreels(this.props.userId).then(creel => {
        this.setState({
          creel: creel
        });
      });
    }
  };

  // mounts component to the page and displays state
  componentDidMount() {
    this.fetchAllCreel();
  }

  // method to add new creel and then fetch updated API
  addNewCreel = obj => {
    return CreelManager.addNewCreel(obj).then(() => {
      this.fetchAllCreel();
    });
  };

  // method to update existing creel and fetch data from API
  editCreel = (obj, id) => {
    return CreelManager.updateCreel(obj, id).then(() => {
      this.fetchAllCreel();
    });
  };

  // delete an existing creel and update state.
  deleteCreel = id => {
    CreelManager.deleteCreel(id).then(() => {
      this.fetchAllCreel();
    });
  };

  render() {
    if (this.props.userId === this.props.activeUser()) {
      return (
        <div>
          <h3>Creels </h3>
          <CreelAddModal addNewCreel={this.addNewCreel} {...this.props} />
          {this.state.creel.map(creel => {
            return (
              <CreelCard
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
    } else {
      return (
        <div>
          <h3>Creels </h3>
          {this.state.creel.map(creel => {
            return (
              <CreelCard
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
}

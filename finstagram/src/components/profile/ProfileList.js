// Purpose: Export ProfileList Component that fetches all users, maps over them and passes the data into the ProfileViewList component

import React from "react";
import { ListGroup } from "reactstrap";
import ProfileListView from "./ProfileListView";
import UserManager from "../../modules/UserManager";
import ConnectionManager from "../../modules/ConnectionManager";

export default class ProfileList extends React.Component {
  // set initial state
  state = {
    users: [],
    friends: [],
    friendArray: []
  };

  // fetchAllUsers function that gets the users from the database and then sets state with the data
  fetchAllUsers = () => {
    return UserManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  };

  // fetch connections
  fetchConnections = () => {
    return ConnectionManager.getConnections(this.props.activeUser()).then(
      connections =>
        this.setState({
          friends: connections
        })
    );
  };

  // reduce
  friendFinder = () =>
    this.state.users.reduce((acc, currentUser) => {
      const checkFriend = this.state.friends.find(
        friend => friend.otherUserId === currentUser.id
      );
      if (checkFriend !== undefined) {
        const userObj = {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          username: currentUser.username,
          email: currentUser.email,
          city: currentUser.city,
          state: currentUser.state,
          password: currentUser.password,
          bio: currentUser.bio,
          photoUrl: currentUser.photoUrl,
          timeStamp: currentUser.timeStamp,
          id: currentUser.id,
          friend: true
        };
        acc.push(userObj);
      } else {
        const userObj = {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          username: currentUser.username,
          email: currentUser.email,
          city: currentUser.city,
          state: currentUser.state,
          password: currentUser.password,
          bio: currentUser.bio,
          photoUrl: currentUser.photoUrl,
          timeStamp: currentUser.timeStamp,
          id: currentUser.id,
          friend: false
        };
        acc.push(userObj);
      }
      return acc;
    }, []);

  // invokes fetchAllUsers when component is mounted into the route tree
  componentDidMount() {
    this.fetchAllUsers()
      .then(this.fetchConnections)
      .then(this.friendFinder)
      .then(() => {
        const friendArray = this.friendFinder();
        this.setState({ friendArray: friendArray });
      });
  }

  render() {
    return (
      <div>
        <h3>Users </h3>
        <ListGroup>
          {/* map over state and create a new array return ProfileListView and pass users.id and users */}
          {this.state.friendArray.map(user => {
            return (
              <ProfileListView key={user.id} user={user} {...this.props} />
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

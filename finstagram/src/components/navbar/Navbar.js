// Purpose: Exports the NavBar component

import React from "react";
import { Link } from "react-router-dom";
// imports components for NavBar from react-strap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
// import Logo component
import Logo from "../images/Finstagram.png";

export default class NavBar extends React.Component {
  // Constructor from ReactStrap. Call this before Component is mounted
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  // Toggle function from ReactStrap. Sets state to open
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // Function that clears session storage to simulate logging out a user.
  logoutUser = () => {
    sessionStorage.clear();
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            {/* inject the img component with Logo as the source */}
            <img src={Logo}></img>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/creels">Creels</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <Link to="/">
                  {/* inject the logoutUser function that clears session storage on click */}
                  <Button onClick={this.logoutUser}>Logout</Button>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

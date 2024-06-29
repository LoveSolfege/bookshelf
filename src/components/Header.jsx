import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Book Review</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink to="/" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/books" className="nav-link">Books</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;

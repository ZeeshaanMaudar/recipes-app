import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

const NavBar = () => (
  <nav>
    <NavBarUnAuth />
  </nav>
);

export default NavBar;
